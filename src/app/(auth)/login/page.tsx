"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
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
                        <p>Checking authentication...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={`glass-card ${styles.card}`}>
                <div className={styles.header}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/thatch-full-logo.png"
                            alt="Thatch"
                            width={140}
                            height={40}
                            priority
                        />
                    </Link>
                    <h1 className={styles.title}>Welcome back</h1>
                    <p className={styles.subtitle}>Enter your details to access your account</p>
                </div>

                {registered && (
                    <div style={{ color: '#22c55e', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        Account created successfully! Please sign in.
                    </div>
                )}

                {error && (
                    <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
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
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>
                        Don't have an account?{' '}
                        <Link href="/register" className={styles.link}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
