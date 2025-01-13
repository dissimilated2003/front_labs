import styles from './ToolBar.module.css';
import React, { useEffect, useRef } from 'react';
import addSlideIcon from '../../assets/zeleniyPlusik.png';
import removeSlideIcon from '../../assets/krasniyKrestik.png';
import addTextIcon from '../../assets/bukvaText.svg';
import removeElementIcon from '../../assets/musorka.svg';
import addImageIcon from '../../assets/izobrazhenie.svg';
import upwardArrow from '../../assets/upwardArrow.png';
import downwardArrow from '../../assets/downwardArrow.png';
import undoArrow from '../../assets/undoArrow.png';
import redoArrow from '../../assets/redoArrow.png';
import fileIcon from '../../assets/fileIcon.png';
import { exportPresentation } from '../../store/localStorage/fileUtils';
import { getEditor } from '../../store/editor';
import { useAppActions } from '../../store/hooks/useAppActions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { importPresentationFromFile } from '../../store/reduxStore/slideActionCreators';
import { HistoryContext } from '../../store/hooks/historyContext';
import { generatePDF } from '../../store/utilities/generatePdf';
import { useAppSelector } from '../../store/hooks/useAppSelector';

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
        setEditor,
    } = useAppActions();

    const editor = useAppSelector((state) => state);
    const slides = editor.presentation.slides;
    const presentationTitle = editor.presentation.title;
    const [pdfURL, setPdfURL] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleGeneratePDF = async () => {
        try {
            const pdfBlob = await generatePDF(slides);
            const pdfURL = URL.createObjectURL(pdfBlob);
            setPdfURL(pdfURL);
            setModalOpen(true);
        } catch (err) {
            console.error('Error generate PDF: ', err);
            alert("Error generate PDF!")
        }
    };

    const handleDownloadPDF = () => {
        if (pdfURL) {
            const link = document.createElement("a");
            link.href = pdfURL;
            link.download = presentationTitle + ".pdf";
            link.click();
        }
    }

    const handleClosePreview = () => {
        setModalOpen(false);
        setPdfURL(null);
    }

    const history = React.useContext(HistoryContext);
    function onUndo() {
        const newEditor = history.undo();
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onRedo() {
        const newEditor = history.redo();
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey) {
                if (event.key === 'z' || event.key === 'Z' || event.key === 'Я' || event.key === 'я') {
                    event.preventDefault();
                    onUndo();
                } else if (event.key === 'y' || event.key === 'Y' || event.key === 'Н' || event.key === 'н') {
                    event.preventDefault();
                    onRedo();
                }
            }
            if (event.key === 'Delete') {
                event.preventDefault();
                removeElementFromSlide();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    function onExportPresentation() {
        const editor = getEditor();
        exportPresentation(editor);
    }

    const dispatch = useDispatch();
    const handleImportPresentation = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            dispatch(importPresentationFromFile(file));
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
                <img className={`${styles.imageButton} ${styles.fixMargin}`} src={addSlideIcon} alt="Добавить слайд" />
                SLIDE
            </button>

            <button className={styles.button} onClick={removeSlide}>
                <img className={`${styles.imageButton} ${styles.fixMargin}`} src={removeSlideIcon} alt="Удалить слайд" />
                SLIDE
            </button>

            <button className={styles.button} onClick={changeTextContent}>
                <img className={`${styles.imageButton} ${styles.fixMargin} ${styles.sourceFilter}`} src={addTextIcon} alt="Добавить текст" />
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
                <img className={`${styles.imageButton} ${styles.fixMargin} ${styles.sourceFilter}`} src={addImageIcon} alt="Добавить изображение"/>
                <span onClick={() => imageInputRef.current?.click()}>ADD</span>
            </button>

            <button className={styles.button} onClick={removeElementFromSlide}>
                <img className={`${styles.imageButton} ${styles.fixMargin} ${styles.sourceFilter}`} src={removeElementIcon} alt="Удалить объект" />
                OBJ
            </button>

            <div className={styles.changeSlideColor}>
                <button className={styles.button}>
                    BGR
                    <input
                        className={styles.colorpicker} 
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => onChangeBgrColor(e.target.value)}
                    />
                </button>
            </div>

            <button className={`${styles.button}`} onClick={() => bgrImageInputRef.current?.click()}>
                <input
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={onChangeBgrImage}
                    className={styles.imageUploader}
                    style={{ display: 'none' }}
                    ref={bgrImageInputRef}
                />
                <img className={`${styles.imageButton} ${styles.fixMargin} ${styles.sourceFilter}`} src={addImageIcon} alt="Фоновое изображение"/>
                BGR
            </button>

            <div className={`${styles.vorona}`}>
                <button className={styles.button} onClick={handleGeneratePDF}>
                    <img className={`${styles.sourceFilter} ${styles.fixMargin}`} src={fileIcon}/>
                    PDF
                </button>

                <div className={styles.prikol}></div>

                <button className={`${styles.button} ${styles.fixMargin}`} onClick={onExportPresentation}>
                    <img className={`${styles.imageButton} ${styles.sourceFilter}`} src={downwardArrow} alt="Экспорт"/>
                </button>

                <div className={styles.importButton}> 
                    <button 
                        className={styles.button} 
                        onClick={() => document.getElementById('importFile')?.click()}>
                        <img className={`${styles.imageButton} ${styles.sourceFilter}`} src={upwardArrow} alt="Импорт"/>
                    </button>
                    <input
                        type="file"
                        id="importFile"
                        accept='.json'
                        onChange={handleImportPresentation}
                        className={styles.fileInput}
                        style={{ display: 'none' }}
                    />
                </div>

                <div className={styles.prikol}></div>

                <button className={`${styles.button} ${styles.fixMargin}`} onClick={onUndo}>
                    <img className={`${styles.sourceFilter}`} src={undoArrow} alt="Undo"/>
                </button>

                <button className={styles.button} onClick={onRedo}>
                    <img className={`${styles.sourceFilter}`} src={redoArrow} alt="Redo"/>
                </button>

                {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        {pdfURL && (
                            <>
                                <iframe
                                    src={pdfURL}
                                    title="PDF Preview"
                                    className={styles.iframePreview}
                                    style={{width: '100%', height: '80vh'}}
                                ></iframe>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <button className={`${styles.button} ${styles.setMT} ${styles.setML}`} onClick={handleDownloadPDF}>
                                        DOWNLOAD PDF
                                    </button>
                                    <button className={`${styles.button} ${styles.setMT}`} onClick={handleClosePreview}>
                                        RETURN
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}