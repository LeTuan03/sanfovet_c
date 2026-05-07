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
              'imageUpload',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo'
            ]
          },
          extraPlugins: [MyCustomUploadAdapterPlugin],
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
        }
      `}</style>
    </div>
  );
}
