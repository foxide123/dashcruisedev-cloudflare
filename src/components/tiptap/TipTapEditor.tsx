"use client";

import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align"


interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}
export default function TiptapEditor({content, onChange}: TipTapEditorProps){
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3"
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3"
          }
        },
        paragraph: {
          HTMLAttributes: {
            style: "font-size: 20px;"
          }
        },
        heading: {
          levels: [1, 2, 3],
        }
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        // editor class
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      onChange(editor.getHTML());
    }
  });

  return (
    <div>
      <MenuBar editor={editor} />
      {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100, placement: 'top', offset: [0,10], arrow: true }}>
        <div className="bg-black text-white flex justify-around gap-2 px-4 py-2 rounded shadow border rounded-md">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </button>
        </div>
      </BubbleMenu>}
      <EditorContent editor={editor}/>
    </div>
  );
};
