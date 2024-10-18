import { Presentation } from "./PresentationTypes";

export function renamePresentationTitle(newTitle: string, presentation: Presentation): Presentation
{
    return {
        ...presentation,
        title: newTitle,
    };
}