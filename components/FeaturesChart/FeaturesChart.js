"use client";

import styles from './FeaturesChart.module.css';
import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"] });

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function FeaturesChart({ features }) {
    return (
        <ul className={`${styles.chart}`}>
            <li className={styles.chart_title}>
                <FontAwesomeIcon icon={faHeart} /> THINGS WE LOVED
            </li>
            {features.length > 0 ? (
                features.map((feature, index) => (
                    <li key={index} className={`${styles.row}`}>
                        <span className={styles.left}>{feature}</span>
                    </li>
                ))
            ) : (
                <li className={`${styles.row}, ${styles.center}`}>
                    ...
                </li>
            )}
        </ul>
    );
    
}

export default FeaturesChart;