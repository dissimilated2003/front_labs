import { EditorType } from "./editorType";
import { SolidBackground } from "./PresentationTypes";

export function changeSlideColor(bgrColor: EditorType, payload?: Object): EditorType {
    if (!bgrColor.selection || !bgrColor.selection.selectedSlideId) {
        return bgrColor;
    }

    const updateSlides = bgrColor.presentation.slides.map(slide => {
        if (slide.id === bgrColor.selection?.selectedSlideId) {
            return {
                ...slide,
                background: payload as SolidBackground,
            };
        }
        return slide;
    });

    return {
        ...bgrColor,
        presentation: {
            ...bgrColor.presentation,
            slides: updateSlides,
        }
    }
}