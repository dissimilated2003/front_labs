import { Slide, Background } from "./PresentationTypes";

export function changeSlideBackground(slide: Slide, newBackground: Background): Slide 
{
    return {
        ...slide,
        background: newBackground,
    };
}