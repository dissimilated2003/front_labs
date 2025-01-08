import { Store } from "redux";
import { EditorType } from "../editorType";

export type HistoryType = {
    undo: () => EditorType | undefined,
    redo: () => EditorType | undefined,
}

function getLastItem(stack: Array<EditorType>): EditorType {
    return stack[stack.length - 1]
}

export function initHistory(store: Store<EditorType>): HistoryType {
    const undoStack: Array<EditorType> = []
    let redoStack: Array<EditorType> = []
    let prevEditor = store.getState()

    store.subscribe(() => {
        const editor = store.getState()
        if (!undoStack.length || prevEditor.presentation != editor.presentation) {
            if (editor == getLastItem(undoStack)) {
                undoStack.pop()
                redoStack.push(prevEditor)
            } else if (editor == getLastItem(redoStack)) {
                redoStack.pop()
                undoStack.push(prevEditor)
            } else {
                undoStack.push(prevEditor)
                redoStack = []
            }
        }
        prevEditor = editor
    })

    function undo() {
        return getLastItem(undoStack)
    }
    
    function redo() {
        return getLastItem(redoStack)
    }

    return {
        undo,
        redo,
    }
}