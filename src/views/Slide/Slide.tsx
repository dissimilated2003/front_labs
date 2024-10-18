import { Slide } from "../../store/PresentationTypes";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css'
import { CSSProperties } from "react";

const Slide_Width = 935
const Slide_Height = 525

type SlideProps = {
    slide: Slide,
    scale?: number,
    isSelected: boolean,
    className: string,
}

function SlideO({slide, scale = 1, isSelected, className}: SlideProps)
{
    const slideStyles: CSSProperties = {
        backgroundColor: slide.background,
        width: `${Slide_Width * scale}px`,
        height: `${Slide_Height * scale}px`,
    }
    if (isSelected) {
        slideStyles.border = '3 px solid #0b57d0'
    }
    return (
        <div style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.elements.map(SlideElement => {
                switch (SlideElement.type) {
                    case "SlideText":
                        return <TextObject key={SlideElement.id} textObject={SlideElement} scale={scale}></TextObject>
                    case "SlideImage":
                        return <ImageObject key={SlideElement.id} imageObject={SlideElement} scale={scale}></ImageObject>
                    default:
                        throw new Error(`Unknown slide type`)
                }
            })}
        </div>
    )
}

export {
    SlideO
}