"use client";

import React, { useEffect, useRef, useState } from 'react';

interface CKEditorProps {
  value?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
}

declare global {
  interface Window {
    CKEditor: any;
  }
}

export default function CKEditorWrapper({ value, onChange, placeholder }: CKEditorProps) {
  const editorRef = useRef<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    // Dynamic import inside useEffect to avoid SSR issues
    const loadEditor = async () => {
      try {
        // Load CKEditor 5 Superbuild from CDN for maximum features and stability
        if (!window.CKEditor) {
          const script = document.createElement('script');
          script.src = 'https://cdn.ckeditor.com/ckeditor5/41.4.2/super-build/ckeditor.js';
          script.async = true;
          await new Promise((resolve) => {
            script.onload = resolve;
            document.head.appendChild(script);
          });
        }
        
        const { CKEditor: CKEditorComponent } = await import('@ckeditor/ckeditor5-react');
        
        editorRef.current = {
          CKEditor: CKEditorComponent,
          ClassicEditor: window.CKEditor.ClassicEditor,
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

  // Custom Upload Adapter for Base64 images
  class MyUploadAdapter {
    loader: any;

    constructor(loader: any) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(
        (file: any) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                default: reader.result,
              });
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(file);
          })
      );
    }

    abort() {}
  }

  function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new MyUploadAdapter(loader);
    };
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
              'alignment',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'outdent',
              'indent',
              '|',
              'imageUpload',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo'
            ]
          },
          alignment: {
            options: ['left', 'center', 'right', 'justify']
          },
          extraPlugins: [MyCustomUploadAdapterPlugin],
          language: 'vi',
        }}
        onReady={(editor: any) => {
          // Tab key support
          editor.editing.view.document.on('keydown', (evt: any, data: any) => {
            if (data.keyCode === 9) { // Tab key
              if (data.shiftKey) {
                if (editor.commands.get('outdent')?.isEnabled) {
                  editor.execute('outdent');
                }
              } else {
                if (editor.commands.get('indent')?.isEnabled) {
                  editor.execute('indent');
                } else {
                  // Fallback: insert spaces if indent command is not available
                  editor.execute('input', { text: '    ' });
                }
              }
              data.preventDefault();
              evt.stop();
            }
          });
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
        }
      `}</style>
    </div>
  );
}
