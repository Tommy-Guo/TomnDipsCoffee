"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className={styles.nav_container}>
            <nav className={styles.nav}>
                <Link href={`/`} passHref>
                    <div className={`${styles.logo} ${styles.Montserrat}`}>Tom n&apos; Dip&apos;s Coffee</div>
                    <Image
                        className={styles.logoImage}
                        src="/images/logo_white.png"
                        alt="Logo image"
                        width={44}
                        height={44}
                        quality={100}
                        priority
                    />
                </Link>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/aboutus" className={styles.navLink} onClick={closeMenu}>About us</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
