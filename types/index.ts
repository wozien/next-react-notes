
export interface NoteItem {
  title: string;
  content: string;
  updateTime: Date;
};

export type Notes = Record<string, string>;

export type INoteEditorState = {
  message?: string;
  errors?: {
    message: string;
  }[];
} | void;