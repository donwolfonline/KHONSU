"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const router = useRouter();

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

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/khonsu-logo.png"
                        alt="Khonsu Logo"
                        width={50}
                        height={50}
                        className={styles.khonsuIcon}
                    />
                    <span className={styles.khonsuText}>KHONSU</span>
                </Link>
                <div className={styles.actions}>
                    <a
                        href="#"
                        onClick={handleLoginClick}
                        className={styles.loginLink}
                    >
                        Login
                    </a>
                    <Link href="/register" className="btn btn-primary">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
