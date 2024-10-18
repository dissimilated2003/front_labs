import { Slide } from "./PresentationTypes";

export function removeElementFromSlide(slide: Slide, elementId: string): Slide 
{
    return {
        ...slide,
        elements: slide.elements.filter(SlideElement => SlideElement.id !== elementId),
    };
}