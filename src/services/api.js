const API_BASE = '/api';

async function requestJson(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error || 'Request could not be completed.');
      error.status = response.status;
      error.field = data.field || null;
      throw error;
    }
    return data;
  } catch (err) {
    if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
      const offlineError = new Error(
        'Cannot reach the BricoTrust server right now. Your details are preserved — please retry or contact our Buea Pilot Desk directly.'
      );
      offlineError.isOffline = true;
      throw offlineError;
    }
    throw err;
  }
}

export const api = {
  getHealth: () => requestJson('/health'),
  getPreviewArtisans: () => requestJson('/artisans/preview'),
  parseRequest: (payload) =>
    requestJson('/requests/parse', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  createRequest: (payload) =>
    requestJson('/requests', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  getMatches: (requestId) => requestJson(`/requests/${encodeURIComponent(requestId)}/matches`),
  getPublicProfile: (artisanId) => requestJson(`/artisans/${encodeURIComponent(artisanId)}/public-profile`),
  getTrustPassport: (artisanId) => requestJson(`/artisans/${encodeURIComponent(artisanId)}/credentials`),
  createBooking: (payload) =>
    requestJson('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  completeBooking: (bookingId, payload) =>
    requestJson(`/bookings/${encodeURIComponent(bookingId)}/complete`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  submitArtisanApplication: (payload) =>
    requestJson('/artisans', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  submitSupportInquiry: (payload) =>
    requestJson('/support', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  trackEvent: (event, payload = {}) => {
    fetch(`${API_BASE}/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload })
    }).catch(() => {
      // Analytics must never interrupt user flows
    });
  }
};

