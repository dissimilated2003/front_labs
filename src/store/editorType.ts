import { Presentation } from "./PresentationTypes.ts";

export type SelectionType = {
    selectedSlideId: string,
}

export type EditorType = {
    presentation: Presentation,
    selection: SelectionType | null,
}