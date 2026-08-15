import { useState, useRef } from 'react';
import { Eye, EyeOff, ChevronDown, ChevronUp, Camera, Trash2, Plus, Edit2, X } from 'lucide-react';
import { Drawer } from 'vaul';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Italic, Essentials, Paragraph } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

const tabs = ['Profile', 'Security', 'FAQ', 'Privacy Policy', 'Terms & Conditions'];

const initialFaqItems = [
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

const initialPrivacyHtml = `
<h2>Information We Collect</h2>
<p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes your name, email address, phone number, business information, and any other information you choose to provide.</p>
<h2>How We Use Your Information</h2>
<p>We use the information we collect to provide, maintain, and improve our services, process transactions, send administrative messages, respond to your comments and questions, and for other business purposes.</p>
<h2>Data Security</h2>
<p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration, and destruction. All data is encrypted in transit and at rest using industry-standard encryption protocols.</p>
<h2>Third-Party Services</h2>
<p>We may share your information with third-party vendors and service providers that perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
<h2>Contact Us</h2>
<p>If you have any questions about this Privacy Policy, please contact us at privacy@byoj.com or write to us at BYOJ Jewelry, 123 Fifth Avenue, New York, NY 10001.</p>
`;

const initialTermsHtml = `
<h2>Acceptance of Terms</h2>
<p>By accessing and using the BYOJ platform, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service apply to all users of the platform.</p>
<h2>Use of Platform</h2>
<p>You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform. Prohibited behavior includes harassing or causing distress to any person and transmitting obscene content.</p>
<h2>Payments & Fees</h2>
<p>All payments made through the platform are subject to our payment processing terms. Design fees, order deposits, and final payments must be completed according to the agreed schedule. Refunds are subject to our cancellation policy.</p>
<h2>Intellectual Property</h2>
<p>All designs created through BYOJ remain the intellectual property of the respective designers and customers as agreed upon in each order. Custom designs are confidential and will not be shared with third parties.</p>
<h2>Limitation of Liability</h2>
<p>BYOJ shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or goodwill, resulting from your access to or use of our services.</p>
<h2>Changes to Terms</h2>
<p>We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on the platform and updating the effective date. Your continued use of the platform after changes constitutes acceptance.</p>
`;

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

export function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');
  
  // Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1 (555) 123-4567' });
  const [profilePic, setProfilePic] = useState<string | null>(null);
  
  // Security State
  const [passwordValue, setPasswordValue] = useState('');

  // FAQ State
  const [faqs, setFaqs] = useState(initialFaqItems);
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Policies State
  const [privacyHtml, setPrivacyHtml] = useState(initialPrivacyHtml);
  const [termsHtml, setTermsHtml] = useState(initialTermsHtml);
  
  // Drawer State for CKEditor
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'privacy' | 'terms'>('privacy');
  const [editingHtml, setEditingHtml] = useState('');

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  };

  const handleDeleteFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
    if (openFaqIndex === index) setOpenFaqIndex(null);
  };

  const handleAddFaq = () => {
    if (newFaqQ.trim() && newFaqA.trim()) {
      setFaqs([...faqs, { q: newFaqQ, a: newFaqA }]);
      setNewFaqQ('');
      setNewFaqA('');
      setIsAddingFaq(false);
    }
  };

  const openEditorDrawer = (type: 'privacy' | 'terms') => {
    setDrawerType(type);
    setEditingHtml(type === 'privacy' ? privacyHtml : termsHtml);
    setIsDrawerOpen(true);
  };

  const saveEditorDrawer = () => {
    if (drawerType === 'privacy') {
      setPrivacyHtml(editingHtml);
    } else {
      setTermsHtml(editingHtml);
    }
    setIsDrawerOpen(false);
  };

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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Profile Information</h2>
              <p style={{ color: '#888888', fontSize: '14px' }}>Update your personal details</p>
            </div>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  border: '1px solid #2A2A2A',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#2A2A2A', overflow: 'hidden', border: '2px solid #D4A84B' }}>
              {profilePic ? (
                <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888888', fontSize: '24px', fontWeight: 'bold' }}>
                  {profile.firstName[0]}{profile.lastName[0]}
                </span>
              )}
              {isEditingProfile && (
                <label style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Camera size={24} color="#FFFFFF" />
                  <input type="file" accept="image/*" onChange={handleProfilePicChange} style={{ display: 'none' }} />
                </label>
              )}
            </div>
            {isEditingProfile && (
              <div style={{ color: '#888888', fontSize: '13px' }}>
                Click the avatar to upload a new profile picture.
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>First Name</label>
              <input 
                value={profile.firstName} 
                onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))} 
                style={{ ...inputStyle, opacity: isEditingProfile ? 1 : 0.6 }} 
                disabled={!isEditingProfile} 
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Last Name</label>
              <input 
                value={profile.lastName} 
                onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))} 
                style={{ ...inputStyle, opacity: isEditingProfile ? 1 : 0.6 }} 
                disabled={!isEditingProfile} 
              />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Email</label>
            <input 
              value={profile.email} 
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} 
              style={{ ...inputStyle, opacity: isEditingProfile ? 1 : 0.6 }} 
              disabled={!isEditingProfile} 
            />
          </div>
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Phone</label>
            <input 
              value={profile.phone} 
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} 
              style={{ ...inputStyle, opacity: isEditingProfile ? 1 : 0.6 }} 
              disabled={!isEditingProfile} 
            />
          </div>

          {isEditingProfile && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSaveProfile}
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
              <button
                onClick={() => setIsEditingProfile(false)}
                style={{
                  padding: '12px 28px',
                  backgroundColor: 'transparent',
                  border: '1px solid #2A2A2A',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          )}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: '#888888', fontSize: '14px' }}>Manage FAQ content displayed to users</p>
            </div>
            <button
              onClick={() => setIsAddingFaq(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#D4A84B',
                border: 'none',
                borderRadius: '8px',
                color: '#000000',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <Plus size={16} /> Add FAQ
            </button>
          </div>

          {isAddingFaq && (
            <div style={{ backgroundColor: '#252525', padding: '20px', borderRadius: '12px', border: '1px solid #2A2A2A', marginBottom: '20px' }}>
              <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Add New FAQ</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Question</label>
                  <input 
                    value={newFaqQ} 
                    onChange={(e) => setNewFaqQ(e.target.value)} 
                    style={inputStyle} 
                    placeholder="Enter the question"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Answer</label>
                  <textarea 
                    value={newFaqA} 
                    onChange={(e) => setNewFaqA(e.target.value)} 
                    style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} 
                    placeholder="Enter the answer"
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleAddFaq}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#D4A84B',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#000000',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  Save FAQ
                </button>
                <button
                  onClick={() => setIsAddingFaq(false)}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: 'transparent',
                    border: '1px solid #2A2A2A',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#252525',
                  borderRadius: '10px',
                  border: '1px solid #2A2A2A',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                >
                  <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600', textAlign: 'left', flex: 1 }}>{item.q}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFaq(i);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#EF4444',
                        display: 'flex',
                        padding: '4px',
                      }}
                      title="Delete FAQ"
                    >
                      <Trash2 size={16} />
                    </button>
                    {openFaqIndex === i ? <ChevronUp size={16} color="#888888" /> : <ChevronDown size={16} color="#888888" />}
                  </div>
                </div>
                {openFaqIndex === i && (
                  <div style={{ padding: '0 20px 16px', color: '#CCCCCC', fontSize: '14px', lineHeight: '1.6' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
            {faqs.length === 0 && (
              <div style={{ color: '#888888', fontSize: '14px', textAlign: 'center', padding: '24px' }}>
                No FAQs available. Click "Add FAQ" to create one.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'Privacy Policy' && (
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            padding: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Privacy Policy</h2>
              <p style={{ color: '#888888', fontSize: '14px' }}>Last updated: March 2024</p>
            </div>
            <button
              onClick={() => openEditorDrawer('privacy')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <Edit2 size={16} /> Edit Content
            </button>
          </div>
          <div 
            style={{ color: '#CCCCCC', fontSize: '14px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '16px' }}
            dangerouslySetInnerHTML={{ __html: privacyHtml }}
          />
        </div>
      )}

      {activeTab === 'Terms & Conditions' && (
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            padding: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Terms & Conditions</h2>
              <p style={{ color: '#888888', fontSize: '14px' }}>Effective date: January 2024</p>
            </div>
            <button
              onClick={() => openEditorDrawer('terms')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <Edit2 size={16} /> Edit Content
            </button>
          </div>
          <div 
            style={{ color: '#CCCCCC', fontSize: '14px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '16px' }}
            dangerouslySetInnerHTML={{ __html: termsHtml }}
          />
        </div>
      )}

      {/* Editor Drawer using Vaul */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
        <Drawer.Portal>
          <Drawer.Overlay style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100 }} />
          <Drawer.Content 
            style={{ 
              position: 'fixed', 
              right: 0, 
              top: 0, 
              bottom: 0, 
              width: '100%', 
              maxWidth: '800px', 
              backgroundColor: '#1E1E1E', 
              zIndex: 101, 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ padding: '24px', borderBottom: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Drawer.Title style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: '700' }}>
                Edit {drawerType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </Drawer.Title>
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid #2A2A2A',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: '#888888',
                  display: 'flex',
                  padding: '6px',
                }}
              >
                <X size={16} />
              </button>
            </div>
            
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <style>{`
                .ck-editor__editable_inline {
                  min-height: 400px;
                  color: #000;
                }
              `}</style>
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden' }}>
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    plugins: [Essentials, Bold, Italic, Paragraph],
                    toolbar: ['undo', 'redo', '|', 'bold', 'italic']
                  }}
                  data={editingHtml}
                  onChange={(event, editor) => {
                    setEditingHtml(editor.getData());
                  }}
                />
              </div>
            </div>

            <div style={{ padding: '24px', borderTop: '1px solid #2A2A2A', display: 'flex', gap: '12px' }}>
              <button 
                onClick={saveEditorDrawer} 
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
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                style={{
                  padding: '12px 28px',
                  backgroundColor: 'transparent',
                  border: '1px solid #2A2A2A',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
