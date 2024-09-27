import Image from 'next/image';
import styles from './page.module.css';

import { Varela_Round } from 'next/font/google';
const varela = Varela_Round({ subsets: ['latin'], weight: '400' });

export default function notfound() {
  return (
    <div className={`${styles.centerLoading} ${varela.className}`}>
      <Image
        src={`/images/404.webp`}
        alt="Broken Espresso Machine"
        className={styles.loading}
        width={400}
        height={400}
        priority
      />
      <h1>
        404
        <br />
        Sorry! We have no idea how you ended up here!
      </h1>
    </div>
  );
}

