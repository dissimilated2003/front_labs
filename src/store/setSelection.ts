import { EditorType } from "./editorType.ts";
import { SetSelectionAction } from "./reduxStore/actions.ts";

export function setSelection(editor: EditorType, action: SetSelectionAction): EditorType {
    return {
        ...editor,
        selection: action.payload,
    }
}