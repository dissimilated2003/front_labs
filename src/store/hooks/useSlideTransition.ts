import { useState } from "react";
import { useAppActions } from "./useAppActions";
import { useAppSelector } from "./useAppSelector";

export function useSlideTransition() {
    const [draggingSlide, setDraggingSlide] = useState<string | null>(null);
    const [dragOverSlide, setDragOverSlide] = useState<string | null>(null);

    const { moveSlideOnList } = useAppActions();
    const editor = useAppSelector((state) => state);
    
    function handleDragStart(slideId: string) {
        setDraggingSlide(slideId);
    }

    function handleDragOver(e: React.DragEvent, slideId: string) {
        e.preventDefault();
        if (slideId !== dragOverSlide) {
            setDragOverSlide(slideId);
        }
    }

    function handleDragEnd() {
        if (draggingSlide && dragOverSlide && draggingSlide !== dragOverSlide) {
            moveSlideOnList(editor, draggingSlide, dragOverSlide);
        }
        setDraggingSlide(null);
        setDragOverSlide(null);
    }

    return {
        draggingSlide, 
        dragOverSlide, 
        handleDragStart, 
        handleDragOver, 
        handleDragEnd,
    };
}