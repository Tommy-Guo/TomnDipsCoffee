'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import HoursChart from '../../components/HoursChart/HoursChart';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import FeaturesChart from '@/components/FeaturesChart/FeaturesChart';

import { Passion_One, Varela_Round, Oswald } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const oswald = Oswald({ subsets: ['latin'], weight: '400' });
const passionone = Passion_One({ subsets: ['latin'], weight: '400' });
const varela = Varela_Round({ subsets: ['latin'], weight: '400' });

const fetchCafeData = async (identifier) => {
  try {
    const response = await fetch(`/api/${identifier}`);

    if (!response.ok) {
      return { data: null, status: response.status };
    }

    const data = await response.json();
    return { data, status: 200 };

  } catch (error) {
    console.error('Error fetching cafe data:', error);
    return { data: null, status: 500 };
  }
};

export default function CafePage({ params }) {
  const { identifier } = params;
  const [cafe, setCafe] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getCafeData = async () => {
      const { data, status } = await fetchCafeData(identifier);

      if (status === 404) {
        router.push('/not-found');
      } else if (status === 500) {
        setError('There was an error fetching the cafe data. Please try again later.');
      } else if (data) {
        setCafe(data);
      } else {
        setError('Unexpected error occurred.');
      }
    };

    getCafeData();
  }, [identifier, router]);

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  if (!cafe) {
    return (
      <div className={styles.centerLoading}>
        <Image
          src={`/images/loading.gif`}
          alt="Loading GIF"
          className={styles.loading}
          width={400}
          height={400}
          priority
        />
      </div>
    );
  }

  return (
    <div className={`${styles.main_body} ${varela.className}`}>
      <Head>
        <title>test</title>
      </Head>
      <div className={styles.main_content}>
        <div className={styles.photo_rating}>
          <div className={styles.photo_container}>
            {/* <img className={styles.photo} src={`/cafes/${cafe.identifier}/${cafe.identifier}.jpg`} alt={cafe.name} /> */}
            <ImageSlider cafe={cafe}/>
          </div>
          <table className={styles.rating_container}>
            <tbody>
              <tr className={oswald.className}>
                <td className={styles.coffee_rate}>
                  <p className={styles.score} style={{ color: "#9576AE" }}>{cafe.coffee_rating}</p>
                  Coffee
                </td>
                <td className={styles.overall_rate}>
                  <p className={styles.score} style={{ color: "#8FAE76" }}>{cafe.vibe_rating}</p>
                  Vibes
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.main_data}>
          <p className={`${styles.title} ${passionone.className}`}>{cafe.name}</p>
          <p className={`${styles.medium_text} ${styles.divider}`}><FontAwesomeIcon icon={faLocationDot} /> {cafe.address}</p>
          <div className={styles.chart_container}>
            <HoursChart hours={cafe.hours} className={styles.chart} />
            <FeaturesChart features={cafe.features} />
          </div>

          <div>
            <p className={styles.divider} />
            <span className={styles.larger}>Quick notes:</span><br /><br />
            {cafe.general_desc}
          </div>
        </div>
      </div>
    </div>
  );
}
