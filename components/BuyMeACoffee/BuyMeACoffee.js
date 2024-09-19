import Image from 'next/image';
import styles from './BuyMeACoffee.module.css';

function BuyMeACoffee() {
    return (
        <a className={styles.BuyMeACoffee}
            target="_blank"
            href="https://buymeacoffee.com/tommyg7">
            <div className={styles.main}>
                <Image
                    className={styles.coffeeImage}
                    src="/images/coffee.svg"
                    alt="Buy me a coffee icon"
                    width={35}
                    height={50}
                    quality={100}
                    priority
                />
                <span className={styles.coffeeButtonText}>Buy us a coffee</span>
            </div>
        </a>
    );
}
export default BuyMeACoffee;