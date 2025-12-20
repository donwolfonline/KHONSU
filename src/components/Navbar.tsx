"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();

    const handleLoginClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        // Check if user is already authenticated
        try {
            const res = await fetch('/api/profile');
            if (res.ok) {
                // User is authenticated, redirect to dashboard
                router.push('/dashboard');
            } else {
                // User is not authenticated, go to login
                router.push('/login');
            }
        } catch {
            // On error, go to login
            router.push('/login');
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/thatch-full-logo.png"
                        alt="Thatch"
                        width={120}
                        height={32}
                        className={styles.logoImage}
                        priority
                    />
                </Link>
                <div className={styles.actions}>
                    <button
                        onClick={toggleLanguage}
                        className={styles.langToggle}
                        aria-label="Toggle Language"
                    >
                        {language === 'en' ? 'العربية' : 'English'}
                    </button>
                    <a
                        href="#"
                        onClick={handleLoginClick}
                        className={styles.loginLink}
                    >
                        {t('login')}
                    </a>
                    <Link href="/register" className="btn btn-primary">
                        {t('getStarted')}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
