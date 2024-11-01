import styles from './TopPanel.module.css'
import { dispatch } from '../../store/editor.ts';
import karandash from '../../assets/karandash.svg';
import { renamePresentationTitle } from '../../store/renamePresentationTitle.ts';
import * as React from "react";

type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps)
{
    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }
    return (
        <div className={styles.TopPanel}>
            <img className={styles.logo} src={karandash}></img>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>
        </div>
    )
}

export {
    TopPanel
}