"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from '../login/auth.module.css';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();

    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setSuccess(true);
            // Small delay to let user see success message
            setTimeout(() => {
                router.push('/login?registered=true');
            }, 1500);
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

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
                    <h1 className={styles.title}>{t('createAccount')}</h1>
                    <p className={styles.subtitle}>{t('startBuilding')}</p>
                </div>

                {success && (
                    <div style={{ color: '#22c55e', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {t('accountCreatedRedirect')}
                    </div>
                )}

                {error && (
                    <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">{t('username')}</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="travel_explorer"
                            required
                        />
                    </div>

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
                        {isLoading ? t('creatingAccount') : t('signUp')}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>
                        {t('alreadyHaveAccount')}{' '}
                        <Link href="/login" className={styles.link}>
                            {t('signIn')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
