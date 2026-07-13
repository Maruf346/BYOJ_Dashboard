import { useState } from 'react';
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
import type { ActivePage } from './components/Sidebar';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigate={setActivePage} />;
      case 'design-requests':
        return <DesignRequests onNavigate={setActivePage} />;
      case 'chats':
        return <Chats />;
      case 'meeting-schedule':
        return <MeetingSchedule onNavigate={setActivePage} />;
      case 'materials':
        return <Materials />;
      case 'orders':
        return <Orders />;
      case 'shipping':
        return <Shipping />;
      case 'customers':
        return <Customers onNavigate={setActivePage} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#0D0D0D',
        minHeight: '100vh',
        display: 'flex',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#FFFFFF',
      }}
    >
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
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
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
