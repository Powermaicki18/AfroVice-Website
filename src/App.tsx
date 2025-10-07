import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PurchasePage from './pages/PurchasePage';
import ArtistsPage from './pages/ArtistsPage';
import CommunityPage from './pages/CommunityPage';

function App() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();

  const handleNavigate = (page: string, eventId?: string) => {
    setCurrentPage(page);
    if (eventId) {
      setSelectedEventId(eventId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'eventos':
        return <EventsPage onNavigate={handleNavigate} />;
      case 'galeria':
        return <GalleryPage />;
      case 'nosotros':
        return <AboutPage />;
      case 'contacto':
        return <ContactPage />;
      case 'compras':
        return <PurchasePage eventId={selectedEventId} />;
      case 'artistas':
        return <ArtistsPage />;
      case 'comunidad':
        return <CommunityPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e]">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
    </div>
  );
}

export default App;
