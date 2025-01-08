import * as slideActionCreators from './slideActionCreators'
import * as selectionActionCreators from './selectionActionCreators'
import * as editorActionCreators from './editorActionCreators'

export default {
    ...editorActionCreators,
    ...selectionActionCreators,
    ...slideActionCreators,
}