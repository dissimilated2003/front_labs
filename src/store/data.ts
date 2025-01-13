import {Presentation, Slide} from "./PresentationTypes.ts";
import {EditorType} from "./editorType.ts";
import './Kirpish.png'

const slide1: Slide = {
    id: 'slide-1',
    elements: [
        {
            id: 'text-1',
            type: 'SlideText',
            pos: {ox: 20, oy: 170},
            size: {width: 400, height: 30},
            value: 'это твой ноут от PRESENTATION MAKER:',
            fontFamily: 'Arial',
            fontSize: 20,
            fontColor: '00CC99'
        },
        {
            id: 'text-2',
            type: 'SlideText',
            pos: {ox: 100, oy: 10},
            size: {width: 400, height: 30},
            value: 'Фляга свистит от таких лабораторных',
            fontFamily: 'Arial',
            fontSize: 20,
            fontColor: '00CC99'
        },
        {
            id: 'image-1',
            type: 'SlideImage',
            pos: {ox: 60, oy: 220},
            size: {width: 250, height: 130},
            src: './src/store/vedro.jpg'
        },
    
    ],
    background: {type: 'solid', color: '#11aa35'}, 
}
const slide2: Slide = {
    id: 'slide-2',
    elements: [
        {
            id: 'text-4',
            type: 'SlideText',
            pos: {ox: 440, oy: 40},
            size: {width: 400, height: 30},
            value: 'хочу 4 по фронтенду',
            fontFamily: 'Arial',
            fontSize: 20,
            fontColor: '00CC99'
        },
    ],
    background: {type: 'image', src: './src/store/frontend.jpg'}, 
}

const presentation: Presentation = {
    title: 'ыъльовалеьоыъ',
    slides: [
        slide1, 
        slide2,
    ]
}

const defEditor: EditorType = {
    presentation,
    savedPresentation: presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
        selectedObjectId: null,
    }
}

export {
    defEditor,
}