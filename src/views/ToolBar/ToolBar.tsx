import styles from './ToolBar.module.css';
import { dispatch } from '../../store/editor';
import { addSlide } from '../../store/addSlide';
import { removeSlide } from '../../store/removeSlide';
import { addTextToSlide } from '../../store/addTextToSlide';
import { addImageToSlide } from '../../store/addImageToSlide';
import { removeElementFromSlide } from '../../store/removeElementFromSlide';
import { changeSlideColor } from '../../store/changeSlideColor';
import { changeSlideBgrImage } from '../../store/changeSlideBgrImage';

import addSlideIcon from '../../assets/zeleniyPlusik.png';
import removeSlideIcon from '../../assets/krasniyKrestik.png';
import addTextIcon from '../../assets/bukvaText.svg';
import removeElementIcon from '../../assets/musorka.svg';
import addImageIcon from '../../assets/izobrazhenie.svg';
import upwardArrow from '../../assets/upwardArrow.png';
import downwardArrow from '../../assets/downwardArrow.png';
import { exportPresentation } from '../../store/localStorage/fileUtils';
import { importPresentation } from '../../store/localStorage/fileUtils';
import { getEditor } from '../../store/editor';
import { useRef } from 'react';

export function ToolBar()
{
    function onAddSlide() {
        dispatch(addSlide);
    }

    function onRemoveSlide() {
        dispatch(removeSlide);
    }

    function onAddText() {
        dispatch(addTextToSlide);
    }

    function onRemoveElement() {
        dispatch(removeElementFromSlide);
    }

    //const fileInputRef = useRef<HTMLInputElement | null>(null)
    function onAddImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                dispatch(addImageToSlide, imageUrl); 
            };

            reader.readAsDataURL(file);
        }
    }

    /* function handleButtonClick() {
        fileInputRef.current?.click();
    } */

    function onChangeSlideColor() {
        dispatch(changeSlideColor, {
            type: 'solid',
            color: '#FF0000',
        });
    }

    function onExportPresentachion() {
        const editor = getEditor();
        exportPresentation(editor);
    }

    function onImportPresentachion(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            importPresentation(file)
                .then((parsedContent) => {
                    dispatch(() => parsedContent);
                })
                .catch((err) => {
                    console.error('Error importing presentation:', err);
                    alert('Please check the file format.');
                });
        }
    }

    const imageInputRef = useRef<HTMLInputElement | null>(null); 
    const bgrImageInputRef = useRef<HTMLInputElement | null>(null); 
    function onChangeBgrImage(event: React.ChangeEvent<HTMLInputElement>) { 
        const file = event.target.files?.[0];
        
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                dispatch(changeSlideBgrImage, imageUrl); 
            };

            reader.readAsDataURL(file);
        }
    }

    return (
        <div className={styles.toolbar}>
            <button className={styles.button} onClick={onAddSlide}>
                <img className={styles.imageButton} src={addSlideIcon} alt="Добавить слайд" />
                Слайд
            </button>

            <button className={styles.button} onClick={onRemoveSlide}>
                <img className={styles.imageButton} src={removeSlideIcon} alt="Удалить слайд" />
                Слайд
            </button>

            <button className={styles.button} onClick={onAddText}>
                <img className={styles.imageButton} src={addTextIcon} alt="Добавить текст" />
                Добавить
            </button>

            <button className={styles.button} >
                <input
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={onAddImage}
                    className={styles.imageUploader}
                    style={{ display: 'none' }}
                    ref={imageInputRef}
                />
                <img className={styles.imageButton} src={addImageIcon} alt="Добавить изображение"/>
                <span onClick={() => imageInputRef.current?.click()}>Добавить</span>
            </button>

            <button className={styles.button} onClick={onRemoveElement}>
                <img className={styles.imageButton} src={removeElementIcon} alt="Удалить объект" />
                Объект
            </button>

            <div className={styles.changeSlideColor}>
                <button className={styles.button} onClick={onChangeSlideColor}>
                    Фон
                    <input
                        className={styles.colorpicker} 
                        type={'color'} 
                        value={'#FF0000'}
                        onInput={() => {}}
                        onChange={value => { dispatch(changeSlideColor, { type: 'solid', color: value.target.value }) }}
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
                Фон слайда
            </button>

            <button className={styles.button} onClick={onExportPresentachion}>
            <img className={styles.imgOnButton} src={downwardArrow}/>
                Экспорт
            </button>

            <div className={styles.importButton}> 
                
                <button 
                    className={styles.button} 
                    onClick={() => document.getElementById('importFile')?.click()}>
                    <img className={styles.imgOnButton} src={upwardArrow}/>
                    Импорт
                </button>

                <input
                    type="file"
                    id="importFile"
                    accept='.json'
                    onChange={onImportPresentachion}
                    className={styles.fileInput}
                    style={{ display: 'none' }}/>
            </div>
        </div>
    )
}