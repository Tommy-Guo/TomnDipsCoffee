"use client";

import styles from './HoursChart.module.css';
import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"] });

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

function HoursChart({ hours }) {
    const days = hours[0];
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return (
        <ul className={`${styles.chart}`}>
            <li className={styles.chart_title}>
                <FontAwesomeIcon icon={faClock} /> HOURS OPEN
            </li>
            {(() => {
                try {
                    // Assuming `hours` is the object from the JSON
                    const hours = {
                        "SUNDAY": "9:00 - 16:00",
                        "MONDAY": "7:00 - 19:00",
                        "TUESDAY": "7:00 - 19:00",
                        "WEDNESDAY": "7:00 - 19:00",
                        "THURSDAY": "7:00 - 19:00",
                        "FRIDAY": "7:00 - 19:00",
                        "SATURDAY": "8:00 - 17:00"
                    };
    
                    // Get the current day if necessary
                    const today = new Date().toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
    
                    return Object.keys(hours).map(day => (
                        <li key={day} className={`${styles.row} ${today === day ? styles.today : ''}`}>
                            <span className={styles.left}>{day + ":"}</span>
                            <span className={styles.right}>{hours[day] || "Closed"}</span>
                        </li>
                    ));
                } catch (error) {
                    console.error("Error rendering hours:", error);
                    return <li className={styles.error}>Failed to load hours</li>;
                }
            })()}
        </ul>
    );
    
}

export default HoursChart;