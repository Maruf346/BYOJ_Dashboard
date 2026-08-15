import { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { DesignRequests } from './components/DesignRequests';
import { Chats } from './components/Chats';
import { MeetingSchedule } from './components/MeetingSchedule';
import { Materials } from './components/Materials';
import { Orders } from './components/Orders';
import { Shipping } from './components/Shipping';
import { Customers } from './components/Customers';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import type { ActivePage } from './components/Sidebar';

const pagePaths: Record<ActivePage, string> = {
  dashboard: '/dashboard',
  'design-requests': '/design-requests',
  chats: '/chats',
  'meeting-schedule': '/meeting-schedule',
  materials: '/materials',
  orders: '/orders',
  shipping: '/shipping',
  customers: '/customers',
  settings: '/settings',
};

const pathPages: Record<string, ActivePage> = Object.fromEntries(
  Object.entries(pagePaths).map(([page, path]) => [path, page]),
) as Record<string, ActivePage>;

function getStoredAuth() {
  return sessionStorage.getItem('byoj-admin-auth') === 'true';
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const login = () => {
    sessionStorage.setItem('byoj-admin-auth', 'true');
    setIsAuthenticated(true);
    navigate('/dashboard', { replace: true });
  };

  const logout = () => {
    sessionStorage.removeItem('byoj-admin-auth');
    setIsAuthenticated(false);
    navigate('/', { replace: true });
  };

  const navigateToPage = (page: ActivePage) => {
    navigate(pagePaths[page]);
  };

  const activePage = pathPages[location.pathname] ?? 'dashboard';

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Login onLogin={login} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />
      <Route
        path="/*"
        element={
          <div
            style={{
              backgroundColor: '#0D0D0D',
              minHeight: '100vh',
              display: 'flex',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              color: '#FFFFFF',
            }}
          >
            <Sidebar activePage={activePage} onNavigate={navigateToPage} onLogout={logout} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
              <Navbar />
              <main
                style={{
                  flex: 1,
                  padding: '32px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                <Routes>
                  <Route path="/dashboard" element={<Dashboard onNavigate={navigateToPage} />} />
                  <Route path="/design-requests" element={<DesignRequests onNavigate={navigateToPage} />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/meeting-schedule" element={<MeetingSchedule onNavigate={navigateToPage} />} />
                  <Route path="/materials" element={<Materials />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/customers" element={<Customers onNavigate={navigateToPage} />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
