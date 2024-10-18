import { Slide } from "../store/PresentationTypes";
import { SlideO } from "./Slide/Slide";
import styles from './SlideList.module.css'
import { SelectionType } from "../store/editorType";
import { dispatch } from "../store/editor";
import { setSelection } from "../store/setSelection";

const Slide_Preview_Scale = 0.2

type SlideListProps = {
    slides: Array<Slide>,
    selection: SelectionType | null,
}

function SlidesList({slides, selection}: SlideListProps)
{
    function onSlideClick(slideId: string)
    {
        dispatch(setSelection, {selectedSlideId: slideId})
    }
    return (
        <div className={styles.slideList}>
            {slides.map(slide => 
                <div key={slide.id} onClick={() => onSlideClick(slide.id)}>
                    <SlideO
                        slide={slide}
                        scale={Slide_Preview_Scale}
                        isSelected={selection ? slide.id == selection.selectedSlideId : false}
                        className={styles.item}
                    ></SlideO>
                </div>
            )}
        </div>
    )
}

export {
    SlidesList,
}