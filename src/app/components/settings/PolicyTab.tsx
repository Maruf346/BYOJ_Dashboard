import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  Link,
  List,
  BlockQuote,
  Indent,
  Alignment,
  Table,
  HorizontalLine,
  Code,
  Undo,
  Font,
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
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', backgroundColor: 'transparent',
              border: '1px solid #2A2A2A', borderRadius: '8px',
              color: '#FFFFFF', cursor: 'pointer', fontSize: '14px',
            }}
          >
            <Edit2 size={16} /> Edit Content
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleSave}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 20px', backgroundColor: '#D4A84B',
                border: 'none', borderRadius: '8px', color: '#000000',
                cursor: 'pointer', fontSize: '14px', fontWeight: '700',
              }}
            >
              <Check size={16} /> Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', backgroundColor: 'transparent',
                border: '1px solid #2A2A2A', borderRadius: '8px',
                color: '#FFFFFF', cursor: 'pointer', fontSize: '14px',
              }}
            >
              <X size={16} /> Cancel
            </button>
          </div>
        )}
      </div>

      {/* Content area */}
      {isEditing ? (
        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #D4A84B' }}>
          <CKEditor
            editor={ClassicEditor}
            data={draftHtml}
            onChange={(_event, editor) => {
              setDraftHtml(editor.getData());
            }}
            config={{
              licenseKey: 'GPL',
              plugins: [
                Essentials,
                Paragraph,
                Bold,
                Italic,
                Underline,
                Strikethrough,
                Heading,
                Link,
                List,
                BlockQuote,
                Indent,
                Alignment,
                Table,
                HorizontalLine,
                Code,
                Undo,
                Font,
              ],
              toolbar: {
                items: [
                  'undo', 'redo', '|',
                  'heading', '|',
                  'bold', 'italic', 'underline', 'strikethrough', '|',
                  'link', 'bulletedList', 'numberedList', '|',
                  'alignment', 'indent', 'outdent', '|',
                  'blockQuote', 'insertTable', 'horizontalLine',
                ],
                shouldGroupWhenFull: false,
              },
              heading: {
                options: [
                  { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                  { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                  { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                  { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                ],
              },
            }}
          />
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
