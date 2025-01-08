import { Slide } from "../../store/PresentationTypes";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css'
import { CSSProperties, MouseEvent } from "react";
import { useDragAndDrop } from "../../store/hooks/useDragAndDrop";
import { useResizeElement } from "../../store/hooks/useResizeElement";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { SelectionType } from "../../store/editorType";
import { useAppActions } from "../../store/hooks/useAppActions";

const Slide_Width = 935;
const Slide_Height = 525;

type SlideProps = {
    slide: Slide | null,
    scale?: number,
    selection?: SelectionType,
    className: string,
    showResizeHandles?: boolean;
}

export function SlideO({slide, scale = 1, className, showResizeHandles = true}: SlideProps)
{
    const selection = useAppSelector((state) => state.selection)
    const { setSelection } = useAppActions();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        const elementId = target.getAttribute('data-element-id');
        const slideId = slide?.id ?? "";
        if (elementId) {
            setSelection({ selectedSlideId: slideId, selectedObjectId: elementId });
        } else {
            setSelection({ selectedSlideId: slideId, selectedObjectId: null });
        }
    }

    const { isDragging, handleElementMD, handleElementMM, handleElementMU} = useDragAndDrop({ slideId: slide?.id ?? ''});
    const { isResizing, handleResizeMD, handleResizeMM, handleResizeMU} = useResizeElement({ slideId: slide?.id ?? ''});

    if (slide == null) {
        return (<></>)
    }
    
    const slideStyles: CSSProperties = {
        backgroundColor: slide.background?.type === 'solid' ? slide.background.color : '#fff',
        backgroundImage: slide.background?.type === 'image' ? `url(${slide.background.src})` : 'none',
        backgroundSize: 'cover',
        position: 'relative',
        width: `${Slide_Width * scale}px`,
        height: `${Slide_Height * scale}px`,
        zIndex: 1,
    }

    const handleGlobalMM = (event: MouseEvent<HTMLDivElement>) => {
        if (isResizing) {
            handleResizeMM(event);
        } else if (isDragging) {
            handleElementMM(event);
        }
    };

    const handleGlobalMU = () => {
        handleElementMU();
        handleResizeMU();
    }

    const handleMouseLeave = () => {
        if (isDragging) {
            handleElementMU();
        }
        if (isResizing) {
            handleResizeMU();
        }
    }

    return (
        <div 
            style={slideStyles} 
            className={`${styles.slide} ${className}`}
            onClick={handleClick}
            onMouseMove={handleGlobalMM}
            onMouseUp={handleGlobalMU}
            onMouseLeave={handleMouseLeave}
        >
            {slide.elements.map(SlideElement => {
                const isSelectionElem = SlideElement.id === selection?.selectedObjectId;

                return (
                    <div 
                        key={SlideElement.id}
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelection({selectedSlideId: slide.id, selectedObjectId: SlideElement.id})
                        }}
                        onMouseDown={(event) => {
                            event.stopPropagation();
                            handleElementMD(event, SlideElement.id)
                        }}
                    >
                        {SlideElement.type === "SlideText" && (
                            <TextObject 
                            textObject={SlideElement}
                            scale={scale}
                            isSelected={isSelectionElem}
                            />
                        )}
                        {SlideElement.type === "SlideImage" && (
                            <ImageObject 
                            imageObject={SlideElement}
                            scale={scale}
                            selection={isSelectionElem}
                            />
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
        </div>
    );
}