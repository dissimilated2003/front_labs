import { SlideImage } from "../../store/PresentationTypes";
import { CSSProperties } from "react";

type SlideImageProps = {
    imageObject: SlideImage,
    scale?: number, 
    selection: boolean,
}

export function ImageObject({imageObject, scale = 1, selection}: SlideImageProps) {
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.pos.oy * scale}px`,
        left: `${imageObject.pos.ox * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
        zIndex: 3,
        border: selection ? '3px solid #0b57d0' : 'none',
    }

    return ( 
        <img style={imageObjectStyles} src={`${imageObject.src}`}/>
    )
}