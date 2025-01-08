import { EditorType } from "./editorType";
import { generateRandomId } from "./generateRandomId";
import { Slide } from "./PresentationTypes";

export function addSlide(editor: EditorType): EditorType {
    const newSlide: Slide = {
        id: generateRandomId(6),
        elements: [],
        background: {
            type: 'solid',
            color: 'ffffff',
        }
    }

    const selSlideIndex = editor.presentation.slides.findIndex(slide => 
        slide.id == editor.selection?.selectedSlideId
    );

    return {
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides.slice(0, selSlideIndex + 1),
                newSlide,
                ...editor.presentation.slides.slice(selSlideIndex + 1)
            ],
        },
        selection: editor.selection,
    }
}