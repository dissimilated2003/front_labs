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

    function onAddImage() { //TODO: чтобы можно было загружать с компа
        dispatch(addImageToSlide);
    }

    function onChangeSlideColor() {
        dispatch(changeSlideColor, {
            type: 'solid',
            color: '#FF0000',
        });
    }

    function onChangeBgrImage() { //TODO: тоже чтобы можно быть загружать с компа
        dispatch(changeSlideBgrImage)
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

            <button className={styles.button} onClick={onAddImage}>
                <img className={styles.imageButton} src={addImageIcon} alt="Добавить изображение" />
                Добавить
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
                        onChange={value => {
                            dispatch(changeSlideColor, {
                                type: 'solid',
                                color: value.target.value
                            })
                        }}
                    ></input>
                </button>
            </div>

            <div className={styles.changeSlideBgrImage}>
                <button className={styles.button} onClick={onChangeBgrImage}>
                    <input type="file" 
                    id="imageUploader" 
                    accept='image/*' 
                    onChange={onChangeBgrImage} className={styles.imageUploader}/>
                    БГР
                </button>
            </div>
        </div>
    )
}