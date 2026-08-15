import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { initialFaqItems } from '../../mock/settings';

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

export function FaqTab() {
  const [faqs, setFaqs] = useState(initialFaqItems);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  const handleAdd = () => {
    if (newQ.trim() && newA.trim()) {
      setFaqs([...faqs, { q: newQ, a: newA }]);
      setNewQ('');
      setNewA('');
      setIsAdding(false);
    }
  };

  const handleDelete = (i: number) => {
    setFaqs(faqs.filter((_, idx) => idx !== i));
    if (openIndex === i) setOpenIndex(null);
  };

  return (
    <div style={{ backgroundColor: '#1E1E1E', borderRadius: '12px', border: '1px solid #2A2A2A', padding: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Frequently Asked Questions</h2>
          <p style={{ color: '#888888', fontSize: '14px' }}>Manage FAQ content displayed to users</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#D4A84B', border: 'none', borderRadius: '8px', color: '#000000', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
        >
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {isAdding && (
        <div style={{ backgroundColor: '#252525', padding: '20px', borderRadius: '12px', border: '1px solid #2A2A2A', marginBottom: '20px' }}>
          <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>New FAQ</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Question</label>
              <input value={newQ} onChange={(e) => setNewQ(e.target.value)} style={inputStyle} placeholder="Enter the question" />
            </div>
            <div>
              <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Answer</label>
              <textarea value={newA} onChange={(e) => setNewA(e.target.value)} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} placeholder="Enter the answer" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleAdd} style={{ padding: '10px 24px', backgroundColor: '#D4A84B', border: 'none', borderRadius: '8px', color: '#000000', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              Save FAQ
            </button>
            <button onClick={() => { setIsAdding(false); setNewQ(''); setNewA(''); }} style={{ padding: '10px 24px', backgroundColor: 'transparent', border: '1px solid #2A2A2A', borderRadius: '8px', color: '#FFFFFF', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {faqs.map((item, i) => (
          <div key={i} style={{ backgroundColor: '#252525', borderRadius: '10px', border: '1px solid #2A2A2A', overflow: 'hidden' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', cursor: 'pointer' }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600', flex: 1, textAlign: 'left' }}>{item.q}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(i); }}
                  title="Delete FAQ"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', padding: '4px' }}
                >
                  <Trash2 size={15} />
                </button>
                {openIndex === i ? <ChevronUp size={16} color="#888888" /> : <ChevronDown size={16} color="#888888" />}
              </div>
            </div>
            {openIndex === i && (
              <div style={{ padding: '0 20px 16px', color: '#CCCCCC', fontSize: '14px', lineHeight: '1.6' }}>{item.a}</div>
            )}
          </div>
        ))}
        {faqs.length === 0 && (
          <div style={{ color: '#888888', fontSize: '14px', textAlign: 'center', padding: '24px' }}>
            No FAQs yet. Click "Add FAQ" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
