import styles from './page.module.css';
import Image from 'next/image';
import BuyMeACoffee from '../../components/BuyMeACoffee/BuyMeACoffee';
import { PT_Serif } from 'next/font/google';

const pt_serif = PT_Serif({ subsets: ['latin'], weight: '400' })


export const metadata = {
  title: "Tom & Dips Coffee - About Us",
  description: "Tom & Dips Coffee about us",
};


export default function aboutus() {
    return (
        <div className={styles.main}>
            <table className={styles.aboutus_table}>
                <tr className={styles.larger}>
                    <p className={styles.divTitle}>Brewing connections, one cup at a time.</p>
                </tr>
                <tr >
                    {/* <td className={styles.coffee_rate}>
                        <Image
                            src={`/images/tommy.png`} // Path to the image
                            alt={"test"}
                            className={styles.selfie}
                            width={140}
                            height={140}
                            layout="fixed"
                        />
                        <Image
                            src={`/images/deep.png`} // Path to the image
                            alt={"test"}
                            className={styles.selfie}
                            width={140}
                            height={140}
                            layout="fixed"
                        />
                    </td> */}
                </tr>
                <tr className={styles.justify}>
                    Hey there! We&apos;re Tommy and Dipender, two 22-year-old developers who are absolutely obsessed with coffee and cozy, tucked-away cafes. We grew up in Toronto and have always had a soft spot for those little spots where the vibe is chill, and the coffee is amazing.

                    This site is our way of giving a shoutout to the awesome cafe culture in Toronto. We&apos;ve put together a list of some of our favorite places—whether you need a spot to get some work done, go on a cute date, or just chill with friends, we&apos;ve got you covered.

                    We&apos;re not about reviews or ratings; we just want to share the places we love with other coffee lovers like us. So go ahead, explore the site, and hopefully, you&apos;ll find your next favorite hangout.
                </tr>
            </table>
            <div className={styles.break}></div>
            <div className={styles.whyDiv}>
                <p className={styles.divTitle}>Why we&apos;re doing this</p>
                We&apos;ve faced our own challenges finding quiet, cozy cafes with great coffee in Toronto—whether for coding, catching up on assignments, or meeting up with an old friend. We believe Toronto&apos;s cafe culture is blossoming, and this is our way of supporting its growth. Along the way, we&apos;ve discovered some of the city&apos;s hidden gems, and we hope our journey helps you do the same.
                        <br/><br/>
                        We want to help you find your next great cup of coffee!
            </div>
            <div className={styles.supportDiv}>
                <p className={styles.divTitle}>Support us!</p>
                Although we have operating costs, we never plan on placing ads or monitizing the content we serve you. If you&apos;d like to support us, please consider buying us a coffee!
                <BuyMeACoffee />
            </div>
            <div className={styles.footer}>
                <p>Made with ❤️ & coffee in  TOR<span className={styles.red}>O</span>NTO</p>
            </div>
        </div >
    );
}
