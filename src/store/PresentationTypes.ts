export type Presentation = {
    title: string,
    slides: Array<Slide>,
}

export type Slide = {
    id: string,
    elements: Array<SlideElement>, 
    background: string, //Background,
}

export type SlideElement = SlideText | SlideImage;

//export type Background = Solid | BackImage;

export type SlideObj = { // базовый тип
    id: string,
    pos: {
        ox: number,
        oy: number,
    },
    size: {
        width: number,
        height: number,
    }
}

export type Solid = {
    color: string,
    type: "Solid",
}

export type SlideImage = SlideObj & {
    src: string,  
    type: "SlideImage",
}

/* export type BackImage = {
    src: string,
    type: "BackImage",
} */

export type SlideText = SlideObj & {
    value: string, 
    type: "SlideText",  
    fontFamily: string,
    fontSize: number,
    fontColor: string,
}