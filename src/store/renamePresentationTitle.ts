import { EditorType } from "./editorType.ts";

export function renamePresentationTitle(editor: EditorType, newTitle: string): EditorType {
    return {
        ...editor,
        presentation:
        {
            ...editor.presentation,
            title: newTitle,
        }
    }
}