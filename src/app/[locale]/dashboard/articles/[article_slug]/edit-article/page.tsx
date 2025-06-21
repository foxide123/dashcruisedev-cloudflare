"use client";

import TipTapEditor from "@/components/tiptap/TipTapEditor";
import { useState } from "react";

export default function EditArticlePage() {
  const [article, setArticle] = useState("");

  //eslint-disable-next-line
  const onChange = (content: any) => {
    setArticle(content.target.value);
  };

  return (
    <div className="flex justify-center border-2 border-green-500">
      <div className="w-3xl mx-auto py-8">
        <p className="text-center">Toggle: Markdown / Text</p>
        <TipTapEditor content={article} onChange={onChange} />
        <div className="mx-auto w-fit">
          Plus
        </div>
      </div>
      <div className="w-[250px] h-full border-2 border-green-500">

      </div>
    </div>
  );
}
