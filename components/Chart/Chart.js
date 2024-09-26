import styles from './Chart.module.css';
import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"] });

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons';

function Chart({ title, data, type }) {
    const today = new Date().toLocaleString('en-US', { weekday: 'long' }).toUpperCase();

    return (
        <ul className={`${styles.chart}`}>
            <li className={styles.chart_title}>
                <FontAwesomeIcon icon={type === 'hours' ? faClock : faHeart} /> {title}
            </li>
            <li>
                {data.length === 0 ? (
                    <p>...</p>
                ) : (
                    data.map((element, index) => {
                        if (type === 'hours') {
                            const isToday = element.day.toUpperCase() === today;
                            return (
                                <div key={index} className={`${styles.row} ${isToday ? styles.today : ''}`}>
                                    <span className={styles.left}>{element.day}:</span>
                                    <span className={styles.right}>{element.hours}</span>
                                </div>
                            );
                        }
                        return (
                            <p key={index}>{element}</p>
                        );
                    })
                )}
            </li>
        </ul>
    );
}

export default Chart;
