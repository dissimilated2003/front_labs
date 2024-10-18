import { Presentation } from "./PresentationTypes";

export function removeSlide(presentation: Presentation, slideId: string): Presentation 
{
    return {
        ...presentation,
        slides: presentation.slides.filter(slide => slide.id !== slideId),
    };
}