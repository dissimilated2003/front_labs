import { EditorType } from "./editorType";
import { generateRandomId } from "./generateRandomId";
import { SlideText } from "./PresentationTypes";

export function addTextElement(text: EditorType): EditorType {
    if (!text.selection || !text.selection.selectedSlideId) {
        return text;
    }

    const newText: SlideText = {
        id: generateRandomId(6),
        pos: { ox: 300, oy: 300 },
        size: { width: 200, height: 40 },
        type: 'SlideText',
        value: "поставьте 4 ПЖ",
        fontSize: 20,
        fontFamily: 'Arial',
        fontColor: '#ffffff',
    }

    const updatedSlides = text.presentation.slides.map(slide => {
        if (slide.id === text.selection?.selectedSlideId) {
            return {
                ...slide, elements: [...slide.elements, newText],
            }
        }
        return slide;
    })

    return {
        ...text,
        presentation: {
            ...text.presentation,
            slides: updatedSlides,
        }
    }
}