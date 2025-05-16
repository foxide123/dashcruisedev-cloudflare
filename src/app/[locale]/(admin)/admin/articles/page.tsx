"use client";

import ArticlesTab from "@/components/admin/ArticlesTab";
import TipTapEditor from "@/components/tiptap/TipTapEditor";
import { useState } from "react";

export default function ArticlesPage() {
  const [article, setArticle] = useState("");

  const onChange = (content: any) => {
    setArticle(content.target.value);
  };

  return (
    <div className="flex">
      <div className="w-3xl mx-auto py-8">
        <TipTapEditor content={article} onChange={onChange} />
      </div>
       <div className="w-[250px] h-full"></div>
    </div>
  );
}
