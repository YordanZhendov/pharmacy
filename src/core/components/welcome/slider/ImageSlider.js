import React, {useState} from 'react'
import {imageData} from '../../../api/data';
import styles from '../../../css/welcome/slider.module.css'

const ImageSlider = ({slides}) => {
    const numberSlides=slides;
    const [cuurent, setCurrentPicture] = useState(0);

    const nextSlide = (e) => {
        e.preventDefault();
        setCurrentPicture(cuurent === numberSlides - 1 ? 0 : cuurent + 1)
    }

    const prevSlide = (e) => {
        e.preventDefault();
        setCurrentPicture(cuurent === 0 ? numberSlides - 1 : cuurent - 1)
    }

    return (
        <div>
        <section className={styles.slider}>
            <div className={styles.leftArrow__container}>
                <i className="fa-solid fa-arrow-left" id={styles.leftArrow} onClick={prevSlide}></i>
            </div>
            <div className={styles.container__image}>
                {imageData.map((slide,index) => {
                    return (
                        <div className={index === cuurent ? 'slide active' : 'slide'} key={index}>
                                {index === cuurent && (
                                <img src={slide.image} alt='loading' className={styles.image} />
                                )}
                        </div>  
                    );
                    })}  
            </div>
            <div className={styles.rightArrow__container}>
                <i className="fa-solid fa-arrow-right" id={styles.rightArrow} onClick={nextSlide}></i>
            </div>
        </section>
        </div>
    )
}

export default ImageSlider
