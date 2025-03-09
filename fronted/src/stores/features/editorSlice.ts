import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { editor } from 'monaco-editor';

interface EditorState {
  language: string;
  theme: string;
  fontSize: number;
  code: string;
  output: string;
  error: string;
  isRunning: boolean;
  //editor: editor.IStandaloneCodeEditor | null;
  isEditorReady: boolean;
}

const initialState: EditorState = {
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 16,
  code: '',
  output: '',
  error: '',
  isRunning: false,
  isEditorReady: false
  //editor: null
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setOutput: (state, action: PayloadAction<string>) => {
      state.output = action.payload;
      state.isRunning = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isRunning = false;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    // setEditor: (state, action: PayloadAction<editor.IStandaloneCodeEditor>) => {
    //   state.editor = action.payload;
    // }
    setEditorReady: (state, action: PayloadAction<boolean>) => {
      state.isEditorReady = action.payload;
    }
  }
});

export const {
  setLanguage,
  setTheme,
  setFontSize,
  setCode,
  setOutput,
  setError,
  setIsRunning,
  setEditorReady
} = editorSlice.actions;

export default editorSlice.reducer;