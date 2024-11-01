import { Slide } from "../../store/PresentationTypes";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css'
import { CSSProperties } from "react";
import { dispatch } from "../../store/editor";
import { setSelection } from "../../store/setSelection";

const Slide_Width = 935
const Slide_Height = 525

type SlideProps = {
    slide: Slide | null,
    scale?: number,
    isSelected: boolean,
    className: string,
    selectedObjectId: string | null,
}

function SlideO({slide, scale = 1, isSelected, className, selectedObjectId}: SlideProps)
{
    function onObjectClick(objectId: string): void {
        dispatch(setSelection, {
            selectedSlideId: slide?.id,
            selectedObjectId: objectId,
        })
    }

    if (slide == null) {
        return (<></>)
    }
    
    const slideStyles: CSSProperties = {
        backgroundColor: slide.background.type === 'solid' ? slide.background.color : 'transparent',
        backgroundImage: slide.background.type === 'image' ? `url(${slide.background.src})` : 'none',
        backgroundSize: 'cover',
        position: 'relative',
        width: `${Slide_Width * scale}px`,
        height: `${Slide_Height * scale}px`,

    }
    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }
    return (
        <div style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.elements.map(SlideElement => {
                switch (SlideElement.type) {
                    case "SlideText":
                        return <div key={SlideElement.id} onClick={() => onObjectClick(SlideElement.id)}>
                            <TextObject key={SlideElement.id} textObject={SlideElement} scale={scale} isSelected={SlideElement.id == selectedObjectId}></TextObject>
                        </div>
                    case "SlideImage":
                        return <div key={SlideElement.id} onClick={() => onObjectClick(SlideElement.id)}>
                            <ImageObject key={SlideElement.id} imageObject={SlideElement} scale={scale} isSelected={SlideElement.id == selectedObjectId}></ImageObject>
                        </div>
                    default:
                        throw new Error(`Unknown slide type`)
                }
            })}
        </div>
    )
}

export {
    SlideO,
}