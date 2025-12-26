"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './auth.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get('registered');
    const { language, setLanguage, t } = useLanguage();

    // Check if user is already authenticated
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    // User is already logged in, redirect to dashboard
                    router.push('/dashboard');
                    return;
                }
            } catch (error) {
                // User is not authenticated, continue to login page
            } finally {
                setChecking(false);
            }
        };
        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Invalid credentials');
            }

            // Redirect to dashboard
            router.push('/dashboard');
            router.refresh(); // Refresh to update middleware/session state
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    // Show loading while checking authentication
    if (checking) {
        return (
            <div className={styles.container}>
                <div className={`glass-card ${styles.card}`}>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>{t('checkingAuth')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={`glass-card ${styles.card}`}>
                <div className={styles.header}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/thatch-full-logo.png"
                                alt="Thatch"
                                width={140}
                                height={40}
                                priority
                            />
                        </Link>
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                            style={{
                                background: 'none',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                color: '#1A1A1A'
                            }}
                        >
                            {language === 'en' ? 'العربية' : 'English'}
                        </button>
                    </div>
                    <h1 className={styles.title}>{t('welcomeBack')}</h1>
                    <p className={styles.subtitle}>{t('enterDetails')}</p>
                </div>

                {registered && (
                    <div style={{ color: '#22c55e', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {t('accountCreated')}
                    </div>
                )}

                {error && (
                    <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">{t('email')}</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hello@example.com"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">{t('password')}</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
                        {isLoading ? t('signingIn') : t('signIn')}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>
                        {t('dontHaveAccount')}{' '}
                        <Link href="/register" className={styles.link}>
                            {t('signUp')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
