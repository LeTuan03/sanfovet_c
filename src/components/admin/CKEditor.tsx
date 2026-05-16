"use client";

import React, { useEffect, useRef, useState } from 'react';
import { uploadFile } from '@/lib/storage-provider';


interface CKEditorProps {
  value?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
}

export default function CKEditorWrapper({ value, onChange, placeholder }: CKEditorProps) {
  const editorInstanceRef = useRef<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [CKEditorComponent, setCKEditorComponent] = useState<any>(null);
  const [EditorClass, setEditorClass] = useState<any>(null);
  const [plugins, setPlugins] = useState<any[]>([]);

  useEffect(() => {
    const loadEditor = async () => {
      try {
        // Import CKEditor React wrapper
        const reactModule = await import('@ckeditor/ckeditor5-react');

        // Import everything from ckeditor5
        const ck = await import('ckeditor5');

        // Import CSS
        await import('ckeditor5/ckeditor5.css');

        setCKEditorComponent(() => reactModule.CKEditor);
        setEditorClass(() => ck.ClassicEditor);
        setPlugins([
          // Essentials
          ck.Essentials,
          ck.Paragraph,

          // Text formatting
          ck.Bold,
          ck.Italic,
          ck.Underline,
          ck.Strikethrough,
          ck.Subscript,
          ck.Superscript,
          ck.Code,
          ck.RemoveFormat,

          // Font (Font is a meta-plugin including FontFamily, FontSize, FontColor, FontBackgroundColor)
          ck.Font,
          ck.Highlight,

          // Paragraph formatting
          ck.Alignment,
          ck.Indent,
          ck.IndentBlock,

          // Heading
          ck.Heading,

          // Lists
          ck.List,
          ck.ListProperties,
          ck.TodoList,

          // Links
          ck.Link,
          ck.LinkImage,
          ck.AutoLink,

          // Images
          ck.Image,
          ck.ImageCaption,
          ck.ImageResize,
          ck.ImageStyle,
          ck.ImageToolbar,
          ck.ImageUpload,
          ck.ImageInsert,

          // Table
          ck.Table,
          ck.TableToolbar,
          ck.TableProperties,
          ck.TableCellProperties,
          ck.TableCaption,
          ck.TableColumnResize,

          // Block
          ck.BlockQuote,
          ck.CodeBlock,
          ck.HorizontalLine,
          ck.PageBreak,

          // Media
          ck.MediaEmbed,

          // Special features
          ck.FindAndReplace,
          ck.SpecialCharacters,
          ck.SpecialCharactersEssentials,
          ck.HtmlEmbed,
          ck.SourceEditing,
          ck.GeneralHtmlSupport,
          ck.ShowBlocks,
          ck.SelectAll,

          // Clipboard & paste
          ck.PasteFromOffice,
          ck.TextTransformation,

          // Word count (optional)
          ck.WordCount,

          // Custom Upload Adapter Plugin
          function MyCustomUploadAdapterPlugin(editor: any) {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
              return {
                upload: () => {
                  return loader.file.then((file: File) => 
                    uploadFile(file, 'uploads').then(url => ({ default: url }))
                  );
                },
                abort: () => {}
              };
            };
          }
        ]);


        setEditorLoaded(true);
      } catch (error) {
        console.error('Failed to load CKEditor:', error);
      }
    };

    loadEditor();
  }, []);

  if (!editorLoaded || !CKEditorComponent || !EditorClass) {
    return (
      <div className="w-full h-[300px] bg-gray-50 rounded-2xl flex items-center justify-center border border-dashed border-gray-200 animate-pulse">
        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Đang tải trình soạn thảo...</span>
      </div>
    );
  }

  const CKE = CKEditorComponent;

  return (
    <div className="ck-editor-container premium-editor">
      <CKE
        editor={EditorClass}
        data={value || ''}
        config={{
          licenseKey: 'GPL',
          plugins: plugins,
          placeholder: placeholder || 'Nhập nội dung...',
          toolbar: {
            items: [
              'undo', 'redo',
              '|',
              'heading',
              '|',
              'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor',
              '|',
              'bold', 'italic', 'underline', 'strikethrough',
              'subscript', 'superscript',
              'code', 'removeFormat',
              '|',
              'highlight',
              '|',
              'link', 'insertImage', 'mediaEmbed',
              'insertTable', 'blockQuote', 'codeBlock',
              '|',
              'alignment',
              '|',
              'bulletedList', 'numberedList', 'todoList',
              'outdent', 'indent',
              '|',
              'horizontalLine', 'pageBreak',
              'specialCharacters', 'htmlEmbed',
              '|',
              'findAndReplace', 'selectAll',
              'showBlocks', 'sourceEditing',
            ],
            shouldNotGroupWhenFull: true,
          },
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
              { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
              { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
            ],
          },
          fontFamily: {
            options: [
              'default',
              'Arial, Helvetica, sans-serif',
              'Courier New, Courier, monospace',
              'Georgia, serif',
              'Lucida Sans Unicode, Lucida Grande, sans-serif',
              'Tahoma, Geneva, sans-serif',
              'Times New Roman, Times, serif',
              'Trebuchet MS, Helvetica, sans-serif',
              'Verdana, Geneva, sans-serif',
              'Roboto, sans-serif',
            ],
            supportAllValues: true,
          },
          fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22, 24, 26, 28, 36, 48, 72],
            supportAllValues: true,
          },
          fontColor: {
            columns: 10,
            documentColors: 20,
          },
          fontBackgroundColor: {
            columns: 10,
            documentColors: 20,
          },
          alignment: {
            options: ['left', 'center', 'right', 'justify'],
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              'toggleImageCaption',
              'imageStyle:inline',
              'imageStyle:wrapText',
              'imageStyle:breakText',
              'imageStyle:side',
              'resizeImage',
              'linkImage',
            ],
            resizeOptions: [
              { name: 'resizeImage:original', label: 'Original', value: null },
              { name: 'resizeImage:25', label: '25%', value: '25' },
              { name: 'resizeImage:50', label: '50%', value: '50' },
              { name: 'resizeImage:75', label: '75%', value: '75' },
            ],
          },
          table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'tableProperties',
              'tableCellProperties',
              'toggleTableCaption',
            ],
          },
          list: {
            properties: {
              styles: true,
              startIndex: true,
              reversed: true,
            },
          },
          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
              toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                  download: 'file',
                },
              },
              openInNewTab: {
                mode: 'manual',
                label: 'Open in a new tab',
                defaultValue: true,
                attributes: {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                },
              },
            },
          },
          highlight: {
            options: [
              { model: 'yellowMarker', class: 'marker-yellow', title: 'Yellow Marker', color: 'var(--ck-highlight-marker-yellow)', type: 'marker' },
              { model: 'greenMarker', class: 'marker-green', title: 'Green Marker', color: 'var(--ck-highlight-marker-green)', type: 'marker' },
              { model: 'pinkMarker', class: 'marker-pink', title: 'Pink Marker', color: 'var(--ck-highlight-marker-pink)', type: 'marker' },
              { model: 'blueMarker', class: 'marker-blue', title: 'Blue Marker', color: 'var(--ck-highlight-marker-blue)', type: 'marker' },
              { model: 'redPen', class: 'pen-red', title: 'Red Pen', color: 'var(--ck-highlight-pen-red)', type: 'pen' },
              { model: 'greenPen', class: 'pen-green', title: 'Green Pen', color: 'var(--ck-highlight-pen-green)', type: 'pen' },
            ],
          },
          codeBlock: {
            languages: [
              { language: 'plaintext', label: 'Plain text' },
              { language: 'javascript', label: 'JavaScript' },
              { language: 'typescript', label: 'TypeScript' },
              { language: 'python', label: 'Python' },
              { language: 'html', label: 'HTML' },
              { language: 'css', label: 'CSS' },
              { language: 'json', label: 'JSON' },
              { language: 'sql', label: 'SQL' },
              { language: 'xml', label: 'XML' },
            ],
          },
          mediaEmbed: {
            previewsInData: true,
          },
          htmlSupport: {
            allow: [
              {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true,
              },
            ],
          },
          wordCount: {
            onUpdate: (stats: any) => {
              // Optional: could emit stats
            },
          },
          language: 'vi',
        }}
        onReady={(editor: any) => {
          editorInstanceRef.current = editor;

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
        .premium-editor .ck.ck-editor {
          width: 100%;
        }
        .premium-editor .ck-editor__top .ck-sticky-panel .ck-toolbar {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .premium-editor .ck-editor__main > .ck-editor__editable:not(.ck-focused) {
          border-color: #e5e7eb;
        }
        .premium-editor .ck-content ol,
        .premium-editor .ck-content ul {
          padding-left: 20px;
          list-style-type: revert;
        }
      `}</style>
    </div>
  );
}
