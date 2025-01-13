import { EditorType, SelectionType } from "../editorType";

export enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    SET_SELECTION = 'setSelection',
    SET_EDITOR = 'setEditor',
    ADD_TEXT_ELEMENT = 'addTextElement',
    CHANGE_TEXT_CONTENT = 'changeTextContent',
    ADD_IMAGE = 'addImage',
    REMOVE_ELEMENT = 'removeElement',
    CHANGE_SLIDE_COLOR = 'changeSlideColor',
    CHANGE_SLIDE_BGR_IMAGE = 'changeSlideBgrImage',
    MOVE_SLIDE_ON_LIST = 'moveSlideOnList',
    MOVE_SLIDE_ELEMENT = 'moveSlideElement',
    RESIZE_SLIDE_ELEMENT = 'resizeSlideElement',
    SAVE_PRESENTATION = 'savePresentation',
    LOAD_PRESENTATION = 'loadPresentation',
    EXPORT_PRESENTATION = 'exportPresentation',
    IMPORT_PRESENTATION = 'importPresentation',
    COMMIT_PRESENTATION = 'commitPresentation'
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE,
}

export type SetSelectionAction = {
    type: ActionType.SET_SELECTION,
    payload: SelectionType,
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType,
}

type AddTextElementAction = {
    type: ActionType.ADD_TEXT_ELEMENT,
}

type ChangeTextContentAction = {
    type: ActionType.CHANGE_TEXT_CONTENT,
    id: string,
    newText: string,
}

type AddImageAction = {
    type: ActionType.ADD_IMAGE,
    payload: string,
}

type RemoveElementAction = {
    type: ActionType.REMOVE_ELEMENT,
}

type ChangeSlideColorAction = {
    type: ActionType.CHANGE_SLIDE_COLOR,
    payload: { 
        type: 'solid', 
        color: string,
    },
}

type ChangeSlideBgrImageAction = {
    type: ActionType.CHANGE_SLIDE_BGR_IMAGE,
    payload: { 
        type: 'image',
        src: string,
    },
}

type SavePresentationAction = {
    type: ActionType.SAVE_PRESENTATION,
    payload: EditorType,
}

type LoadPresentationAction = {
    type: ActionType.LOAD_PRESENTATION,
    payload: EditorType,
}

type MoveSlideAction = {
    type: ActionType.MOVE_SLIDE_ON_LIST;
    payload: {
        editor: EditorType;
        slideId: string;
        targetSlideId: string;
    };
} 

type MoveElementAction = {
    type: ActionType.MOVE_SLIDE_ELEMENT;
    payload: {
        slideId: string;
        elementId: string;
        x: number;
        y: number;
    };
}

type ResizeElementAction = {
    type: ActionType.RESIZE_SLIDE_ELEMENT;
    payload: {
        slideId: string;
        elementId: string;
        width: number;
        height: number;
        x: number;
        y: number;
      };
}

type ExportPresentationAction = {
    type: ActionType.EXPORT_PRESENTATION
}

type ImportPresentationAction = {
    type: ActionType.IMPORT_PRESENTATION,
    payload: EditorType
}

type CommitPresentationAction = {
    type: ActionType.COMMIT_PRESENTATION,
}

export type EditorAction = AddSlideAction | RemoveSlideAction | SetSelectionAction | SetEditorAction
            | AddTextElementAction | AddImageAction | RemoveElementAction | ChangeSlideColorAction
            | ChangeSlideBgrImageAction | SavePresentationAction | LoadPresentationAction
            | MoveSlideAction | MoveElementAction | ResizeElementAction | ChangeTextContentAction
            | ExportPresentationAction | ImportPresentationAction | CommitPresentationAction