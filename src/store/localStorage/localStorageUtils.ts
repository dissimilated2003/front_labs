import { EditorType } from "../editorType";

export const saveToLocalStorage = (editor: EditorType) => {
    try {
        const serializedState = JSON.stringify(editor);
        localStorage.setItem('presentationEditor', serializedState);
    } catch (err) {
        console.error('Error saving to LS:', err);
    }
};

export const loadFromLocalStorage = (): EditorType | null => {
    try {
        const serializedState = localStorage.getItem('presentationEditor');
        if (serializedState === null) return null;
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading from LS:', err);
        return null;
    }
}