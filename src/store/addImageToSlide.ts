import { EditorType } from "./editorType";
import { SlideImage } from "./PresentationTypes";

export function addImageToSlide(editor: EditorType): EditorType
{
    const image = 'Serenity.png';
    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const newImage: SlideImage = {
        id: generateRandomId(6),
        pos: {ox: 400, oy: 300},
        size: {width: 200, height: 150},
        type: 'SlideImage',
        src: image,
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

function generateRandomId(length: number = 10): string
{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++)
    {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex]
    }

    return result;
}