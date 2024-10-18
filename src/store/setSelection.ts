import {EditorType, SelectionType} from "./editorType.ts";

export function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
    return {
        ...editor,
        selection: newSelection,
    }
}