import { EditorType } from "./editorType";
import { SlideImage } from "./PresentationTypes";
import { generateRandomId } from "./generateRandomId";

export function addImageToSlide(editor: EditorType, imageSrc: string): EditorType
{
    
    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const newImage: SlideImage = {
        id: generateRandomId(6),
        pos: {ox: 400, oy: 300},
        size: {width: 200, height: 150},
        type: 'SlideImage',
        src: imageSrc,
    }

    const updatedSlides = editor.presentation.slides.map(SlideO => {
        if (SlideO.id === editor.selection.selectedSlideId) {
            return {
                ...SlideO,
                elements: [...SlideO.elements, newImage],
            };
        }
        return SlideO;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    }
}