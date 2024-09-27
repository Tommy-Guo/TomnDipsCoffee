'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ScrollableSection.module.css';

const ScrollableSection = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchIdentifiers = async () => {
      const response = await fetch('/api/');
      const data = await response.json();
      return data.identifiers;
    };

    const fetchCafesData = async () => {
      const identifiers = await fetchIdentifiers();
      const cafesData = await Promise.all(identifiers.map(async (identifier) => {
        const response = await fetch(`/cafes/${identifier}/${identifier}.json`);
        const data = await response.json();
        return data;
      }));
      setCafes(cafesData);
    };

    fetchCafesData();
  }, []);

  return (
    <div className={styles.scrollableSection}>
      {cafes.map((cafe) => (
        <a
          href={`/${cafe.identifier}`}
          id={cafe.identifier}
          className={styles.cafe}
          key={cafe.identifier}
        >
          <div className={styles.cafeImageContainer}>
            <Image
              src={`/cafes/${cafe.identifier}/${cafe.identifier}.webp`}
              alt={cafe.name}
              className={styles.cafeImage}
              width={140}
              height={140}
              fixed="true"
              loading="eager"
              priority={true}
            />
          </div>
          <div className={styles.cafeDetails}>
            <h3>{cafe.name}</h3>
            <p>{cafe.address}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ScrollableSection;
