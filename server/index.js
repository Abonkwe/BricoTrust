import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INITIAL_ARTISANS, PILOT_SCOPE } from './data.js';
import { isLocationInPilotArea, parseServiceRequest } from './parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// In-memory store for hackathon demo runtime (reset cleanly on restart; seeded with clearly marked demo records)
const store = {
  artisans: structuredClone(INITIAL_ARTISANS),
  requests: new Map(),
  bookings: new Map(),
  analyticsEvents: [],
  artisanApplications: [],
  supportInquiries: []
};

function sanitizePublicArtisan(artisan) {
  return {
    id: artisan.id,
    isDemoData: Boolean(artisan.isDemoData),
    demoLabel: artisan.demoLabel || (artisan.isDemoData ? 'Demo profile / Sample data' : null),
    displayName: artisan.displayName,
    initials: artisan.initials,
    trade: artisan.trade,
    primaryArea: artisan.primaryArea,
    serviceAreas: artisan.serviceAreas,
    coveredTasks: artisan.coveredTasks,
    bio: artisan.bio,
    availability: artisan.availability,
    quotePolicy: artisan.quotePolicy,
    identityBadges: [
      artisan.identityStatus?.phoneConfirmed?.status,
      artisan.identityStatus?.identityChecked?.status
    ].filter(Boolean),
    skillBadges: (artisan.skillCredentials || []).map((c) => ({
      taskName: c.taskName,
      badgeLabel: c.badgeLabel,
      result: c.result,
      assessedDate: c.assessedDate
    })),
    referenceSummary: (artisan.communityReferences || []).map((r) => ({
      badgeLabel: r.badgeLabel,
      summary: r.summary,
      relationship: r.relationship
    })),
    confirmedJobsCount: artisan.confirmedJobsCount,
    reviewsCount: (artisan.reviews || []).length
  };
}

function sanitizeCredentials(artisan) {
  return {
    id: artisan.id,
    isDemoData: Boolean(artisan.isDemoData),
    demoLabel: artisan.demoLabel || 'Demo profile / Sample data',
    displayName: artisan.displayName,
    trade: artisan.trade,
    primaryArea: artisan.primaryArea,
    identityStatus: {
      phoneConfirmed: artisan.identityStatus?.phoneConfirmed || null,
      identityChecked: artisan.identityStatus?.identityChecked || null
    },
    skillCredentials: artisan.skillCredentials || [],
    communityReferences: artisan.communityReferences || [],
    confirmedJobsCount: artisan.confirmedJobsCount || 0,
    reviews: artisan.reviews || [],
    limitations: artisan.limitations || []
  };
}

// Health & pilot scope
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', pilotScope: PILOT_SCOPE });
});

// Public demo preview artisans (strictly labelled as demo records)
app.get('/api/artisans/preview', (_req, res) => {
  res.json({
    artisans: store.artisans.slice(0, 2).map(sanitizePublicArtisan)
  });
});

// 1. Parse natural-language request (AI assistant — returns structured suggestion only)
app.post('/api/requests/parse', (req, res) => {
  const { description = '', service = 'Plumbing', location = '', urgency = '' } = req.body || {};
  if (!description.trim() && !location.trim()) {
    return res.status(400).json({
      error: 'Please describe what needs fixing or provide a location near Molyko, Buea.',
      field: 'description'
    });
  }
  const parsed = parseServiceRequest({ description, service, location, urgency });
  return res.json(parsed);
});

