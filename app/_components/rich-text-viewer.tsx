"use client";

import { cn } from "@/lib/utils";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export type ShowRichTextProps = {
  data: any[];
  className?: string;
  userFacing?: boolean;
};

export function ShowRichText(props: ShowRichTextProps) {
  const editor = useCreateBlockNote({
    ...(!!props.data ? { initialContent: props.data } : {})
  });

  if (!props.data || !editor) return null;
  return <BlockNoteView theme="light" editor={editor} editable={false} className={cn(props.className)} />;
}
