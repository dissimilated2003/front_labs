import { Slide } from "../store/PresentationTypes";
import { SlideO } from "./Slide/Slide";
import styles from './WorkSpace.module.css'

type WorkspaceProps = {
    slide: Slide,
}

function Workspace({slide}: WorkspaceProps)
{
    return (
        <div className={styles.workspace}>
            <SlideO slide={slide} isSelected={false} className={styles.workspace}></SlideO>
        </div>
    )
}

export {
    Workspace,
}