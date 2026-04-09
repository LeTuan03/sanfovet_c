"use client";

import React, { useEffect, useRef, useState } from 'react';

interface CKEditorProps {
  value?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
}

export default function CKEditorWrapper({ value, onChange, placeholder }: CKEditorProps) {
  const editorRef = useRef<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    // Dynamic import inside useEffect to avoid SSR issues
    const loadEditor = async () => {
      try {
        editorRef.current = {
          CKEditor: (await import('@ckeditor/ckeditor5-react')).CKEditor,
          ClassicEditor: (await import('@ckeditor/ckeditor5-build-classic')).default,
        };
        setEditorLoaded(true);
      } catch (error) {
        console.error('Failed to load CKEditor:', error);
      }
    };
    
    loadEditor();
  }, []);

  if (!editorLoaded) {
    return (
      <div className="w-full h-[300px] bg-gray-50 rounded-2xl flex items-center justify-center border border-dashed border-gray-200 animate-pulse">
        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Đang tải trình soạn thảo...</span>
      </div>
    );
  }

  return (
    <div className="ck-editor-container premium-editor">
      <CKEditor
        editor={ClassicEditor}
        data={value || ''}
        config={{
          placeholder: placeholder || 'Nhập nội dung...',
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo'
            ]
          },
          language: 'vi',
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          if (onChange) {
            onChange(data);
          }
        }}
      />
      <style jsx global>{`
        .premium-editor .ck-editor__main > .ck-editor__editable {
          min-height: 300px;
          border-bottom-left-radius: 1rem !important;
          border-bottom-right-radius: 1rem !important;
          border-color: #f3f4f6 !important;
          padding: 1.5rem !important;
          font-family: inherit;
          font-size: 0.95rem;
          color: #1a1a1a;
          line-height: 1.6;
        }
        .premium-editor .ck-toolbar {
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
          border-color: #f3f4f6 !important;
          background: #fdfdfd !important;
          padding: 0.5rem !important;
        }
        .premium-editor .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
          border-color: #2e7d32 !important; /* sanfovet primary color maybe? */
          box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.05) !important;
        }
        .premium-editor .ck-content h2 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111;
        }
        .premium-editor .ck-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #333;
        }
        .premium-editor .ck-content p {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
