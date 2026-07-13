import { useState } from 'react';
import { Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';

const tabs = ['Profile', 'Security', 'FAQ', 'Privacy Policy', 'Terms & Conditions'];

const faqItems = [
  {
    q: 'How do I create a new design request?',
    a: 'Navigate to the Design Requests section from the sidebar, then click the "New Request" button. Fill in the customer details, item type, and specifications. Once submitted, the request will appear in your list for review.',
  },
  {
    q: 'How do I track a shipment?',
    a: 'Go to the Shipping section from the sidebar. You can view all active shipments, their tracking numbers, and current status. Click the eye icon on any shipment to see detailed tracking information.',
  },
  {
    q: 'How can I communicate with a client?',
    a: 'Use the Chats section to message clients directly. You can find all conversations listed on the left panel. Click on a conversation to view and send messages, attach files, or upload CAD designs.',
  },
  {
    q: 'What materials are available for jewelry?',
    a: 'Available materials are managed in the Materials section. You can add metals (with carat specifications), diamond categories, and clarity grades. All materials added here will be available across the platform.',
  },
  {
    q: 'How do I update an order status?',
    a: 'Open any order by clicking the eye icon in the Orders table. In the Order Details popup, you will see status pills at the bottom. Select the new status and click "Save Changes" to update.',
  },
];

const privacySections = [
  {
    title: 'Information We Collect',
    content:
      'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes your name, email address, phone number, business information, and any other information you choose to provide.',
  },
  {
    title: 'How We Use Your Information',
    content:
      'We use the information we collect to provide, maintain, and improve our services, process transactions, send administrative messages, respond to your comments and questions, and for other business purposes.',
  },
  {
    title: 'Data Security',
    content:
      'We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration, and destruction. All data is encrypted in transit and at rest using industry-standard encryption protocols.',
  },
  {
    title: 'Third-Party Services',
    content:
      'We may share your information with third-party vendors and service providers that perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.',
  },
  {
    title: 'Contact Us',
    content:
      'If you have any questions about this Privacy Policy, please contact us at privacy@byoj.com or write to us at BYOJ Jewelry, 123 Fifth Avenue, New York, NY 10001.',
  },
];

const termsSections = [
  {
    title: 'Acceptance of Terms',
    content:
      'By accessing and using the BYOJ platform, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service apply to all users of the platform.',
  },
  {
    title: 'Use of Platform',
    content:
      'You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else\'s use and enjoyment of the platform. Prohibited behavior includes harassing or causing distress to any person and transmitting obscene content.',
  },
  {
    title: 'Payments & Fees',
    content:
      'All payments made through the platform are subject to our payment processing terms. Design fees, order deposits, and final payments must be completed according to the agreed schedule. Refunds are subject to our cancellation policy.',
  },
  {
    title: 'Intellectual Property',
    content:
      'All designs created through BYOJ remain the intellectual property of the respective designers and customers as agreed upon in each order. Custom designs are confidential and will not be shared with third parties.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'BYOJ shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or goodwill, resulting from your access to or use of our services.',
  },
  {
    title: 'Changes to Terms',
    content:
      'We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on the platform and updating the effective date. Your continued use of the platform after changes constitutes acceptance.',
  },
];

function PasswordInput({ placeholder }: { placeholder: string }) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  return (
    <div style={{ position: 'relative' }}>
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          backgroundColor: '#1A1A1A',
          border: '1px solid #2A2A2A',
          borderRadius: '8px',
          padding: '12px 44px 12px 16px',
          color: '#FFFFFF',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      <button
        onClick={() => setShow((v) => !v)}
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#888888',
          display: 'flex',
        }}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

function PasswordStrength({ value }: { value: string }) {
  const strength = value.length === 0 ? 0 : value.length < 6 ? 1 : value.length < 10 ? 2 : value.length < 14 ? 3 : 4;
  const colors = ['#2A2A2A', '#EF4444', '#F97316', '#D4A84B', '#22C55E'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              backgroundColor: i <= strength ? colors[strength] : '#2A2A2A',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </div>
      {strength > 0 && (
        <span style={{ color: colors[strength], fontSize: '12px', fontWeight: '600' }}>{labels[strength]}</span>
      )}
    </div>
  );
}

function FAQAccordion({ items }: { items: typeof faqItems }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#252525',
            borderRadius: '10px',
            border: '1px solid #2A2A2A',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: '100%',
              padding: '16px 20px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600', textAlign: 'left' }}>{item.q}</span>
            {openIndex === i ? <ChevronUp size={16} color="#888888" /> : <ChevronDown size={16} color="#888888" />}
          </button>
          {openIndex === i && (
            <div style={{ padding: '0 20px 16px', color: '#CCCCCC', fontSize: '14px', lineHeight: '1.6' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function LongFormContent({ sections, subtitle }: { sections: typeof privacySections; subtitle: string }) {
  return (
    <div style={{ color: '#888888', fontSize: '13px', marginBottom: '20px' }}>{subtitle}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
        {sections.map((s, i) => (
          <div key={i}>
            <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{s.title}</div>
            <p style={{ color: '#CCCCCC', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [profile, setProfile] = useState({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1 (555) 123-4567' });
  const [passwordValue, setPasswordValue] = useState('');

  const inputStyle = {
    width: '100%',
    backgroundColor: '#1A1A1A',
    border: '1px solid #2A2A2A',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#FFFFFF',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

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
      {activeTab === 'Profile' && (
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            padding: '28px',
          }}
        >
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Profile Information</h2>
          <p style={{ color: '#888888', fontSize: '14px', marginBottom: '24px' }}>Update your personal details</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>First Name</label>
              <input value={profile.firstName} onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Last Name</label>
              <input value={profile.lastName} onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))} style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Email</label>
            <input value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} style={inputStyle} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Phone</label>
            <input value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} style={inputStyle} />
          </div>

          <button
            style={{
              padding: '12px 28px',
              backgroundColor: '#D4A84B',
              border: 'none',
              borderRadius: '8px',
              color: '#000000',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
        </div>
      )}

      {activeTab === 'Security' && (
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            padding: '28px',
          }}
        >
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Change Password</h2>
          <p style={{ color: '#888888', fontSize: '14px', marginBottom: '24px' }}>Update your account password</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxWidth: '480px' }}>
            <div>
              <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Current Password</label>
              <PasswordInput placeholder="Enter current password" />
            </div>
            <div>
              <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>New Password</label>
              <div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    placeholder="Enter new password"
                    style={{ ...inputStyle, paddingRight: '44px' }}
                  />
                </div>
                <PasswordStrength value={passwordValue} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Confirm New Password</label>
              <PasswordInput placeholder="Confirm new password" />
            </div>
          </div>

          <button
            style={{
              padding: '12px 28px',
              backgroundColor: '#D4A84B',
              border: 'none',
              borderRadius: '8px',
              color: '#000000',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Update Password
          </button>
        </div>
      )}

      {activeTab === 'FAQ' && (
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            padding: '28px',
          }}
        >
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      )}

      {activeTab === 'Privacy Policy' && (
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            padding: '28px',
            maxHeight: '600px',
            overflowY: 'auto',
          }}
        >
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Privacy Policy</h2>
          <LongFormContent sections={privacySections} subtitle="Last updated: March 2024" />
        </div>
      )}

      {activeTab === 'Terms & Conditions' && (
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            padding: '28px',
            maxHeight: '600px',
            overflowY: 'auto',
          }}
        >
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Terms & Conditions</h2>
          <LongFormContent sections={termsSections} subtitle="Effective date: January 2024" />
        </div>
      )}
    </div>
  );
}
