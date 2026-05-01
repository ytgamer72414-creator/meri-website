import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import Reviews from './pages/Reviews';
import Pricing from './pages/Pricing';
import PortfolioCategory from './pages/PortfolioCategory';
import PlaceholderPage from './pages/PlaceholderPage';
import Contact from './pages/Contact';

// Admin
import { AdminProvider } from './admin/AdminContext';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

function App() {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* ── Admin routes (no Navbar/Footer) ── */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* ── Public routes ── */}
          <Route path="/*" element={
            <div className="app-container">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/help" element={<PlaceholderPage title="Help & Support" />} />
                  <Route path="/portfolio/:category" element={<PortfolioCategory />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
