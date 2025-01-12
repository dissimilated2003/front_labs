import { EditorType } from "../editorType";
import { saveToLocalStorage, loadFromLocalStorage } from "../localStorage/localStorageUtils";

export function savePresentation(editor: EditorType): EditorType {
    try {
        saveToLocalStorage(editor);
    } catch (err) {
        console.error('Error saving to LS: ', err);
    }
    return editor;
}

export function loadPresentation(importedEditor: EditorType): EditorType {
    try {
        const loadedEditor = loadFromLocalStorage();
        if (loadedEditor) {
            return loadedEditor;
        } else {
            return {} as EditorType
        }
    } catch (err) {
        console.error('Error loading from LS: ', err);
        return {} as EditorType;
    }
}