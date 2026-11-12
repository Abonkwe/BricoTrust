import { PILOT_SCOPE } from './data.js';

// Rule-based + keyword AI-assisted request parser adhering strictly to Section 6.2:
// - Extracts ONLY: service, task, location, urgency, optionalBudget, contactPreference
// - Never silently infers uncertain details
// - Asks one concise clarification question when task or location is ambiguous
// - Flags emergency/hazardous conditions for human-support guidance without diagnosing

const OUT_OF_AREA_CITIES = [
  'douala',
  'yaounde',
  'yaoundé',
  'limbe',
  'bamenda',
  'bafoussam',
  'garoua',
  'maroua',
  'kribi',
  'kumba',
  'tiko',
  'mutengene'
];

const EMERGENCY_KEYWORDS = [
  'flooding',
  'flood',
  'burst main',
  'gas',
  'spark',
  'electrical',
  'electric shock',
  'sewage overflow',
  'ceiling collapsing',
  'fire'
];

const TASK_PATTERNS = [
  {
    task: 'Leak repair',
    keywords: ['leak', 'leaking', 'drip', 'dripping', 'wet', 'seeping', 'burst pipe', 'cracked pipe', 'cistern running']
  },
  {
    task: 'Tap / fixture installation',
    keywords: ['tap', 'faucet', 'shower', 'showerhead', 'mixer', 'basin', 'install sink', 'replace valve', 'fixture', 'toilet seat']
  },
  {
    task: 'Drain blockage',
    keywords: ['block', 'blocked', 'clog', 'clogged', 'drain', 'not draining', 'backing up', 'slow drain', 'overflowing sink']
  },
  {
    task: 'Pipe installation',
    keywords: ['new pipe', 'install pipe', 'pipe installation', 'tank connection', 'run pipe', 'pvc line', 'ppr', 'water line']
  }
];

const MOLYKO_LANDMARKS = [
  { match: 'ub junction', label: 'UB Junction, Molyko' },
  { match: 'dirty south', label: 'Dirty South, Molyko' },
  { match: 'check point', label: 'Check Point, Molyko' },
  { match: 'checkpoint', label: 'Check Point, Molyko' },
  { match: 'mile 17', label: 'Mile 17, Buea' },
  { match: 'molyko stadium', label: 'Molyko Stadium, Buea' },
  { match: 'bonduma', label: 'Bonduma, Buea' },
  { match: 'great soppo', label: 'Great Soppo, Buea' },
  { match: 'muea', label: 'Muea, Buea' },
  { match: 'molyko', label: 'Molyko, Buea' },
  { match: 'buea', label: 'Buea (Molyko pilot area)' }
];

export function parseServiceRequest({ description = '', service = 'Plumbing', location = '', urgency = '' }) {
  const combined = `${description} ${location}`.toLowerCase();
  const textLower = description.toLowerCase();

  // Check for hazardous/emergency language (Section 6.2)
  const emergencyHit = EMERGENCY_KEYWORDS.find((kw) => textLower.includes(kw));
  const emergencyGuidance = emergencyHit
    ? {
        flagged: true,
        message:
          'This sounds urgent or potentially hazardous. BricoTrust cannot provide safety diagnoses. If water is near electrical wiring, shut off the main water valve and breaker if safe to do so, and contact our Pilot Desk directly for human support.',
        supportPhone: PILOT_SCOPE.supportContact.phone
      }
    : { flagged: false };

  // Detect task
  const matchedTasks = TASK_PATTERNS.filter((p) => p.keywords.some((kw) => textLower.includes(kw))).map((p) => p.task);
  let extractedTask = null;
  let taskAmbiguous = false;

  if (matchedTasks.length === 1) {
    extractedTask = matchedTasks[0];
  } else if (matchedTasks.length > 1) {
    // e.g. "pipe leaking near tap" -> ask clarification rather than guessing silently
    taskAmbiguous = true;
  }

  // Detect location
  let extractedLocation = location.trim() || null;
  let outOfAreaCity = null;

  for (const city of OUT_OF_AREA_CITIES) {
    if (combined.includes(city)) {
      outOfAreaCity = city.charAt(0).toUpperCase() + city.slice(1);
      extractedLocation = outOfAreaCity;
      break;
    }
  }

  if (!outOfAreaCity) {
    const landmark = MOLYKO_LANDMARKS.find((l) => combined.includes(l.match));
    if (landmark) {
      extractedLocation = landmark.label;
    }
  }

  // Detect urgency
  let extractedUrgency = urgency || null;
  if (!extractedUrgency) {
    if (textLower.includes('today') || textLower.includes('urgent') || textLower.includes('now') || textLower.includes('asap')) {
      extractedUrgency = 'Today';
    } else if (textLower.includes('tomorrow') || textLower.includes('this week') || textLower.includes('few days')) {
      extractedUrgency = 'Within a few days';
    } else if (textLower.includes('flexible') || textLower.includes('whenever') || textLower.includes('weekend')) {
      extractedUrgency = 'Flexible';
    }
  }

  // Extract optional budget if explicitly stated (e.g. "10000 FCFA" or "5,000 XAF")
  let optionalBudget = null;
  const budgetMatch = description.match(/(\d[\d,\s]{2,})\s*(fcfa|xaf|frs|francs)/i);
  if (budgetMatch) {
    optionalBudget = `${budgetMatch[1].trim()} ${budgetMatch[2].toUpperCase()}`;
  }

  // Extract contact preference if explicitly stated
  let contactPreference = null;
  if (textLower.includes('whatsapp')) {
    contactPreference = 'WhatsApp';
  } else if (textLower.includes('call') || textLower.includes('phone')) {
    contactPreference = 'Phone call';
  }

  // Clarification check (Section 6.2 & 6.3: one concise question)
  let clarificationNeeded = false;
  let clarificationQuestion = null;
  let clarificationOptions = [];

  if (!outOfAreaCity) {
    if (taskAmbiguous) {
      clarificationNeeded = true;
      clarificationQuestion = 'Is the issue mainly a leak from a pipe/tap, or do you need a new tap or fixture installed?';
      clarificationOptions = matchedTasks;
    } else if (!extractedTask && description.trim().length > 0) {
      clarificationNeeded = true;
      clarificationQuestion = 'Which plumbing task best matches your problem?';
      clarificationOptions = PILOT_SCOPE.supportedTasks.map((t) => t.name);
    } else if (!extractedLocation) {
      clarificationNeeded = true;
      clarificationQuestion = 'Which area or landmark near Molyko, Buea do you need help in?';
      clarificationOptions = ['Molyko, Buea', 'UB Junction, Molyko', 'Check Point, Molyko', 'Dirty South, Molyko'];
    }
  }

  return {
    extracted: {
      service: service || 'Plumbing',
      task: extractedTask,
      location: extractedLocation,
      urgency: extractedUrgency,
      optionalBudget,
      contactPreference
    },
    inPilotArea: !outOfAreaCity && isLocationInPilotArea(extractedLocation),
    outOfAreaCity,
    clarificationNeeded,
    clarificationQuestion,
    clarificationOptions,
    emergencyGuidance,
    assistantNotice:
      'AI-assisted request understanding only. Please review and confirm these fields before matching — backend eligibility rules select artisans.'
  };
}

export function isLocationInPilotArea(locationStr) {
  if (!locationStr) return false;
  const lower = locationStr.toLowerCase();
  if (OUT_OF_AREA_CITIES.some((c) => lower.includes(c))) {
    return false;
  }
  return PILOT_SCOPE.supportedAreas.some((area) => lower.includes(area.toLowerCase()));
}

