import styles from './TopPanel.module.css'
import { dispatch } from '../../store/editor.ts';
import karandash from '../../assets/karandash.svg';
import { renamePresentationTitle } from '../../store/renamePresentationTitle.ts';
import * as React from "react";
import { useAppSelector } from '../../store/hooks/useAppSelector.ts';
import { useAppActions } from '../../store/hooks/useAppActions.ts';

export function TopPanel() {
    const title = useAppSelector((editor => editor.presentation.title))
    const { commitPresentation } = useAppActions();
    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
        commitPresentation();
    }
    return (
        <div className={styles.topPanel}>
            <img className={styles.logo} src={karandash}></img>
            <input 
                className={styles.title} 
                type="text" 
                defaultValue={title} 
                onChange={onTitleChange}
            />
        </div>
    )
}