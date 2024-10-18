import { Slide, SlideElement } from "./PresentationTypes";

export function addElementToSlide(slide: Slide, SlideElement: SlideElement): Slide 
{
    return {
        ...slide,
        elements: [...slide.elements, SlideElement],
    };
}