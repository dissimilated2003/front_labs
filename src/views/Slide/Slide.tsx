import { Slide } from "../../store/PresentationTypes";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css'
import { CSSProperties } from "react";
import { dispatch } from "../../store/editor";
import { setSelection } from "../../store/setSelection";
import { useDragAndDrop } from "./useDragAndDrop";
import { useResizeElement } from "./useResizeElement";

const Slide_Width = 935;
const Slide_Height = 525;

type SlideProps = {
    slide: Slide | null,
    scale?: number,
    isSelected: boolean,
    className: string,
    selectedObjectId: string | null,
    showResizeHandles?: boolean;
}

export function SlideO({slide, scale = 1, isSelected, className, selectedObjectId, showResizeHandles = true}: SlideProps)
{
    const { isDragging, handleElementMD, handleElementMM, handleElementMU} = useDragAndDrop({ slideId: slide?.id ?? ''});
    const { isResizing, handleResizeMD, handleResizeMM, handleResizeMU} = useResizeElement({ slideId: slide?.id ?? ''});

    function onObjectClick(objectId: string): void {
        dispatch(setSelection, {
            selectedSlideId: slide?.id,
            selectedObjectId: objectId,
        })
    }

    const handleSlideClick = () => {
        if (selectedObjectId) {
            dispatch(setSelection, {
                selectedSlideId: slide?.id,
                selectedObjectId: null,
            });
        }
    };

    if (slide == null) {
        return (<></>)
    }
    
    const slideStyles: CSSProperties = {
        backgroundColor: slide.background?.type === 'solid' ? slide.background.color : 'transparent',
        backgroundImage: slide.background?.type === 'image' ? `url(${slide.background.src})` : 'none',
        backgroundSize: 'cover',
        position: 'relative',
        width: `${Slide_Width * scale}px`,
        height: `${Slide_Height * scale}px`,
        zIndex: 1,
    }

    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }

    return (
        <div style={slideStyles} 
        className={`${styles.slide} ${className}`}
        onMouseMove={(event) => {
            if (isResizing) {
                handleResizeMM(event);
            } else {
                handleElementMM(event);
            }
        }}
        onMouseUp={() => {
            handleElementMU();
            handleResizeMU();
        }}
        onMouseLeave={handleResizeMU}
        onClick={handleSlideClick}>
            {slide.elements.map(SlideElement => {
                const isSelectionElem = SlideElement.id === selectedObjectId;

                return (
                    <div key={SlideElement.id}
                    onClick={(e) => { e.stopPropagation(); onObjectClick(SlideElement.id); }}
                    onMouseDown={(event) => handleElementMD(event, SlideElement.id)}
                    style={{position: 'relative'}}>
                        {SlideElement.type === "SlideText" && (
                            <TextObject textObject={SlideElement}
                            scale={scale}
                            isSelected={isSelectionElem}/>
                        )}
                        {SlideElement.type === "SlideImage" && (
                            <ImageObject imageObject={SlideElement}
                            scale={scale}
                            isSelected={isSelectionElem}/>
                        )}
                        {isSelectionElem && showResizeHandles && (
                            <>
                                <div className={`${styles.resizeHandle} ${styles.topLeft}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'top-left')}
                                style={{position: 'absolute', top: SlideElement.pos.oy - 5, left: SlideElement.pos.ox - 5}}/>

                                <div className={`${styles.resizeHandle} ${styles.topRight}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'top-right')}
                                style={{position: 'absolute', top: SlideElement.pos.oy - 5, left: SlideElement.pos.ox + SlideElement.size.width - 3}}/>

                                <div className={`${styles.resizeHandle} ${styles.bottomLeft}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'bottom-left')}
                                style={{position: 'absolute', top: SlideElement.pos.oy + SlideElement.size.height - 3, left: SlideElement.pos.ox - 6}}/>

                                <div className={`${styles.resizeHandle} ${styles.bottomRight}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'bottom-right')}
                                style={{position: 'absolute', top: SlideElement.pos.oy + SlideElement.size.height - 3, left: SlideElement.pos.ox + SlideElement.size.width - 3}}/>

                                <div className={`${styles.resizeHandle} ${styles.middleLeft}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'middle-left')}
                                style={{position: 'absolute', top: SlideElement.pos.oy + SlideElement.size.height / 2, left: SlideElement.pos.ox - 6}}/>

                                <div className={`${styles.resizeHandle} ${styles.middleRight}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'middle-right')}
                                style={{position: 'absolute', top: SlideElement.pos.oy + SlideElement.size.height / 2, left: SlideElement.pos.ox + SlideElement.size.width - 3}}/>

                                <div className={`${styles.resizeHandle} ${styles.middleTop}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'middle-top')}
                                style={{position: 'absolute', top: SlideElement.pos.oy - 5, left: SlideElement.pos.ox + SlideElement.size.width / 2}}/>

                                <div className={`${styles.resizeHandle} ${styles.middleBottom}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'middle-bottom')}
                                style={{position: 'absolute', top: SlideElement.pos.oy + SlideElement.size.height - 3, left: SlideElement.pos.ox + SlideElement.size.width / 2}}/>
                            </>
                        )}
                    </div>
                );
            })}
            {isDragging && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }}/>
            )}
            {isResizing && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)'
                }}/>
            )}
        </div>
    );
}