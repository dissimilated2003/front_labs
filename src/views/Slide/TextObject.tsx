import { SlideText } from "../../store/PresentationTypes";
import { CSSProperties, useRef } from "react";
import { useDragAndDrop } from "./useDragAndDrop";
import { changeTextContent } from "../../store/changeTextContent";
import { useState } from "react";

type TextObjectProps = {
    textObject: SlideText,
    scale?: number,
    isSelected: boolean,
}

function TextObject({textObject, scale = 1, isSelected}: TextObjectProps)
{
    const [isEditing, setIsEditing] = useState(false);
    const [textValue, setTextValue] = useState(() => {
        // Загружаем текст из localStorage, если он доступен
        const storedText = localStorage.getItem(`text_${textObject.id}`);
        return storedText ? storedText : textObject.value; // Возвращаем сохранённый текст или оригинальный
    });

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
    }

    const handleDoubleClick = () => { setIsEditing(true); };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setTextValue(e.target.value); };
    
    const handleBlur = () => { 
        setIsEditing(false); 
        localStorage.setItem(`text_${textObject.id}`, textValue);
    };

    return (
        <>
            {isEditing ? (
                <input type="text"
                    value={textValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    style={{...textObjectStyles, fontSize: `${textObject.fontSize * scale}px`,}} // Добавление стилей
                    />
            ) : (
                <p onDoubleClick={handleDoubleClick} style={textObjectStyles}>
                    {textValue}
                </p>
                )}
            </>
        );
}

export {
    TextObject,
}