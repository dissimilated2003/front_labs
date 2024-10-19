import { SlideImage } from "../../store/PresentationTypes";
import { CSSProperties } from "react";

type SlideImageProps = {
    imageObject: SlideImage,
    scale?: number, //увеличение
}

function ImageObject({imageObject, scale = 1}: SlideImageProps)
{
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.pos.oy * scale}px`,
        left: `${imageObject.pos.ox * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
    }
    return ( 
        <img style={imageObjectStyles} src={`${imageObject.src}`}/>
    )
}

export {
    ImageObject,
}