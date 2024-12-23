import { editor } from "./data.ts"
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage/localStorageUtils.ts";
import { validateEditor } from "./localStorage/validation.ts";

let _editor = loadFromLocalStorage() || editor 
let _handler: Function | null = null 

function getEditor() 
{
    loadFromLocalStorage();
    return _editor
}

function setEditor(newEditor: any) 
{
    _editor = newEditor;
    saveToLocalStorage(_editor);
}

function dispatch(modifyFn: Function, payload?: Object): void 
{
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)
    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Function): void
{
    _handler = handler
}

const initState = loadFromLocalStorage();
if (initState && validateEditor(initState.presentation)) {
    setEditor(initState)
} else {
    console.error('Invalid init state from LS')
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}