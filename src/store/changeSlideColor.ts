import { EditorType } from "./editorType";
import { SolidBackground } from "./PresentationTypes";

export function changeSlideColor(editor: EditorType): EditorType
{
    const newBackground: SolidBackground = {
        type: 'solid',
        color: '#A20000',
    };

    if (!editor.selection || !editor.selection.selectedSlideId)
    {
        return editor;
    }

    const updateSlides = editor.presentation.slides.map(SlideO => {
        if (SlideO.id === editor.selection.selectedSlideId) {
            return {
                ...SlideO,
                background: newBackground,
            };
        }
        return SlideO;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updateSlides,
        }
    }
}