// 2. Create confirmed service request
app.post('/api/requests', (req, res) => {
  const {
    service = 'Plumbing',
    task,
    description,
    location,
    urgency = 'Flexible',
    optionalBudget = null,
    contactPreference = null,
    consentConfirmed = true
  } = req.body || {};

  if (!description || description.trim().length < 5) {
    return res.status(400).json({
      error: 'Please enter a short description of the plumbing issue (at least 5 characters).',
      field: 'description'
    });
  }
  if (!location || location.trim().length < 2) {
    return res.status(400).json({
      error: 'Please specify a neighbourhood or landmark (e.g. Molyko, UB Junction).',
      field: 'location'
    });
  }

  const supportedTaskNames = PILOT_SCOPE.supportedTasks.map((t) => t.name);
  const normalizedTask = supportedTaskNames.includes(task) ? task : 'Leak repair';
  const taskMeta = PILOT_SCOPE.supportedTasks.find((t) => t.name === normalizedTask);
  const id = `req-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  const record = {
    id,
    service: 'Plumbing',
    task: normalizedTask,
    requiresScopeReview: Boolean(taskMeta?.requiresScopeReview),
    reviewNote: taskMeta?.reviewNote || null,
    description: description.trim(),
    location: location.trim(),
    inPilotArea: isLocationInPilotArea(location),
    urgency,
    optionalBudget,
    contactPreference,
    consentConfirmed: Boolean(consentConfirmed),
    createdAt: new Date().toISOString()
  };

  store.requests.set(id, record);
  return res.status(201).json({ request: record });
});

// 3. Backend eligibility filtering & ranking for a confirmed request
app.get('/api/requests/:id/matches', (req, res) => {
  const requestRecord = store.requests.get(req.params.id);
  if (!requestRecord) {
    return res.status(404).json({ error: 'Service request not found.' });
  }

  if (!requestRecord.inPilotArea) {
    return res.json({
      request: requestRecord,
      matches: [],
      noMatchReason: 'out_of_area',
      message: `BricoTrust is currently in a plumbing pilot for Molyko, Buea. "${requestRecord.location}" is outside our active pilot coverage.`,
      supportContact: PILOT_SCOPE.supportContact
    });
  }

  const locLower = requestRecord.location.toLowerCase();

  // Filter strictly by backend eligibility rules: assessed/covered task + supported pilot area
  const eligible = store.artisans
    .filter((artisan) => {
      const hasTaskCredential = artisan.skillCredentials.some(
        (cred) => cred.taskName.toLowerCase() === requestRecord.task.toLowerCase()
      );
      const servesArea =
        artisan.serviceAreas.some((area) => locLower.includes(area.toLowerCase())) ||
        locLower.includes('molyko') ||
        locLower.includes('buea');
      return hasTaskCredential && servesArea;
    })
    .map((artisan) => {
      const matchingCred = artisan.skillCredentials.find(
        (c) => c.taskName.toLowerCase() === requestRecord.task.toLowerCase()
      );
      const areaExact = artisan.serviceAreas.find((area) => locLower.includes(area.toLowerCase()));
      const matchReasons = [
        matchingCred ? `${matchingCred.badgeLabel} (${matchingCred.result.toLowerCase()})` : null,
        areaExact ? `Covers ${areaExact}` : `Covers ${artisan.primaryArea}, Buea`,
        artisan.confirmedJobsCount > 0
          ? `${artisan.confirmedJobsCount} platform-confirmed ${artisan.confirmedJobsCount === 1 ? 'job' : 'jobs'}`
          : null,
        artisan.communityReferences.length > 0 ? artisan.communityReferences[0].summary : null
      ].filter(Boolean);

      // Deterministic ranking score (internal only; never exposed as fake %)
      const score =
        (matchingCred ? 50 : 0) +
        (areaExact ? 20 : 10) +
        (artisan.availability?.confirmed ? 15 : 0) +
        artisan.confirmedJobsCount * 5;

      return {
        ...sanitizePublicArtisan(artisan),
        matchReasons,
        _rankScore: score
      };
    })
    .sort((a, b) => b._rankScore - a._rankScore)
    .map(({ _rankScore, ...publicMatch }) => publicMatch);

  if (eligible.length === 0) {
    return res.json({
      request: requestRecord,
      matches: [],
      noMatchReason: 'no_assessed_artisan',
      message: 'No suitable assessed plumber is currently available in this area. You can leave a request or contact support.',
      supportContact: PILOT_SCOPE.supportContact
    });
  }

  return res.json({
    request: requestRecord,
    matches: eligible,
    rankingBasis: 'Filtered by task-specific skill assessment and Molyko, Buea service area; ordered by evidence, area fit, and confirmed availability.'
  });
});

// 4. Artisan public profile (no private ID docs or referee phone numbers)
app.get('/api/artisans/:id/public-profile', (req, res) => {
  const artisan = store.artisans.find((a) => a.id === req.params.id);
  if (!artisan) {
    return res.status(404).json({ error: 'Artisan profile not found.' });
  }
  return res.json({ artisan: sanitizePublicArtisan(artisan) });
});

// 5. Artisan Trust Passport credentials
app.get('/api/artisans/:id/credentials', (req, res) => {
  const artisan = store.artisans.find((a) => a.id === req.params.id);
  if (!artisan) {
    return res.status(404).json({ error: 'Trust Passport not found.' });
  }
  return res.json({ passport: sanitizeCredentials(artisan) });
});

// 6. Create booking request (pending artisan acceptance — never claims confirmed prematurely)
app.post('/api/bookings', (req, res) => {
  const {
    requestId = null,
    artisanId,
    customerName,
    customerPhone,
    preferredWindow,
    areaDetails,
    notes = '',
    consentAccepted
  } = req.body || {};

  if (!artisanId || !store.artisans.some((a) => a.id === artisanId)) {
    return res.status(400).json({ error: 'Please select a valid artisan before submitting a booking request.', field: 'artisanId' });
  }
  if (!customerName || customerName.trim().length < 2) {
    return res.status(400).json({ error: 'Please provide your name so the artisan knows who to ask for.', field: 'customerName' });
  }
  if (!customerPhone || customerPhone.trim().length < 8) {
    return res.status(400).json({ error: 'Please provide a valid phone or WhatsApp number to receive a quote and confirmation.', field: 'customerPhone' });
  }
  if (!consentAccepted) {
    return res.status(400).json({ error: 'Please confirm consent to share your request details with the selected artisan.', field: 'consentAccepted' });
  }

  const artisan = store.artisans.find((a) => a.id === artisanId);
  const requestRecord = requestId ? store.requests.get(requestId) : null;
  const bookingId = `MBS-${Math.floor(1000 + Math.random() * 9000)}`;
  const completionCode = String(Math.floor(100000 + Math.random() * 900000));

  const booking = {
    id: bookingId,
    requestId,
    artisanId: artisan.id,
    artisanName: artisan.displayName,
    isDemoArtisan: Boolean(artisan.isDemoData),
    task: requestRecord?.task || 'Plumbing service',
    area: areaDetails || requestRecord?.location || 'Molyko, Buea',
    preferredWindow: preferredWindow || requestRecord?.urgency || 'Flexible',
    notes: notes.trim(),
    customerName: customerName.trim(),
    // Store minimal contact masked in summary responses
    customerPhoneMasked: `${customerPhone.trim().slice(0, 4)}****${customerPhone.trim().slice(-2)}`,
    status: 'pending_artisan_acceptance',
    statusLabel: 'Pending artisan acceptance — booking is not yet confirmed',
    completionCode,
    reviewSubmitted: false,
    createdAt: new Date().toISOString()
  };

  store.bookings.set(bookingId, booking);

  return res.status(201).json({
    booking: {
      ...booking
    },
    nextStepNote: 'The selected artisan will review the job details and respond with a quote and time confirmation. No payment is taken upfront.'
  });
});

// 6b. One-time job completion confirmation + unlock verified review (Demo sequence Step 6)
app.post('/api/bookings/:id/complete', (req, res) => {
  const booking = store.bookings.get(req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking reference not found.' });
  }
  const { completionCode, reviewComment = '' } = req.body || {};
  if (!completionCode || String(completionCode).trim() !== booking.completionCode) {
    return res.status(400).json({
      error: 'The one-time completion code does not match. Check the code shown on your booking card.',
      field: 'completionCode'
    });
  }
  if (booking.status === 'completed_confirmed' && booking.reviewSubmitted) {
    return res.status(400).json({ error: 'This job has already been confirmed and reviewed.' });
  }

  booking.status = 'completed_confirmed';
  booking.statusLabel = 'Job confirmed via one-time completion code';
  booking.completedAt = new Date().toISOString();

  const artisan = store.artisans.find((a) => a.id === booking.artisanId);
  if (artisan && !booking.jobCountIncremented) {
    artisan.confirmedJobsCount += 1;
    booking.jobCountIncremented = true;
  }

  if (reviewComment && reviewComment.trim().length >= 5 && artisan && !booking.reviewSubmitted) {
    artisan.reviews.unshift({
      id: `rev-${Date.now().toString(36)}`,
      bookingRef: booking.id,
      task: booking.task,
      area: booking.area,
      confirmedDate: new Date().toISOString().slice(0, 10),
      comment: `${booking.isDemoArtisan ? 'Demo confirmation review: ' : ''}${reviewComment.trim()}`,
      isDemoData: Boolean(booking.isDemoArtisan)
    });
    booking.reviewSubmitted = true;
  }

  return res.json({
    booking,
    unlockedReview: true,
    updatedConfirmedJobsCount: artisan?.confirmedJobsCount ?? null
  });
});

// 7. Artisan onboarding & evidence submission (Server controls verification status — never frontend!)
app.post('/api/artisans', (req, res) => {
  const {
    fullName,
    phone,
    primaryArea = 'Molyko',
    skills = [],
    experienceSummary = '',
    referenceName = '',
    referenceRelationship = '',
    consentAccepted = false
  } = req.body || {};

  if (!fullName || fullName.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter your full name.', field: 'fullName' });
  }
  if (!phone || phone.trim().length < 8) {
    return res.status(400).json({ error: 'Please enter a valid phone or WhatsApp number.', field: 'phone' });
  }
  if (!Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ error: 'Please select at least one plumbing task you perform.', field: 'skills' });
  }
  if (!consentAccepted) {
    return res.status(400).json({ error: 'Please accept the pilot onboarding and verification consent.', field: 'consentAccepted' });
  }

  // Note: Ignore any client-sent verified/status flags (Section 8.3 security rule)
  const applicationId = `ART-APP-${Date.now().toString(36).toUpperCase()}`;
  const application = {
    id: applicationId,
    fullName: fullName.trim(),
    primaryArea,
    skills,
    experienceSummary: experienceSummary.trim(),
    hasReferenceProvided: Boolean(referenceName.trim()),
    referenceRelationship: referenceRelationship.trim() || null,
    // Strictly server-controlled status
    verificationStatus: 'submitted_pending_review',
    verificationStatusLabel: 'Profile received — pending phone confirmation & practical assessment scheduling',
    createdAt: new Date().toISOString()
  };

  store.artisanApplications.push(application);

  return res.status(201).json({
    application,
    message:
      'Your free pilot profile request has been submitted. Our Buea Pilot Desk will contact you to confirm your phone number and arrange task-specific skill verification.'
  });
});

// Property manager / support contact endpoint
app.post('/api/support', (req, res) => {
  const { name, contact, topic = 'Customer support', message } = req.body || {};
  if (!contact || !message || message.trim().length < 5) {
    return res.status(400).json({ error: 'Please provide your contact details and a short message.', field: 'message' });
  }
  const ticketId = `SUP-${Date.now().toString(36).toUpperCase()}`;
  store.supportInquiries.push({
    id: ticketId,
    name: (name || 'Visitor').trim(),
    topic,
    message: message.trim(),
    createdAt: new Date().toISOString()
  });
  return res.status(201).json({
    ticketId,
    message: `Recorded under ${ticketId}. The BricoTrust Buea Pilot Desk responds during pilot hours (${PILOT_SCOPE.supportContact.hours}).`
  });
});

// 8. Analytics event collector (Section 8.4)
app.post('/api/analytics', (req, res) => {
  const { event, payload = {} } = req.body || {};
  const allowedEvents = [
    'hero_request_started',
    'request_submitted',
    'request_clarification_answered',
    'match_list_viewed',
    'trust_passport_opened',
    'artisan_contact_or_booking_requested',
    'artisan_join_clicked',
    'faq_opened',
    'support_clicked'
  ];
  if (!event || !allowedEvents.includes(event)) {
    return res.status(400).json({ error: 'Unknown analytics event.' });
  }
  store.analyticsEvents.push({
    event,
    payload,
    timestamp: new Date().toISOString()
  });
  return res.status(202).json({ recorded: true });
});

// Serve built Vite static files when running in production / single-server mode
const distDir = path.resolve(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`BricoTrust API server running on http://localhost:${PORT}`);
});

