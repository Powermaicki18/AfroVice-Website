import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PurchasePage from './pages/PurchasePage';
import ArtistsPage from './pages/ArtistsPage';
import CommunityPage from './pages/CommunityPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#1a0f2e]">
        <Navigation currentPage='inicio' />
        <Routes>
          <Route path="/" element={<HomePage />} index />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/compras/:eventId" element={<PurchasePage />} />
          <Route path="/artistas" element={<ArtistsPage />} />
          <Route path="/comunidad" element={<CommunityPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
