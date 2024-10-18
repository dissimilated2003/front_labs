import styles from './App.module.css'
import { SlidesList } from './views/SlideList'
import { TopPanel } from './views/TopPanel/TopPanel'
import { Workspace } from './views/WorkSpace'
import { EditorType } from './store/editorType'

type AppProps = {
    editor: EditorType,
}

function App({editor}: AppProps)
{
    return (
        <>
            <TopPanel title={editor.presentation.title}></TopPanel>
            <div className={styles.container}>
                <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
                <Workspace slide={editor.presentation.slides[0]}></Workspace>
            </div>
        </>
    )
}

export default App