export type Presentation = {
    title: string,
    slides: SlidesCollection,
}

export type SlidesCollection = Array<Slide>;

export type Slide = {
    id: string,
    elements: Array<SlideElement>, 
    background: Background,
}

export type SlideElement = SlideText | SlideImage;

export type Background = SolidBackground | ImageBackground;

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

//export type Solid = {
//    color: string,
//    type: "Solid",
//}

export type SlideImage = SlideObj & {
    src: string,  
    type: "SlideImage",
}

export type ImageBackground = {
    type: 'image',
    src: string;
}

export type SolidBackground = {
    type: 'solid',
    color: string;
}

export type SlideText = SlideObj & {
    value: string, 
    type: "SlideText",  
    fontFamily: string,
    fontSize: number,
    fontColor: string,
}