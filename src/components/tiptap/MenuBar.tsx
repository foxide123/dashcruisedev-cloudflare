import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3, Highlighter, Italic, List, ListOrdered, Strikethrough, } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Options = [
    {
        icon: <Heading1 className="size-5" />,
        onClick: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
        pressed: editor.isActive("heading", {level: 1})
    },
    {
      icon: <Heading2 className="size-5" />,
      onClick: () => editor.chain().toggleHeading({ level: 2}).run(),
      pressed: editor.isActive("heading", {level:2})
    },
    {
      icon: <Heading3 className="size-5" />,
      onClick: () => editor.chain().toggleHeading({ level: 3}).run(),
      pressed: editor.isActive("heading", {level:3})
    },
    {
      icon: <Bold className="size-5" />,
      onClick: () => editor.chain().toggleBold().run(),
      pressed: editor.isActive("bold")
    },
    {
      icon: <Italic className="size-5" />,
      onClick: () => editor.chain().toggleItalic().run(),
      pressed: editor.isActive("italic")
    },
    {
      icon: <Strikethrough className="size-5" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike")
    },
    {
      icon: <AlignLeft className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left"})
    },
    {
      icon: <AlignCenter className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center"})
    },
    {
      icon: <AlignRight className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right"})
    },
    {
      icon: <List className="size-5" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList")
    },
    {
      icon: <ListOrdered className="size-5" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList")
    },
  /*   {
      icon: <Highlighter className="size-5" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight")
    }, */
  ]
  return (
  <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50 flex justify-center">
    {Options.map((option, index) => (
      <Toggle key={index} pressed={option.pressed} onPressedChange={option.onClick}
      className={option.pressed ? "bg-blue-100 border-2 border-blue-500" : ""}>
        {option.icon}
      </Toggle>
    ))}
  </div>
  );
}
