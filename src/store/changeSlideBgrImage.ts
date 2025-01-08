import { EditorType } from "./editorType";
import { Background } from "./PresentationTypes";

export function changeSlideBgrImage(bgr: EditorType, payload?: Background): EditorType {
    if (!bgr.selection || !bgr.selection.selectedSlideId) {
        return bgr;
    }

    const updatedSlides = bgr.presentation.slides.map(slide => {
        if (slide.id === bgr.selection?.selectedSlideId) {
            return {
                ...slide,
                background: payload,
            };
        }
        return slide;
    });

    return {
        ...bgr,
        presentation: {
            ...bgr.presentation,
            slides: updatedSlides,
        }
    };
}