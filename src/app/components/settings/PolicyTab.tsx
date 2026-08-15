import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Italic,
  Underline,
  Essentials,
  Paragraph,
  Heading,
  List,
  Link,
  BlockQuote,
  Undo,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

interface PolicyTabProps {
  title: string;
  subtitle: string;
  initialHtml: string;
}

export function PolicyTab({ title, subtitle, initialHtml }: PolicyTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [savedHtml, setSavedHtml] = useState(initialHtml);
  const [draftHtml, setDraftHtml] = useState(initialHtml);

  const handleEdit = () => {
    setDraftHtml(savedHtml);
    setIsEditing(true);
  };

  const handleSave = () => {
    setSavedHtml(draftHtml);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftHtml(savedHtml);
    setIsEditing(false);
  };

  return (
    <div style={{ backgroundColor: '#1E1E1E', borderRadius: '12px', border: '1px solid #2A2A2A', padding: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>{title}</h2>
          <p style={{ color: '#888888', fontSize: '14px' }}>{subtitle}</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid #2A2A2A', borderRadius: '8px', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px' }}
          >
            <Edit2 size={16} /> Edit Content
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleSave}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', backgroundColor: '#D4A84B', border: 'none', borderRadius: '8px', color: '#000000', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}
            >
              <Check size={16} /> Save
            </button>
            <button
              onClick={handleCancel}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid #2A2A2A', borderRadius: '8px', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px' }}
            >
              <X size={16} /> Cancel
            </button>
          </div>
        )}
      </div>

      {/* Content area */}
      {isEditing ? (
        <div>
          <style>{`
            .policy-editor .ck.ck-editor__main .ck-editor__editable {
              min-height: 420px;
              background: #181818;
              color: #CCCCCC;
              border: 1px solid #2A2A2A !important;
              border-radius: 0 0 8px 8px !important;
            }
            .policy-editor .ck.ck-toolbar {
              background: #252525 !important;
              border: 1px solid #2A2A2A !important;
              border-radius: 8px 8px 0 0 !important;
            }
            .policy-editor .ck.ck-toolbar .ck-toolbar__items .ck-button {
              color: #CCCCCC !important;
            }
            .policy-editor .ck.ck-toolbar .ck-toolbar__items .ck-button:hover {
              background: #2A2A2A !important;
            }
            .policy-editor .ck.ck-toolbar .ck-toolbar__items .ck-button.ck-on {
              color: #D4A84B !important;
              background: rgba(212,168,75,0.1) !important;
            }
            .policy-editor .ck.ck-editor__editable:focus {
              box-shadow: none !important;
              border-color: #D4A84B !important;
            }
            .policy-editor .ck-editor__editable h2 {
              color: #FFFFFF;
            }
            .policy-editor .ck-editor__editable p {
              color: #CCCCCC;
            }
          `}</style>
          <div className="policy-editor">
            <CKEditor
              editor={ClassicEditor}
              config={{
                plugins: [Essentials, Paragraph, Bold, Italic, Underline, Heading, List, Link, BlockQuote, Undo],
                toolbar: {
                  items: ['heading', '|', 'bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList', '|', 'blockQuote', 'link', '|', 'undo', 'redo'],
                },
              }}
              data={draftHtml}
              onChange={(_event, editor) => {
                setDraftHtml(editor.getData());
              }}
            />
          </div>
        </div>
      ) : (
        <div
          style={{ color: '#CCCCCC', fontSize: '14px', lineHeight: '1.8' }}
          dangerouslySetInnerHTML={{ __html: savedHtml }}
        />
      )}
    </div>
  );
}
