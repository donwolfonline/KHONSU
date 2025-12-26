"use client";

import { useState } from 'react';
import styles from './demo.module.css';
import StoryViewer from '@/components/StoryViewer';
import Image from 'next/image';

export default function DemoPage() {
    const [showStoryViewer, setShowStoryViewer] = useState(false);
    const [selectedStoryIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('profile');
    const [copied, setCopied] = useState(false);
    const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);

    // Demo profile data
    const profile = {
        username: 'thatch_demo',
        name: 'Thatch Demo',
        bio: '✨ Curate your journey with Thatch. Share your favorite spots, guide others, and tell your travel story.',
        image: '/thatch-logo.png',
        themeId: 'coral',
    };

    const links = [
        {
            id: '1',
            title: '🌍 Official Website',
            url: 'https://thatch.example.com',
            type: 'link',
            isVisible: true
        },
        {
            id: '2',
            title: '📸 Instagram',
            url: 'https://instagram.com/',
            type: 'social',
            isVisible: true
        },
        {
            id: '3',
            title: '🎬 Latest Video',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            type: 'video',
            isVisible: true,
            autoplay: false
        },
        {
            id: '4',
            title: '💼 LinkedIn',
            url: 'https://linkedin.com/',
            type: 'social',
            isVisible: true
        },
        {
            id: '5',
            title: '🐦 Twitter',
            url: 'https://twitter.com/',
            type: 'social',
            isVisible: true
        },
        {
            id: '6',
            title: 'Contact',
            url: 'mailto:contact@example.com',
            type: 'link',
            isVisible: true
        }
    ];

    const stories = [
        {
            id: '1',
            imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop',
            createdAt: new Date().toISOString()
        },
        {
            id: '3',
            imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop',
            createdAt: new Date().toISOString()
        },
    ];

    const places = [
        {
            id: '1',
            title: 'Hidden Beach Cove',
            description: 'A secluded paradise with crystal clear waters and white sand. Perfect for a morning swim.',
            imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
            locationLink: 'https://maps.google.com/?q=Hidden+Beach',
            rating: 5
        },
        {
            id: '2',
            title: 'Urban Coffee Roasters',
            description: 'The best artisanal coffee in the city. Great atmosphere for working or meeting friends.',
            imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=600&fit=crop',
            locationLink: 'https://maps.google.com/?q=Coffee+Shop',
            rating: 5
        },
        {
            id: '3',
            title: 'Mountain Viewpoint',
            description: 'Breathtaking panoramic views of the entire valley. Especially stunning at sunrise.',
            imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
            locationLink: 'https://maps.google.com/?q=Mountain+View',
            rating: 5
        },
    ];

    const themes = {
        coral: 'linear-gradient(135deg, #FFF9F7 0%, #FFF5F2 100%)', // Thatch Light Theme
    };

    const backgroundStyle = themes.coral;

    const getSocialIcon = (url: string) => {
        const lowerUrl = url.toLowerCase();
        if (lowerUrl.includes('instagram.com')) return '📸';
        if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return '🐦';
        if (lowerUrl.includes('linkedin.com')) return '💼';
        if (lowerUrl.includes('youtube.com')) return '🎬';
        if (lowerUrl.includes('tiktok.com')) return '🎵';
        if (lowerUrl.includes('facebook.com')) return '📘';
        return '🔗';
    };

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleShare = async () => {
        const url = `${window.location.origin}/demo`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className={styles.container} style={{ background: backgroundStyle }}>
            <div className={styles.content}>
                {/* Header with Demo Badge */}
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        background: 'linear-gradient(135deg, #FF6B4A 0%, #F96854 100%)',
                        color: '#FFFFFF',
                        borderRadius: '24px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 16px rgba(255, 107, 74, 0.3)'
                    }}>
                        ✨ Demo Profile
                    </span>
                </div>

                {/* Profile Section */}
                <div className={styles.profileSection}>
                    <div
                        className={`${styles.imageWrapper} ${stories.length > 0 ? styles.hasStories : ''}`}
                        onClick={() => {
                            if (stories.length > 0) {
                                setShowStoryViewer(true);
                            }
                        }}
                    >
                        <div className={styles.storyRingSvg}>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="storyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#f09433" />
                                        <stop offset="25%" stopColor="#e6683c" />
                                        <stop offset="50%" stopColor="#dc2743" />
                                        <stop offset="75%" stopColor="#cc2366" />
                                        <stop offset="100%" stopColor="#bc1888" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="48" fill="none" stroke="url(#storyGradient)" strokeWidth="3" />
                            </svg>
                        </div>
                        <Image
                            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&h=400&fit=crop"
                            alt="Thatch Demo"
                            width={120}
                            height={120}
                            className={styles.profileImage}
                        />
                    </div>
                    <h1 className={styles.name} style={{ fontFamily: 'var(--font-poppins), sans-serif', color: '#1A1A1A' }}>
                        {profile.name}
                    </h1>
                    <p className={styles.username}>@{profile.username}</p>
                    <p className={styles.bio} style={{ color: '#555' }}>{profile.bio}</p>

                    <button onClick={handleShare} className={styles.shareButton}>
                        {copied ? '✓ Copied!' : '🔗 Share Profile'}
                    </button>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'profile' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'places' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('places')}
                    >
                        Places
                    </button>
                </div>

                {/* Profile Tab - Links */}
                {activeTab === 'profile' && (
                    <div className={styles.linksSection}>
                        {links.map((link) => {
                            const youtubeId = link.type === 'video' ? getYouTubeId(link.url) : null;
                            const isExpanded = expandedVideoId === link.id;

                            return (
                                <div key={link.id}>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkCard}
                                        onClick={(e) => {
                                            if (youtubeId) {
                                                e.preventDefault();
                                                setExpandedVideoId(isExpanded ? null : link.id);
                                            }
                                        }}
                                    >
                                        <span className={styles.linkIcon}>{getSocialIcon(link.url)}</span>
                                        <span className={styles.linkTitle}>{link.title}</span>
                                        {youtubeId && <span className={styles.playIcon}>▶</span>}
                                    </a>

                                    {youtubeId && isExpanded && (
                                        <div className={styles.videoEmbed}>
                                            <iframe
                                                width="100%"
                                                height="315"
                                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${link.autoplay ? 1 : 0}`}
                                                title={link.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Places Tab */}
                {activeTab === 'places' && (
                    <div className={styles.placesSection}>
                        {places.map((place) => (
                            <div key={place.id} className={styles.placeCard}>
                                <div
                                    className={styles.placeImage}
                                    style={{ backgroundImage: `url(${place.imageUrl})` }}
                                />
                                <div className={styles.placeContent}>
                                    <h3 className={styles.placeTitle}>{place.title}</h3>
                                    <p className={styles.placeDescription}>{place.description}</p>
                                    <div className={styles.placeRating}>
                                        {'⭐'.repeat(place.rating)}
                                    </div>
                                    <a
                                        href={place.locationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.placeLink}
                                    >
                                        📍 View on Map →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Story Viewer */}
            {
                showStoryViewer && (
                    <StoryViewer
                        stories={stories}
                        initialIndex={selectedStoryIndex}
                        onClose={() => setShowStoryViewer(false)}
                    />
                )
            }
        </div >
    );
}
