import { useState, useRef } from "react";
import { useAppActions } from "./useAppActions";
import { useAppSelector } from "./useAppSelector";

type UseDragAndDropProps = {
    slideId: string;
}

export function useDragAndDrop({slideId}: UseDragAndDropProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElemId, setDraggedElemId] = useState<string | null>(null);
    const dragStartPos = useRef({x: 0, y: 0});

    const { moveSlideElement } = useAppActions();
    const editor = useAppSelector((state) => state)
    const elementRef = useRef<{ x: number, y: number } | null>(null);

    function handleElementMD(event: React.MouseEvent<HTMLDivElement>, elementId: string): void {
        event.preventDefault();
        setIsDragging(true);
        setDraggedElemId(elementId);
        dragStartPos.current = { x: event.clientX, y: event.clientY};

        const slide = editor.presentation.slides.find((s) => s.id === slideId);
        const element = slide?.elements.find((e) => e.id === elementId);
        if (element) {
            elementRef.current = { x: element.pos.ox, y: element.pos.oy };
        }
    }

    function handleElementMM(event: React.MouseEvent): void {
        if (!isDragging || !draggedElemId) return;

        const dx = event.clientX - dragStartPos.current.x;
        const dy = event.clientY - dragStartPos.current.y;

        const slide = editor.presentation.slides.find((s) => s.id === slideId);
        if (!slide) return;
        const element = slide.elements.find((e) => e.id === draggedElemId);
        if (!element) return;

        const startX = elementRef.current ? elementRef.current.x : element.pos.ox;
        const startY = elementRef.current ? elementRef.current.y : element.pos.oy;
        const newX = Math.max(0, Math.min(startX + dx, 935 - element.size.width));
        const newY = Math.max(0, Math.min(startY + dy, 525 - element.size.height));

        moveSlideElement(slideId, draggedElemId, newX, newY)
    }

    function handleElementMU(): void {
        setIsDragging(false);
        setDraggedElemId(null);
        elementRef.current = null;
    }

    function handleMouseLeave() {
        if (isDragging) {
            handleElementMU();
        }
    }

    return {
        isDragging, 
        handleElementMD, 
        handleElementMM, 
        handleElementMU, 
        handleMouseLeave,
    }
}