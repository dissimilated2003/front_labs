import { EditorType } from "./editorType";

export function changeSlidePosition(editor: EditorType, draggedSlideId: string, targetSlideId: string): EditorType {
    const { presentation, selection } = editor;
    const { slides } = presentation;

    const draggedIndex = slides.findIndex(SlideO => SlideO.id === draggedSlideId);
    const targetIndex = slides.findIndex(SlideO => SlideO.id === targetSlideId);

    if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
        return editor;
    }

    const newSlides = [...slides];
    const [draggedSlide] = newSlides.splice(draggedIndex, 1);
    newSlides.splice(targetIndex, 0, draggedSlide);

    return {
        presentation: {
            ...presentation,
            slides: newSlides,
        },
        selection: selection,
    };
}
