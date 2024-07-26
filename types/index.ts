
export interface NoteItem {
  title: string;
  content: string;
  updateTime: string;
};

export type Notes = Record<string, string>;

export type INoteEditorState = {
  message?: string;
} | void;