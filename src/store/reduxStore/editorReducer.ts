import { EditorType } from "../editorType";
import { addSlide } from "../addSlide";
import { setSelection } from "../setSelection";
import { ActionType, EditorAction } from "./actions";
import { removeSlide } from "../removeSlide";
import { removeElementFromSlide } from "../removeElementFromSlide";
import { changeSlideBgrImage } from "../changeSlideBgrImage";
import { changeSlideColor } from "../changeSlideColor";
import { addTextElement } from "../addTextContent";
import { addImageToSlide } from "../addImageToSlide";
import { changeSlidePosition } from "../moveSlideOnList";
import { moveSlideElement } from "../moveSlideElement";
import { resizeSlideElement } from "../resizeSildeElement";
import { saveToLocalStorage } from "../localStorage/localStorageUtils";
import { loadFromLocalStorage } from "../localStorage/localStorageUtils";
import { defEditor } from "../data";
import { changeTextContent } from "../changeTextContent";
import { exportPresentation } from "../localStorage/fileUtils";

export function editorReducer(editor: EditorType = defEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)
        case ActionType.SET_SELECTION:
            return setSelection(editor, action)
        case ActionType.SET_EDITOR:
            return action.payload
        case ActionType.ADD_TEXT_ELEMENT:
            return addTextElement(editor);
        case ActionType.CHANGE_TEXT_CONTENT:
            return changeTextContent(editor, action.id, action.newText);
        case ActionType.ADD_IMAGE:
            return addImageToSlide(editor, action.payload)
        case ActionType.REMOVE_ELEMENT:
            return removeElementFromSlide(editor)
        case ActionType.CHANGE_SLIDE_COLOR:
            return changeSlideColor(editor, action.payload)
        case ActionType.CHANGE_SLIDE_BGR_IMAGE:
            return changeSlideBgrImage(editor, action.payload)
        case ActionType.MOVE_SLIDE_ON_LIST:
            return changeSlidePosition(action.payload.editor, action.payload.slideId, action.payload.targetSlideId)
        case ActionType.RESIZE_SLIDE_ELEMENT:
            return resizeSlideElement(
                editor,
                action.payload.slideId,
                action.payload.elementId,
                action.payload.width,
                action.payload.height,
                action.payload.x,
                action.payload.y
            )
        case ActionType.MOVE_SLIDE_ELEMENT:
            return moveSlideElement(
                editor,
                action.payload.slideId,
                action.payload.elementId,
                action.payload.x,
                action.payload.y,
            )
        case ActionType.SAVE_PRESENTATION:
            saveToLocalStorage(action.payload);
            return action.payload;
        case ActionType.LOAD_PRESENTATION:
            return loadFromLocalStorage() ?? editor;
        case ActionType.EXPORT_PRESENTATION: 
            return exportPresentation(editor) ?? editor;
        case ActionType.IMPORT_PRESENTATION:
            return action.payload;
        default:
            return editor;
    }
}