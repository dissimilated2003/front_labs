import { Presentation, Slide } from "./PresentationTypes";

export function addSlide(presentation: Presentation, slide: Slide): Presentation 
{
    return {
        ...presentation,
        slides: [...presentation.slides, slide],
    };
}