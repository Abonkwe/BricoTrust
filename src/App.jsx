import React, { useRef, useState } from 'react';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import BookingModal from './components/BookingModal';
import LandingPage from './pages/LandingPage';
import RequestPage from './pages/RequestPage';
import MatchResultsPage from './pages/MatchResultsPage';
import ArtisanProfilePage from './pages/ArtisanProfilePage';
import ArtisanJoinPage from './pages/ArtisanJoinPage';
import InfoSupportPage from './pages/InfoSupportPage';

export default function App() {
  const [view, setView] = useState({ page: 'landing' });
  const [previousView, setPreviousView] = useState({ page: 'landing' });
  const [preselectedTask, setPreselectedTask] = useState('');
  const [requestDraft, setRequestDraft] = useState(null);
  const [activeRequest, setActiveRequest] = useState(null);
  const [bookingArtisan, setBookingArtisan] = useState(null);

  const heroInputRef = useRef(null);

  const navigate = (nextView) => {
    setPreviousView(view);
    setView(nextView);

    if (nextView.page === 'landing' && nextView.section) {
      setTimeout(() => {
        if (nextView.section === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(nextView.section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartRequest = () => {
    if (view.page !== 'landing') {
      navigate({ page: 'request' });
      return;
    }
    const heroFormEl = document.getElementById('hero-request');
    if (heroFormEl) heroFormEl.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => heroInputRef.current?.focus(), 200);
  };

  const handleSelectServiceCard = (serviceName) => {
    setPreselectedTask(serviceName);
    const heroFormEl = document.getElementById('hero-request');
    if (heroFormEl) heroFormEl.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => heroInputRef.current?.focus(), 220);
  };

  const handleRequestParsed = (draft) => {
    setRequestDraft(draft);
    navigate({ page: 'request' });
  };

  const handleRequestSubmitted = (createdRequest) => {
    setActiveRequest(createdRequest);
    navigate({ page: 'matches' });
  };

  const handleViewPassport = (artisanId) => {
    navigate({ page: 'artisan-profile', artisanId });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <SiteHeader
        currentView={view}
        onNavigate={navigate}
        onStartRequest={handleStartRequest}
      />

      <main id="main-content" style={{ flex: 1 }}>
        {view.page === 'landing' && (
          <LandingPage
            formInputRef={heroInputRef}
            preselectedTask={preselectedTask}
            onSelectService={handleSelectServiceCard}
            onRequestParsed={handleRequestParsed}
            onViewPassport={handleViewPassport}
            onRequestBooking={(artisan) => setBookingArtisan(artisan)}
            onJoinArtisan={() => navigate({ page: 'artisan-join' })}
            onOpenSupport={() => navigate({ page: 'support', topic: 'Customer support' })}
          />
        )}

        {view.page === 'request' && (
          <RequestPage
            initialDraft={requestDraft}
            onBack={() => navigate({ page: 'landing' })}
            onRequestSubmitted={handleRequestSubmitted}
            onOpenSupport={() => navigate({ page: 'support', topic: 'Customer support' })}
          />
        )}

        {view.page === 'matches' && (
          <MatchResultsPage
            requestRecord={activeRequest}
            onBackToEdit={() => navigate({ page: 'request' })}
            onBackHome={() => navigate({ page: 'landing' })}
            onViewPassport={handleViewPassport}
            onRequestBooking={(artisan) => setBookingArtisan(artisan)}
            onOpenSupport={() => navigate({ page: 'support', topic: 'Customer support' })}
          />
        )}

        {view.page === 'artisan-profile' && (
          <ArtisanProfilePage
            artisanId={view.artisanId}
            onBack={() => {
              if (previousView.page === 'matches' && activeRequest) {
                navigate({ page: 'matches' });
              } else {
                navigate({ page: 'landing', section: 'match-preview' });
              }
            }}
            onRequestBooking={(artisan) => setBookingArtisan(artisan)}
          />
        )}

        {view.page === 'artisan-join' && (
          <ArtisanJoinPage onBack={() => navigate({ page: 'landing' })} />
        )}

        {(view.page === 'support' || view.page === 'privacy' || view.page === 'terms') && (
          <InfoSupportPage
            mode={view.page}
            initialTopic={view.topic || 'Customer support'}
            onBack={() => navigate({ page: 'landing' })}
          />
        )}
      </main>

      <SiteFooter onNavigate={navigate} />

      {bookingArtisan && (
        <BookingModal
          artisan={bookingArtisan}
          requestContext={activeRequest}
          onClose={() => setBookingArtisan(null)}
        />
      )}
    </div>
  );
}

