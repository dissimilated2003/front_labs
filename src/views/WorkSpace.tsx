import { useAppSelector } from "../store/hooks/useAppSelector";
import { Slide } from "../store/PresentationTypes";
import { SlideO } from "./Slide/Slide";
import styles from './WorkSpace.module.css'

export function Workspace() {
    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selection
    const selectedSlide: Slide = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0]

    return (
        <div className={styles.workspace}>
            <SlideO slide={selectedSlide} className={styles.workspace}></SlideO>
        </div>
    )
}