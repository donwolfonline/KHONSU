"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './places.module.css';

export default function PlacesPage() {
    const [profile, setProfile] = useState<any>(null);
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const themes = {
        purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        pink: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        blue: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        dark: '#0a0a0a',
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileRes, placesRes] = await Promise.all([
                fetch('/api/profile'),
                fetch('/api/places'),
            ]);

            if (profileRes.ok) {
                const profileData = await profileRes.json();
                setProfile(profileData.user);
            }

            if (placesRes.ok) {
                const placesData = await placesRes.json();
                setPlaces(placesData.places);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading places...</p>
            </div>
        );
    }

    const themeGradient = themes[profile?.themeId as keyof typeof themes] || themes.purple;

    return (
        <div className={styles.container} style={{ background: themeGradient }}>
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => router.push('/preview')}>
                    ← Back to Profile
                </button>
            </div>

            <div className={styles.content}>
                <h1 className={styles.title}>✈️ My Favorite Places</h1>
                <p className={styles.subtitle}>Discover the destinations I love</p>

                {places.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🌍</div>
                        <p>No places added yet</p>
                    </div>
                ) : (
                    <div className={styles.placesGrid}>
                        {places.map((place) => (
                            <a
                                key={place.id}
                                href={place.locationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.placeCard}
                            >
                                <div
                                    className={styles.placeImage}
                                    style={{ backgroundImage: `url(${place.imageUrl})` }}
                                />
                                <div className={styles.placeInfo}>
                                    <h3 className={styles.placeTitle}>{place.title}</h3>
                                    {place.description && (
                                        <p className={styles.placeDescription}>{place.description}</p>
                                    )}
                                    <span className={styles.viewLocationLink}>
                                        📍 View on Map
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
