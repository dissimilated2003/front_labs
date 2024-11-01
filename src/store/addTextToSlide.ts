import { EditorType } from "./editorType";
import { SlideText } from "./PresentationTypes";

export function addTextToSlide(editor: EditorType): EditorType 
{
    const newText = "Введите текст";
    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const newTextObject: SlideText = {
        id: generateRandomId(6),
        pos: {ox: 300, oy: 400},
        size: {width: 200, height: 30},
        type: 'SlideText',
        value: newText,
        fontFamily: 'Arial',
        fontSize: 16,
        fontColor: '#000000',
    }

    const updatedSlides = editor.presentation.slides.map(SlideO => {
        if (SlideO.id === editor.selection.selectedSlideId) {
            return {
                ...SlideO,
                elements: [...SlideO.elements, newTextObject],
            };
        }
        return SlideO;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        }
    };
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