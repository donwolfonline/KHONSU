"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter
import styles from '../login/auth.module.css'; // Reusing styles

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/khonsu-logo.png"
                            alt="Khonsu Logo"
                            width={60}
                            height={60}
                            style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 15px rgba(212, 175, 55, 0.8))', marginRight: '0.75rem' }}
                        />
                        <span style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.8rem', fontWeight: 700, letterSpacing: '0.15em', color: '#d4af37', textShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }}>KHONSU</span>
                    </Link>
                    <h1 className={styles.title}>Create an account</h1>
                    <p className={styles.subtitle}>Start building your bio page today</p>
                </div>

                {success && (
                    <div style={{ color: '#22c55e', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        Account created! Redirecting to login...
                    </div>
                )}

                {error && (
                    <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
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
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="password">Password</label>
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
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>
                        Already have an account?{' '}
                        <Link href="/login" className={styles.link}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
