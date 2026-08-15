import { useState } from 'react';
import { ProfileTab } from './settings/ProfileTab';
import { SecurityTab } from './settings/SecurityTab';
import { FaqTab } from './settings/FaqTab';
import { PolicyTab } from './settings/PolicyTab';
import { initialPrivacyHtml, initialTermsHtml } from '../mock/settings';

const tabs = ['Profile', 'Security', 'FAQ', 'Privacy Policy', 'Terms & Conditions'] as const;
type Tab = typeof tabs[number];

export function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('Profile');

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>Settings</h1>
        <p style={{ color: '#888888', fontSize: '14px' }}>Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', overflowX: 'auto' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: activeTab === tab ? '1px solid #D4A84B' : '1px solid transparent',
              backgroundColor: activeTab === tab ? 'rgba(212,168,75,0.08)' : 'transparent',
              color: activeTab === tab ? '#D4A84B' : '#888888',
              fontSize: '14px',
              fontWeight: activeTab === tab ? '600' : '400',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'Profile' && <ProfileTab />}
      {activeTab === 'Security' && <SecurityTab />}
      {activeTab === 'FAQ' && <FaqTab />}
      {activeTab === 'Privacy Policy' && (
        <PolicyTab
          title="Privacy Policy"
          subtitle="Last updated: March 2024"
          initialHtml={initialPrivacyHtml}
        />
      )}
      {activeTab === 'Terms & Conditions' && (
        <PolicyTab
          title="Terms & Conditions"
          subtitle="Effective date: January 2024"
          initialHtml={initialTermsHtml}
        />
      )}
    </div>
  );
}
