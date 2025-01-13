import { EditorType } from "../editorType";
import { ActionType } from "./actions";

export function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

export function commitPresentation() {
    return {
        type: ActionType.COMMIT_PRESENTATION,
    }
}