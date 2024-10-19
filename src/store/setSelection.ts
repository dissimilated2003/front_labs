import {EditorType, SelectionType} from "./editorType.ts";

function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
    return {
        ...editor,
        selection: newSelection,
    }
}

export {
    setSelection,
}