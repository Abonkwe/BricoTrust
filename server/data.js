// Pilot sample data for BricoTrust (Molyko, Buea — Plumbing pilot)
// All simulated records are explicitly flagged with isDemoData: true and demoLabel: "Demo profile / Sample data"
// per Section 8.3 & Section 10.2 of the BricoTrust Design & Build Directives.

export const PILOT_SCOPE = {
  trade: 'Plumbing',
  city: 'Buea',
  primaryArea: 'Molyko',
  supportedAreas: [
    'Molyko',
    'UB Junction',
    'Dirty South',
    'Check Point',
    'Mile 17',
    'Bonduma',
    'Molyko Stadium',
    'Great Soppo',
    'Muea',
    'Buea'
  ],
  supportedTasks: [
    {
      id: 'leak-repair',
      name: 'Leak repair',
      description: 'Under-sink pipes, visible supply joints, toilet cistern drips, and leaking wall connections.',
      requiresScopeReview: false
    },
    {
      id: 'tap-fixture-installation',
      name: 'Tap / fixture installation',
      description: 'Kitchen and bathroom taps, showerheads, basin mixers, and shut-off valve replacements.',
      requiresScopeReview: false
    },
    {
      id: 'drain-blockage',
      name: 'Drain blockage',
      description: 'Blocked kitchen sinks, bathroom floor drains, and slow household waste pipes.',
      requiresScopeReview: false
    },
    {
      id: 'pipe-installation',
      name: 'Pipe installation',
      description: 'Short PVC or PPR household line runs, tank feeds, and new indoor outlet connections.',
      requiresScopeReview: true,
      reviewNote: 'Multi-unit or main-line installations undergo scope review before matching.'
    }
  ],
  supportContact: {
    phone: '+237 670 00 00 00',
    whatsapp: '+237 670 00 00 00',
    email: 'pilot-support@bricotrust.cm',
    hours: 'Mon–Sat, 08:00–18:00 WAT (Pilot Desk)'
  }
};

