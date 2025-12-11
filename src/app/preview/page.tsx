"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './preview.module.css';
import StoryViewer from '@/components/StoryViewer';

export default function PreviewPage() {
    const [profile, setProfile] = useState<any>(null);
    const [links, setLinks] = useState<any[]>([]);
    const [stories, setStories] = useState<any[]>([]);
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showStoryViewer, setShowStoryViewer] = useState(false);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('profile');
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
            const [profileRes, linksRes, storiesRes, placesRes] = await Promise.all([
                fetch('/api/profile'),
                fetch('/api/links'),
                fetch('/api/stories'),
                fetch('/api/places'),
            ]);

            if (profileRes.status === 401 || linksRes.status === 401) {
                router.push('/login');
                return;
            }

            if (profileRes.ok) {
                const profileData = await profileRes.json();
                setProfile(profileData.user);
            }

            if (linksRes.ok) {
                const linksData = await linksRes.json();
                setLinks(linksData.links.filter((l: any) => l.title && l.url && l.isVisible !== false));
            }

            if (storiesRes.ok) {
                const storiesData = await storiesRes.json();
                setStories(storiesData.stories);
            }

            if (placesRes.ok) {
                const placesData = await placesRes.json();
                setPlaces(placesData.places);
            }
        } catch (error) {
            console.error('Failed to fetch preview data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading preview...</p>
            </div>
        );
    }

    const themeGradient = themes[profile?.themeId as keyof typeof themes] || themes.purple;
    const buttonShape = profile?.buttonShape || 'rounded';

    return (
        <div className={styles.container} style={{ background: themeGradient }}>
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => router.push('/dashboard')}>
                    ← Back to Dashboard
                </button>
            </div>

            <div className={styles.profileContainer}>
                {profile?.image && (
                    <div
                        className={styles.profileImage}
                        style={{
                            backgroundImage: `url(${profile.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                )}
                {!profile?.image && (
                    <div className={styles.profileImage}>
                        <span className={styles.placeholder}>📷</span>
                    </div>
                )}

                <h1 className={styles.name}>{profile?.name || profile?.username || 'Your Name'}</h1>

                {/* Tab Navigation */}
                {(places.length > 0 || stories.length > 0) && (
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'profile' ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            👤 Profile
                        </button>
                        {places.length > 0 && (
                            <button
                                className={`${styles.tab} ${activeTab === 'places' ? styles.tabActive : ''}`}
                                onClick={() => setActiveTab('places')}
                            >
                                🌍 My Places
                            </button>
                        )}
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <>
                        {/* Bio */}
                        {profile?.bio && (
                            <div className={styles.bio}>
                                <p>{profile.bio}</p>
                            </div>
                        )}

                        {/* Stories */}
                        {stories.length > 0 && (
                            <div className={styles.stories}>
                                {stories.map((story, index) => (
                                    <div
                                        key={story.id}
                                        className={styles.story}
                                        style={{
                                            backgroundImage: `url(${story.imageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                        onClick={() => {
                                            setSelectedStoryIndex(index);
                                            setShowStoryViewer(true);
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Links */}
                        <div className={styles.links}>
                            {links.map((link) => {
                                // Map buttonShape to CSS class
                                const shapeClass = buttonShape === 'pill' ? styles.btnPill
                                    : buttonShape === 'sharp' ? styles.btnSharp
                                        : buttonShape === 'soft' ? styles.btnSoft
                                            : styles.btnRounded;

                                return (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.link} ${shapeClass}`}
                                    >
                                        {link.type === 'video' && <span className={styles.videoIcon}>▶</span>}
                                        {link.title}
                                    </a>
                                );
                            })}
                            {links.length === 0 && (
                                <p className={styles.emptyState}>No links added yet</p>
                            )}
                        </div>
                    </>
                )}

                {/* Places Tab */}
                {activeTab === 'places' && places.length > 0 && (
                    <div className={styles.places}>
                        <h2 className={styles.placesTitle}>Favorite Places</h2>
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
                                        {place.description && <p className={styles.placeDescription}>{place.description}</p>}
                                        <span className={styles.viewLocationLink}>📍 View on Map</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showStoryViewer && (
                <StoryViewer
                    stories={stories}
                    initialIndex={selectedStoryIndex}
                    onClose={() => setShowStoryViewer(false)}
                />
            )}
        </div>
    );
}
