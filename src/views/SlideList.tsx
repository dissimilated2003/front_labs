import { SlideO } from "./Slide/Slide";
import styles from './SlideList.module.css'
import { useAppActions } from "../store/hooks/useAppActions";
import { useSlideTransition } from "../store/hooks/useSlideTransition";
import { useAppSelector } from "../store/hooks/useAppSelector";
import '../views/Slide/Slide.module.css'

const Slide_Preview_Scale = 0.2

export function SlidesList() {
    function getSlideWrapClassname(slideId: string, selectedSlideId: string | undefined | null): string {
        let className = styles.slideWrapper;
        if (slideId === selectedSlideId) {
            className = `${className} ${styles.selectedSlide}`
        }
        return className
    }

    const editor = useAppSelector((state) => state)
    const slides = editor.presentation.slides
    const selection = editor.selection
    const { setSelection } = useAppActions();

    const onSlideClick = (slideId: string) => {
        setSelection({selectedSlideId: slideId, selectedObjectId: null})
    }

    const {
        draggingSlide,
        dragOverSlide,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    } = useSlideTransition();

    return (
        <div className={styles.slideList}>
            {slides.map((slide, index) => 
                <div 
                    key={slide.id}
                    draggable
                    onDragStart={() => handleDragStart(slide.id)}
                    onDragOver={(e) => handleDragOver(e, slide.id)}
                    onDragEnd={handleDragEnd} 
                    onClick={() => onSlideClick(slide.id)}
                    className={`${styles.slideWrapper} ${draggingSlide === slide.id ? styles.dragging : ''} ${dragOverSlide === slide.id ? styles.dragOver : ''} ${getSlideWrapClassname(slide.id, selection?.selectedSlideId)}`}
                >
                    <div className={styles.slideNumber}>{index + 1}</div>

                    <div className={styles.slideContent}>
                        <SlideO
                            slide={slide}
                            scale={Slide_Preview_Scale}
                            className={styles.item}
                            showResizeHandles={false}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}