import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';

interface Metal {
  id: string;
  name: string;
  carat: string;
}

interface Diamond {
  id: string;
  name: string;
}

const initialMetals: Metal[] = [
  { id: '1', name: 'Yellow Gold', carat: '18K' },
  { id: '2', name: 'White Gold', carat: '14K' },
  { id: '3', name: 'Rose Gold', carat: '18K' },
  { id: '4', name: 'Platinum', carat: '950' },
];

const initialDiamonds: Diamond[] = [
  { id: '1', name: 'Yellow Diamond' },
  { id: '2', name: 'White Diamond' },
  { id: '3', name: 'Pink Diamond' },
  { id: '4', name: 'Blue Diamond' },
];

const initialClarityGrades = ['VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];

export function Materials() {
  const [metals, setMetals] = useState<Metal[]>(initialMetals);
  const [newMetalName, setNewMetalName] = useState('');
  const [newMetalCarat, setNewMetalCarat] = useState('');

  const [diamonds, setDiamonds] = useState<Diamond[]>(initialDiamonds);
  const [newDiamond, setNewDiamond] = useState('');

  const [clarityGrades, setClarityGrades] = useState<string[]>(initialClarityGrades);
  const [newClarity, setNewClarity] = useState('');

  const addMetal = () => {
    if (!newMetalName.trim()) return;
    setMetals((prev) => [...prev, { id: String(Date.now()), name: newMetalName.trim(), carat: newMetalCarat.trim() }]);
    setNewMetalName('');
    setNewMetalCarat('');
  };

  const removeMetal = (id: string) => setMetals((prev) => prev.filter((m) => m.id !== id));

  const addDiamond = () => {
    if (!newDiamond.trim()) return;
    setDiamonds((prev) => [...prev, { id: String(Date.now()), name: newDiamond.trim() }]);
    setNewDiamond('');
  };

  const removeDiamond = (id: string) => setDiamonds((prev) => prev.filter((d) => d.id !== id));

  const addClarity = () => {
    if (!newClarity.trim()) return;
    setClarityGrades((prev) => [...prev, newClarity.trim()]);
    setNewClarity('');
  };

  const removeClarity = (grade: string) => setClarityGrades((prev) => prev.filter((g) => g !== grade));

  const inputStyle = {
    backgroundColor: '#1A1A1A',
    border: '1px solid #2A2A2A',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#FFFFFF',
    fontSize: '14px',
    outline: 'none',
  };

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>Materials</h1>
        <p style={{ color: '#888888', fontSize: '14px' }}>Manage your metals and gemstones inventory</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* LEFT: Metals */}
        <div>
          {/* Metals list */}
          <div
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '12px',
              border: '1px solid #2A2A2A',
              padding: '24px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600' }}>Metals</span>
              <button
                onClick={() => {}}
                style={{
                  padding: '6px 14px',
                  backgroundColor: 'transparent',
                  border: '1px solid #D4A84B',
                  borderRadius: '8px',
                  color: '#D4A84B',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Plus size={14} /> Add Metal
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {metals.map((metal) => (
                <div
                  key={metal.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#252525',
                    borderRadius: '8px',
                  }}
                >
                  <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600', flex: 1 }}>
                    {metal.name}
                  </span>
                  <input
                    value={metal.carat}
                    onChange={(e) => setMetals((prev) => prev.map((m) => m.id === metal.id ? { ...m, carat: e.target.value } : m))}
                    style={{
                      ...inputStyle,
                      width: '70px',
                      padding: '6px 10px',
                      textAlign: 'center',
                    }}
                  />
                  <button
                    onClick={() => removeMetal(metal.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#555555',
                      display: 'flex',
                      padding: '4px',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add metal form */}
          <div
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '12px',
              border: '1px solid #2A2A2A',
              padding: '20px',
            }}
          >
            <div style={{ color: '#888888', fontSize: '13px', marginBottom: '12px' }}>Add New Metal</div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                value={newMetalName}
                onChange={(e) => setNewMetalName(e.target.value)}
                placeholder="Metal name"
                style={{ ...inputStyle, flex: 1 }}
              />
              <input
                value={newMetalCarat}
                onChange={(e) => setNewMetalCarat(e.target.value)}
                placeholder="Carat"
                style={{ ...inputStyle, width: '80px' }}
              />
            </div>
            <button
              onClick={addMetal}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#D4A84B',
                border: 'none',
                borderRadius: '8px',
                color: '#000000',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </div>

        {/* RIGHT: Diamonds + Clarity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Diamond Categories */}
          <div
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '12px',
              border: '1px solid #2A2A2A',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600' }}>Diamond Categories</span>
              <button
                style={{
                  padding: '6px 14px',
                  backgroundColor: 'transparent',
                  border: '1px solid #D4A84B',
                  borderRadius: '8px',
                  color: '#D4A84B',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Plus size={14} /> Add Category
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {diamonds.map((d) => (
                <div
                  key={d.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: '#252525',
                    borderRadius: '8px',
                  }}
                >
                  <span style={{ color: '#FFFFFF', fontSize: '14px' }}>{d.name}</span>
                  <button
                    onClick={() => removeDiamond(d.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#555555',
                      display: 'flex',
                      padding: '4px',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                value={newDiamond}
                onChange={(e) => setNewDiamond(e.target.value)}
                placeholder="Diamond Name"
                style={{ ...inputStyle, flex: 1 }}
                onKeyDown={(e) => e.key === 'Enter' && addDiamond()}
              />
              <button
                onClick={addDiamond}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#D4A84B',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          {/* Clarity Grades */}
          <div
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '12px',
              border: '1px solid #2A2A2A',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600' }}>Clarity Grades</span>
              <button
                style={{
                  padding: '6px 14px',
                  backgroundColor: 'transparent',
                  border: '1px solid #D4A84B',
                  borderRadius: '8px',
                  color: '#D4A84B',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Plus size={14} /> Add Grade
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {clarityGrades.map((grade) => (
                <div
                  key={grade}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: '#252525',
                    border: '1px solid #2A2A2A',
                    borderRadius: '20px',
                  }}
                >
                  <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '600' }}>{grade}</span>
                  <button
                    onClick={() => removeClarity(grade)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#555555',
                      display: 'flex',
                      padding: '0',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                value={newClarity}
                onChange={(e) => setNewClarity(e.target.value)}
                placeholder="Clarity Grade (e.g. IF, FL)"
                style={{ ...inputStyle, flex: 1 }}
                onKeyDown={(e) => e.key === 'Enter' && addClarity()}
              />
              <button
                onClick={addClarity}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#D4A84B',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
