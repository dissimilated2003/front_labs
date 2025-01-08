import styles from './App.module.css'
import { SlidesList } from './views/SlideList'
import { TopPanel } from './views/TopPanel/TopPanel'
import { ToolBar } from './views/ToolBar/ToolBar'
import { Workspace } from './views/WorkSpace'
import { HistoryContext } from './store/hooks/historyContext'
import { HistoryType } from './store/utilities/historyUndoRedo'

type AppProps = {
    history: HistoryType,
}

function App({history}: AppProps)
{
    return (
        <HistoryContext.Provider value={history}>
            <TopPanel></TopPanel>
            <ToolBar></ToolBar>
            <div className={styles.container}>
                <SlidesList></SlidesList>
                <Workspace></Workspace>
            </div>
        </HistoryContext.Provider>
    )
}

export default App