import { EditorType } from "./editorType";
import { ImageBackground } from "./PresentationTypes";

export function changeSlideBgrImage(editor: EditorType): EditorType
{
    const newBackground: ImageBackground = {
        type: 'image',
        src: './src/store/Serenity.png'
    };

    if (!editor.selection || !editor.selection.selectedSlideId)
    {
        return editor;
    }

    const updatedSlides = editor.presentation.slides.map(SlideO => {
        if (SlideO.id === editor.selection.selectedSlideId)
        {
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
            slides: updatedSlides,
        }
    };
}