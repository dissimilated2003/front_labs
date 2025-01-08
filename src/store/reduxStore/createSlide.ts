import { generateRandomId } from "../generateRandomId";
import { Slide } from "../PresentationTypes";

export function createSlide(): Slide {
    return {
        id: generateRandomId(6),
        elements: [],
        background: {type: 'solid', color: '#ffffff'},
    }
}