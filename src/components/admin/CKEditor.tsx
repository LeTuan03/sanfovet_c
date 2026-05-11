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

  // Custom Upload Adapter for Base64 images
  class MyUploadAdapter {
    loader: any;
    reader: any;

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
            reader.onabort = () => {
              reject();
            };
            reader.readAsDataURL(file);
          })
      );
    }

    abort() {
      if (this.reader) {
        this.reader.abort();
      }
    }
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
          licenseKey: 'GPL',
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
              'alignment',
              'outdent',
              'indent',
              '|',
              'imageUpload',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo'
            ],
            shouldNotGroupWhenFull: true,
          },
          alignment: {
            options: ['left', 'center', 'right', 'justify'],
          },
          extraPlugins: [MyCustomUploadAdapterPlugin],
          language: 'vi',
        }}
        onReady={(editor: any) => {
          // Handle Tab key
          editor.keystrokes.set('Tab', (data: any, stop: () => void) => {
            const indent = editor.commands.get('indent');
            
            if (indent && indent.isEnabled) {
              editor.execute('indent');
            } else {
              // Fallback: Insert 4 spaces if indent command is not available (e.g. not in a list)
              editor.model.change((writer: any) => {
                editor.model.insertContent(writer.createText('    '));
              });
            }
            
            // Prevent default browser behavior (moving focus)
            stop();
          });

          // Handle Shift+Tab key
          editor.keystrokes.set('Shift+Tab', (data: any, stop: () => void) => {
            const outdent = editor.commands.get('outdent');
            
            if (outdent && outdent.isEnabled) {
              editor.execute('outdent');
            }
            
            // Prevent default browser behavior
            stop();
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
