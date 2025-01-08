import styles from './ToolBar.module.css';
import React, { useRef } from 'react';

import addSlideIcon from '../../assets/zeleniyPlusik.png';
import removeSlideIcon from '../../assets/krasniyKrestik.png';
import addTextIcon from '../../assets/bukvaText.svg';
import removeElementIcon from '../../assets/musorka.svg';
import addImageIcon from '../../assets/izobrazhenie.svg';
import upwardArrow from '../../assets/upwardArrow.png';
import downwardArrow from '../../assets/downwardArrow.png';
import { exportPresentation, importPresentation } from '../../store/localStorage/fileUtils';
import { getEditor } from '../../store/editor';
import { useAppActions } from '../../store/hooks/useAppActions';
import { useState } from 'react';

export function ToolBar() {
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const {
        addSlide,
        removeSlide,
        changeTextContent,
        addImageToSlide,
        removeElementFromSlide,
        changeSlideColor,
        changeSlideBgrImage,
    } = useAppActions();

    function onExportPresentation() {
        const editor = getEditor();
        exportPresentation(editor);
    }

    const handleImportPresentation = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            importPresentation(file)
                .catch((err) => {
                    console.error('Error importing presentation', err);
                    alert('Error importing presentation. Please check file format');
                });
        }
    }

    const onChangeBgrColor = (color: string) => {
        changeSlideColor({ type: 'solid', color});
        setBackgroundColor(color);
    }

    const imageInputRef = useRef<HTMLInputElement | null>(null); 
    const bgrImageInputRef = useRef<HTMLInputElement | null>(null); 

    const onChangeBgrImage = (event: React.ChangeEvent<HTMLInputElement>) => { 
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                changeSlideBgrImage({ type: 'image', src: reader.result as string});
            };
            reader.readAsDataURL(file);
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgSrc = reader.result as string;
                addImageToSlide(imgSrc)
            }
            reader.readAsDataURL(file);
        }
    }

    const [fontSize, setFontSize] = useState(20);
    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFontSize(Number(e.target.value));
    };

    return (
        <div className={styles.toolbar}>
            <button className={styles.button} onClick={addSlide}>
                <img className={styles.imageButton} src={addSlideIcon} alt="Добавить слайд" />
                SLIDE
            </button>

            <button className={styles.button} onClick={removeSlide}>
                <img className={styles.imageButton} src={removeSlideIcon} alt="Удалить слайд" />
                SLIDE
            </button>

            <button className={styles.button} onClick={changeTextContent}>
                <img className={`${styles.imageButton} ${styles.sourceFilter}`} src={addTextIcon} alt="Добавить текст" />
                ADD
                <div>
                    <input
                        type="number"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        placeholder="Font Size"
                        style={{
                            marginLeft: 10,
                            width: 40,
                            fontFamily: 'Arial',
                            fontSize: 16,
                            fontWeight: 600,
                            color: 'silver',
                            backgroundColor: 'transparent',
                            borderLeft: '2px solid silver',
                            borderRight: 'none',
                            borderBottom: 'none',
                            borderTop: 'none',
                            height: 16,
                            paddingLeft: 10,
                        }}
                    />
            
                </div>
            </button>

            <button className={styles.button} >
                <input
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={handleImageChange}
                    className={styles.imageUploader}
                    style={{ display: 'none' }}
                    ref={imageInputRef}
                />
                <img className={`${styles.imageButton} ${styles.sourceFilter}`} src={addImageIcon} alt="Добавить изображение"/>
                <span onClick={() => imageInputRef.current?.click()}>ADD</span>
            </button>

            <button className={styles.button} onClick={removeElementFromSlide}>
                <img className={`${styles.imageButton} ${styles.sourceFilter}`} src={removeElementIcon} alt="Удалить объект" />
                OBJECT
            </button>

            <div className={styles.changeSlideColor}>
                <button className={styles.button}>
                    BGR COLOR
                    <input
                        className={styles.colorpicker} 
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => onChangeBgrColor(e.target.value)}
                    ></input>
                </button>
            </div>

            <button className={styles.button} onClick={() => bgrImageInputRef.current?.click()}>
                <input
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={onChangeBgrImage}
                    className={styles.imageUploader}
                    style={{ display: 'none' }}
                    ref={bgrImageInputRef}
                />
                <img className={`${styles.imageButton} ${styles.sourceFilter}`} src={addImageIcon} alt="Фоновое изображение"/>
                BACKGROUND
            </button>

            <button className={styles.button} onClick={onExportPresentation}>
            <img className={`${styles.imageButton} ${styles.sourceFilter}`} src={downwardArrow} alt="Экспорт"/>
                EXPORT
            </button>

            <div className={styles.importButton}> 
                
            <button 
                className={styles.button} 
                onClick={() => document.getElementById('importFile')?.click()}>
                <img className={`${styles.imageButton} ${styles.sourceFilter}`} src={upwardArrow} alt="Импорт"/>
                IMPORT
            </button>

                <input
                    type="file"
                    id="importFile"
                    accept='.json'
                    onChange={handleImportPresentation}
                    className={styles.fileInput}
                    style={{ display: 'none' }}/>
            </div>
        </div>
    )
}