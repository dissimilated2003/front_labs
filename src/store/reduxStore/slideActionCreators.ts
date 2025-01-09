import { EditorType } from "../editorType";
import { ActionType } from "./actions";

function addSlide() {
    return {
        type: ActionType.ADD_SLIDE,
    }
}

function removeSlide() {
    return {
        type: ActionType.REMOVE_SLIDE,
    }
}

function addTextElement() {
    return {
        type: ActionType.ADD_TEXT_ELEMENT,
    }
}

function changeTextContent(id: string, newText: string) {
    console.log('dddd');
    return {
        type: ActionType.CHANGE_TEXT_CONTENT,
        id,
        newText,
    }
}

function addImageToSlide(payload: string) {
    return {
        type: ActionType.ADD_IMAGE,
        payload,
    }
}

function removeElementFromSlide() {
    return {
        type: ActionType.REMOVE_ELEMENT,
    }
}

function changeSlideColor(payload: { type: 'solid', color: string }) {
    return {
        type: ActionType.CHANGE_SLIDE_COLOR,
        payload,
    }
}

function changeSlideBgrImage(payload: { type: 'image', src: string}) {
    return {
        type: ActionType.CHANGE_SLIDE_BGR_IMAGE,
        payload,
    }
}

const moveSlideOnList = (editor: EditorType, slideId: string, targetSlideId: string) => ({
    type: ActionType.MOVE_SLIDE_ON_LIST,
    payload: {
        editor,
        slideId,
        targetSlideId,
    },
});

const moveSlideElement = (slideId: string, elementId: string, newX: number, newY: number) => ({
    type: ActionType.MOVE_SLIDE_ELEMENT,
    payload: {
        slideId,
        elementId,
        x: newX,
        y: newY,
    },
});

const resizeSlideElement = (
    slideId: string,
    elementId: string,
    newWidth: number,
    newHeight: number,
    newX: number,
    newY: number
) => ({
    type: ActionType.RESIZE_SLIDE_ELEMENT,
    payload: {
        slideId,
        elementId,
        width: newWidth,
        height: newHeight,
        x: newX,
        y: newY,
    },
});

function savePresentation(editor: EditorType) {
    return {
        type: ActionType.SAVE_PRESENTATION,
        payload: editor
    }
}

function loadPresentation(editor: EditorType) {
    return {
        type: ActionType.LOAD_PRESENTATION,
        payload: editor
    }
}

export {
    addSlide, 
    removeSlide,
    addTextElement as changeTextContent,
    changeTextContent as changeTextContentReal,
    addImageToSlide,
    removeElementFromSlide,
    changeSlideColor,
    changeSlideBgrImage,
    moveSlideOnList,
    moveSlideElement,
    resizeSlideElement,
    savePresentation,
    loadPresentation,
}