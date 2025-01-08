import { EditorType } from "./editorType";
import { SlideImage } from "./PresentationTypes";
import { generateRandomId } from "./generateRandomId";

export function addImageToSlide(image: EditorType, src: string): EditorType {
    if (!image.selection || !image.selection.selectedSlideId) {
        return image;
    }
    
    const newImage: SlideImage = {
        id: generateRandomId(6),
        pos: { ox: 300, oy: 100 },
        size: { width: 300, height: 225 },
        type: 'SlideImage',
        src: src,
    }

    const updatedSlides = image.presentation.slides.map(slide => {
        if (slide.id === image.selection?.selectedSlideId) {
            return {
                ...slide, elements: [...slide.elements, newImage],
            };
        }
        return slide;
    })

    return {
        ...image,
        presentation: {
            ...image.presentation,
            slides: updatedSlides,
        }
    }
}