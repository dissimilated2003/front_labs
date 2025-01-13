import { SlideText } from "../../store/PresentationTypes";
import { CSSProperties } from "react";
import { useState } from "react";
import { useAppActions } from "../../store/hooks/useAppActions";

type TextObjectProps = {
    textObject: SlideText,
    scale?: number,
    isSelected: boolean,
}

function TextObject({textObject, scale = 1, isSelected}: TextObjectProps) {
    const {  changeTextContentReal, commitPresentation } = useAppActions();
    const [isEditing, setIsEditing] = useState(false);

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.pos.oy * scale}px`,
        left: `${textObject.pos.ox * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        zIndex: 3,
        margin: 0,
        border: isSelected ? '3px solid #0b57d0' : 'none',
        fontFamily: 'Arial',
    }

    const handleDoubleClick = () => { setIsEditing(true); };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeTextContentReal(textObject.id, e.target.value);
    };
    const handleBlur = () => { 
        setIsEditing(false);
        commitPresentation();
    };

    return (
        <>
            {isEditing ? (
                <input type="text"
                    value={textObject.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    style={{
                        ...textObjectStyles, 
                        fontSize: `${textObject.fontSize * scale}px`,
                        backgroundColor: 'transparent',
                        outline: 'none',
                    }}
                    />
            ) : (
                <p onDoubleClick={handleDoubleClick} style={textObjectStyles}>
                    {textObject.value}
                </p>
                )}
            </>
        );
}

export {
    TextObject,
}