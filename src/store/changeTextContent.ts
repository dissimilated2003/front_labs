import { EditorType } from "./editorType";
import { SlideText } from "./PresentationTypes";

export function changeTextContent(editor: EditorType, id: string, newText: string): EditorType {
    for (let j = 0; j < editor.presentation.slides.length; j++) {
        const slide = editor.presentation.slides[j];
        for (let i = 0; i < slide.elements.length; i++) {
            const element = slide.elements[i];
            if (id === element.id) {
                const elements = [...slide.elements];
                const textElement = elements[i] as SlideText;
                elements[i] = {
                    ...textElement,
                    value: newText,
                }

                const slides = [...editor.presentation.slides];
                slides[j] = {
                    ...(slides[j]),
                    elements,
                };
                return {
                    ...editor,
                    presentation: {
                        ...editor.presentation,
                        slides,
                    }
                };
            }
        }
    }
    throw new Error('Prikol');
}