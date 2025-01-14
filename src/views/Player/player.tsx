import { useNavigate } from "react-router"
import { SlideO } from "../Slide/Slide"
import { useState } from "react";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import styles from "../Player/player.module.css"
import { useEffect } from "react";

export function Player() {
    const [slide, setSlide] = useState(0)
    const nav = useNavigate();
    const editor = useAppSelector((state) => state);
    const slides = editor.presentation.slides;

    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowLeft":
                if (slide !== 0) { prevSlide(); }
                break;
            case "ArrowRight":
                nextSlide();
                break;
            case "Escape":
                closePreview();
                break;
            default:
                break;
        }
    }

    const prevSlide = () => {
        if (slides.length > 0) {
            setSlide(slide - 1)
        }
    }

    const nextSlide = () => {
        if (slide < slides.length - 1) {
            setSlide(slide + 1)
        }
    }

    const closePreview = () => {
        nav("/")
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [slide, nav, slides]);

    return (
        <div className={styles.totalVorona}>
            <div className={`${styles.previewPanel}`}>
                <button className={`${styles.closeButton} ${styles.button}`} onClick={closePreview}>CLOSE</button>
            </div>
            <div className={`${styles.vorona}`}>
                <button 
                    className={`${styles.button} ${styles.transitionButton}`} 
                    onClick={prevSlide}
                    disabled={slide === 0}
                >
                    PREV
                </button>

                <SlideO 
                    slide={slides[slide]}
                    className={`${styles.slidePreview}`}
                    scale={1.25}
                    showResizeHandles={false}
                    selection={undefined}
                ></SlideO>

                <button 
                    className={`${styles.button} ${styles.transitionButton}`} 
                    onClick={nextSlide}
                >
                    NEXT
                </button>
            </div>
        </div>
    )
}