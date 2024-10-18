import styles from './TopPanel.module.css'
import { Button } from '../../components/button/Button';
import { dispatch } from '../../store/editor.ts';
import { removeSlide } from '../../store/removeSlide.ts';
import { renamePresentationTitle } from '../../store/renamePresentationTitle.ts';
import * as React from "react";

type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps)
{
    function onAddSlide()
    {

    }
    
    function onRemoveSlide()
    {
        dispatch(removeSlide)
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }
    return (
        <div className={styles.TopPanel}>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>
            <div>
                <Button className={styles.button} text={'Добавить слайд'} onClick={onAddSlide}></Button>
                <Button className={styles.button} text={'Удалить слайд'} onClick={onRemoveSlide}></Button>
            </div>
        </div>
    )
}

export {
    TopPanel
}