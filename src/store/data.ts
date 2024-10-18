import {Presentation, Slide} from "./PresentationTypes.ts";
import {EditorType} from "./editorType.ts";

const slide1: Slide = {
    id: 'slide-1',
    elements: [
        {
            id: 'text-1',
            type: 'SlideText',
            pos: {ox: 20, oy: 50},
            size: {width: 400, height: 10},
            value: 'миллион лет это писал',
            fontFamily: 'Arial',
            fontSize: 27,
            fontColor: '00CC99'
        },
        {
            id: 'text-2',
            type: 'SlideText',
            pos: {ox: 20, oy: 10},
            size: {width: 400, height: 10},
            value: 'Фляга свистит от таких лабораторных',
            fontFamily: 'Arial',
            fontSize: 20,
            fontColor: '00CC99'
        },
    ],
    background: '666666', 
}

const slide2: Slide = {
    id: 'slide-2',
    elements: [
        {
            id: 'image-1',
            type: 'SlideImage',
            pos: {ox: 20, oy: 50},
            size: {width: 100, height: 10},
            src: '../src/store/кирпич.png'
        },
    ],
    background: '#00ff99', 
}

const expansion = '.pdf'

const presentation: Presentation = {
    title: 'Крутая презентация' + expansion,
    slides: [slide1, slide2]
}

const editor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: presentation.slides[1].id,
    }
}

export {
    editor,
}