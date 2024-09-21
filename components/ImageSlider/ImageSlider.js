'use client';

import { useEffect, useState } from 'react';
import styles from './ImageSlider.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default function CafePhotos({ cafe }) {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    useEffect(() => {
        if (!cafe || !cafe.identifier) return;

        const fetchImages = async () => {
            const response = await fetch(`/api/${cafe.identifier}/images`);
            const data = await response.json();
            setImages(data);
        };

        fetchImages();
    }, [cafe]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex === images.length - 1) {
                setTranslateX(0);
                setCurrentIndex(0); 
            } else {
                nextSlide();
            }
        }, 3000); 

        return () => clearInterval(interval); 
    }, [images.length, currentIndex]);


    const nextSlide = () => {
        if (currentIndex === images.length - 1) {
            setTranslateX(0); 
            setCurrentIndex(0); 
        } else {
            setTranslateX((prev) => prev - 100);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };


    const prevSlide = () => {
        if (currentIndex === 0) {
            setTranslateX(-100 * (images.length - 1)); 
            setCurrentIndex(images.length - 1); 
        } else {
            setTranslateX((prev) => prev + 100);
            setCurrentIndex((prevIndex) => prevIndex - 1); 
        }
    };


    return (
        <>
            {images.length > 0 && (
                <div className={styles.slider}>
                    <div className={styles.sliderContainer} style={{ transform: `translateX(${translateX}%)` }}>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                className={styles.photo}
                                src={`/cafes/${cafe.identifier}/${image}`}
                                alt={`${cafe.name} - photo ${index + 1}`}
                            />
                        ))}
                    </div>
                    {images.length > 1 && (
                        <div>
                            <button className={styles.prev} onClick={prevSlide}><FontAwesomeIcon icon={faChevronCircleLeft} /></button>
                            <button className={styles.next} onClick={nextSlide}><FontAwesomeIcon icon={faChevronCircleRight} /></button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