export const INITIAL_ARTISANS = [
  {
    id: 'artisan-demo-a',
    isDemoData: true,
    demoLabel: 'Demo profile / Sample data',
    displayName: 'Sample Plumber A',
    initials: 'PA',
    trade: 'Plumbing',
    primaryArea: 'Molyko',
    serviceAreas: ['Molyko', 'UB Junction', 'Dirty South', 'Check Point'],
    coveredTasks: ['Leak repair', 'Tap / fixture installation'],
    bio: 'Demo artisan profile illustrating how task-scoped leak repair and fixture evidence appear in Molyko, Buea.',
    availability: {
      confirmed: true,
      summary: 'Available after 2:00 PM',
      confirmedAt: '2026-11-12T09:30:00+01:00',
      displayTime: 'Confirmed today at 09:30'
    },
    quotePolicy: 'Estimate available after job details',
    identityStatus: {
      phoneConfirmed: {
        status: 'Phone confirmed',
        origin: {
          checkedBy: 'BricoTrust Pilot Desk',
          checkedAt: '2026-10-12',
          process: 'OTP verification during onboarding'
        }
      },
      identityChecked: {
        status: 'Identity checked',
        detail: 'National ID sighted at onboarding',
        origin: {
          checkedBy: 'BricoTrust Field Coordinator',
          checkedAt: '2026-10-14',
          process: 'In-person document check (document image not public)'
        }
      }
    },
    // Private fields stripped by public-profile and credentials endpoints
    _private: {
      phone: '+237 670 11 11 01',
      idDocumentRef: 'PRIVATE-CNI-DEMO-001',
      referenceContact: '+237 670 99 00 01 (Hidden)'
    },
    skillCredentials: [
      {
        id: 'cred-a-1',
        taskName: 'Leak repair',
        scopeDetail: 'Under-sink traps, PVC/PPR supply joints & cistern valves',
        result: 'Practical assessment passed',
        assessorCategory: 'Authorised local trade assessor (Buea)',
        assessedDate: '2026-10-18',
        credentialStatus: 'Active — task-scoped',
        badgeLabel: 'Skill assessed - leak repair',
        origin: {
          checkedBy: 'Authorised Plumbing Assessor #02',
          checkedAt: '2026-10-18',
          process: 'Observed 45-minute practical bench & pipe test'
        }
      },
      {
        id: 'cred-a-2',
        taskName: 'Tap / fixture installation',
        scopeDetail: 'Basin mixer, kitchen tap & shut-off valve fitting',
        result: 'Practical assessment passed',
        assessorCategory: 'Authorised local trade assessor (Buea)',
        assessedDate: '2026-10-18',
        credentialStatus: 'Active — task-scoped',
        badgeLabel: 'Skill assessed - tap & fixture installation',
        origin: {
          checkedBy: 'Authorised Plumbing Assessor #02',
          checkedAt: '2026-10-18',
          process: 'Observed fixture fitting & pressure seal check'
        }
      }
    ],
    communityReferences: [
      {
        id: 'ref-a-1',
        badgeLabel: 'Reference checked',
        summary: 'Past-client reference checked',
        relationship: 'Former residential landlord, Molyko',
        scope: 'Kitchen sink trap replacement and supply leak repairs (3 visits)',
        checkedDate: '2026-10-16',
        privacyNote: 'Referee phone number and address are kept private.',
        origin: {
          checkedBy: 'BricoTrust Pilot Desk',
          checkedAt: '2026-10-16',
          process: 'Structured phone verification with named referee'
        }
      }
    ],
    confirmedJobsCount: 3,
    reviews: [
      {
        id: 'rev-a-1',
        bookingRef: 'MBS-DEMO-104',
        task: 'Leak repair',
        area: 'Molyko (near UB Junction)',
        confirmedDate: '2026-10-27',
        comment: 'Sample review: Replaced the cracked under-sink P-trap and tested for drips before leaving. Price matched the agreed estimate.',
        isDemoData: true
      },
      {
        id: 'rev-a-2',
        bookingRef: 'MBS-DEMO-112',
        task: 'Tap / fixture installation',
        area: 'Dirty South, Molyko',
        confirmedDate: '2026-11-04',
        comment: 'Sample review: Installed kitchen tap and new angle valve cleanly. Explained what spare part was needed upfront.',
        isDemoData: true
      }
    ],
    limitations: [
      'Assessed only for residential leak repair and standard tap/fixture installation.',
      'Not assessed for commercial boiler systems, deep sewer excavation, or electrical water-heater wiring.',
      'BricoTrust assessment is task-scoped and is not a government trade licence.'
    ]
  },
  {
    id: 'artisan-demo-b',
    isDemoData: true,
    demoLabel: 'Demo profile / Sample data',
    displayName: 'Sample Plumber B',
    initials: 'PB',
    trade: 'Plumbing',
    primaryArea: 'Molyko',
    serviceAreas: ['Molyko', 'Check Point', 'Mile 17', 'Bonduma'],
    coveredTasks: ['Drain blockage', 'Leak repair'],
    bio: 'Demo artisan profile showing a worker with confirmed drain-clearing & leak-repair checks whose daily availability has not yet been confirmed.',
    availability: {
      confirmed: false,
      summary: 'Availability not confirmed',
      confirmedAt: null,
      displayTime: 'Last status check: not updated today'
    },
    quotePolicy: 'Estimate available after job details',
    identityStatus: {
      phoneConfirmed: {
        status: 'Phone confirmed',
        origin: {
          checkedBy: 'BricoTrust Pilot Desk',
          checkedAt: '2026-10-20',
          process: 'OTP verification during onboarding'
        }
      },
      identityChecked: null
    },
    _private: {
      phone: '+237 670 11 11 02',
      idDocumentRef: null,
      referenceContact: '+237 670 99 00 02 (Hidden)'
    },
    skillCredentials: [
      {
        id: 'cred-b-1',
        taskName: 'Drain blockage',
        scopeDetail: 'Household sink, floor trap & short waste pipe clearing',
        result: 'Practical assessment passed',
        assessorCategory: 'Authorised local trade assessor (Buea)',
        assessedDate: '2026-10-24',
        credentialStatus: 'Active — task-scoped',
        badgeLabel: 'Skill assessed - drain blockage',
        origin: {
          checkedBy: 'Authorised Plumbing Assessor #01',
          checkedAt: '2026-10-24',
          process: 'Practical waste-trap clearance & flow test'
        }
      },
      {
        id: 'cred-b-2',
        taskName: 'Leak repair',
        scopeDetail: 'Visible PVC joint & household tap leak fixes',
        result: 'Practical assessment passed',
        assessorCategory: 'Authorised local trade assessor (Buea)',
        assessedDate: '2026-10-24',
        credentialStatus: 'Active — task-scoped',
        badgeLabel: 'Skill assessed - leak repair',
        origin: {
          checkedBy: 'Authorised Plumbing Assessor #01',
          checkedAt: '2026-10-24',
          process: 'Observed pipe joint resealing test'
        }
      }
    ],
    communityReferences: [
      {
        id: 'ref-b-1',
        badgeLabel: 'Reference checked',
        summary: 'Community reference checked',
        relationship: 'Student hostel caretaker, Check Point (Molyko)',
        scope: 'Cleared recurring bathroom floor drains across 6 rooms',
        checkedDate: '2026-10-25',
        privacyNote: 'Referee phone number and hostel address are kept private.',
        origin: {
          checkedBy: 'BricoTrust Pilot Desk',
          checkedAt: '2026-10-25',
          process: 'Phone corroboration with hostel manager'
        }
      }
    ],
    confirmedJobsCount: 2,
    reviews: [
      {
        id: 'rev-b-1',
        bookingRef: 'MBS-DEMO-119',
        task: 'Drain blockage',
        area: 'Check Point, Molyko',
        confirmedDate: '2026-11-02',
        comment: 'Sample review: Cleared the blocked kitchen waste pipe without damaging the sink cabinet.',
        isDemoData: true
      }
    ],
    limitations: [
      'Government ID check is pending; phone and community reference are confirmed.',
      'Not assessed for new multi-room pipe installations or septic tank construction.',
      'Daily availability is currently unconfirmed — expect response confirmation before scheduling.'
    ]
  },
  {
    id: 'artisan-demo-c',
    isDemoData: true,
    demoLabel: 'Demo profile / Sample data',
    displayName: 'Sample Plumber C',
    initials: 'PC',
    trade: 'Plumbing',
    primaryArea: 'Molyko',
    serviceAreas: ['Molyko', 'Bonduma', 'Great Soppo', 'Molyko Stadium'],
    coveredTasks: ['Pipe installation', 'Tap / fixture installation'],
    bio: 'Demo artisan profile focused on household PVC/PPR pipe runs and tank-to-bathroom fixture installations.',
    availability: {
      confirmed: true,
      summary: 'Available tomorrow, 8:00 AM – 1:00 PM',
      confirmedAt: '2026-11-12T08:45:00+01:00',
      displayTime: 'Confirmed today at 08:45'
    },
    quotePolicy: 'Estimate available after job details',
    identityStatus: {
      phoneConfirmed: {
        status: 'Phone confirmed',
        origin: {
          checkedBy: 'BricoTrust Pilot Desk',
          checkedAt: '2026-10-28',
          process: 'OTP verification during onboarding'
        }
      },
      identityChecked: {
        status: 'Identity checked',
        detail: 'National ID sighted at onboarding',
        origin: {
          checkedBy: 'BricoTrust Field Coordinator',
          checkedAt: '2026-10-29',
          process: 'In-person document check (document image not public)'
        }
      }
    },
    _private: {
      phone: '+237 670 11 11 03',
      idDocumentRef: 'PRIVATE-CNI-DEMO-003',
      referenceContact: '+237 670 99 00 03 (Hidden)'
    },
    skillCredentials: [
      {
        id: 'cred-c-1',
        taskName: 'Pipe installation',
        scopeDetail: 'Short household PVC/PPR runs & elevated tank connections',
        result: 'Practical assessment passed',
        assessorCategory: 'Authorised local trade assessor (Buea)',
        assessedDate: '2026-11-01',
        credentialStatus: 'Active — task-scoped',
        badgeLabel: 'Skill assessed - pipe installation',
        origin: {
          checkedBy: 'Authorised Plumbing Assessor #02',
          checkedAt: '2026-11-01',
          process: 'Observed PPR fusion joint & pressure hold test'
        }
      },
      {
        id: 'cred-c-2',
        taskName: 'Tap / fixture installation',
        scopeDetail: 'Shower mixer, bathroom sink & cistern inlet valve',
        result: 'Practical assessment passed',
        assessorCategory: 'Authorised local trade assessor (Buea)',
        assessedDate: '2026-11-01',
        credentialStatus: 'Active — task-scoped',
        badgeLabel: 'Skill assessed - tap & fixture installation',
        origin: {
          checkedBy: 'Authorised Plumbing Assessor #02',
          checkedAt: '2026-11-01',
          process: 'Observed bathroom fixture installation test'
        }
      }
    ],
    communityReferences: [
      {
        id: 'ref-c-1',
        badgeLabel: 'Reference checked',
        summary: 'Trade peer & site reference checked',
        relationship: 'Building contractor, Bonduma',
        scope: 'Assisted on residential 4-unit bathroom pipe rough-in',
        checkedDate: '2026-10-30',
        privacyNote: 'Referee phone number and site details are kept private.',
        origin: {
          checkedBy: 'BricoTrust Pilot Desk',
          checkedAt: '2026-10-30',
          process: 'Phone verification with supervising contractor'
        }
      }
    ],
    confirmedJobsCount: 1,
    reviews: [
      {
        id: 'rev-c-1',
        bookingRef: 'MBS-DEMO-125',
        task: 'Pipe installation',
        area: 'Bonduma, Buea',
        confirmedDate: '2026-11-08',
        comment: 'Sample review: Connected the water tank supply line neatly with shut-off valve access.',
        isDemoData: true
      }
    ],
    limitations: [
      'Large multi-storey or commercial plumbing installations require pre-match scope review.',
      'Not assessed for drain jetting or underground municipal main connections.',
      'BricoTrust assessment is task-scoped and is not a government trade licence.'
    ]
  }
];

