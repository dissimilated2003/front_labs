import styles from './App.module.css'
import { SlidesList } from './views/SlideList'
import { TopPanel } from './views/TopPanel/TopPanel'
import { ToolBar } from './views/ToolBar/ToolBar'
import { Workspace } from './views/WorkSpace'
import { EditorType } from './store/editorType'

type AppProps = {
    editor: EditorType,
}

function App({editor}: AppProps)
{
    return (
        <div className='App'>
            <TopPanel title={editor.presentation.title}></TopPanel>
            <ToolBar></ToolBar>
            <div className={styles.container}>
                <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
                <Workspace slide={editor.presentation.slides.find(SlideO => SlideO.id == editor.selection.selectedSlideId) || null} 
                selectedObjectId={editor.selection.selectedObjectId}>
                </Workspace>
            </div>
        </div>
    )
}

export default App