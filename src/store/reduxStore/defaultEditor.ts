import { EditorType } from "../editorType";
import { createSlide } from "./createSlide";

const slide = createSlide();
export const defaultEditor: EditorType = {
    presentation: {
        title: 'ыъльовалеьоыъ',
        slides: [
            slide,
        ],
    },
    selection: {
        selectedSlideId: slide.id,
        selectedObjectId: null,
    }
}