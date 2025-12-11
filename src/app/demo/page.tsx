"use client";

import { useState } from 'react';
import styles from './demo.module.css';
import StoryViewer from '@/components/StoryViewer';
import Image from 'next/image';

export default function DemoPage() {
    const [showStoryViewer, setShowStoryViewer] = useState(false);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('profile');
    const [copied, setCopied] = useState(false);
    const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);

    // Demo profile data
    const profile = {
        username: 'khonsu_demo',
        name: 'Khonsu Demo',
        bio: '🏛️ Explore the mystical Egyptian-themed Khonsu platform. One link for your digital universe under the moon\'s glow.',
        image: '/khonsu-logo.png',
        themeId: 'pharaoh',
    };

    const links = [
        {
            id: '1',
            title: '🌙 Official Website',
            url: 'https://khonsu.example.com',
            type: 'link',
            isVisible: true
        },
        {
            id: '2',
            title: '📸 Instagram',
            url: 'https://instagram.com/khonsu',
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
            url: 'https://linkedin.com/company/khonsu',
            type: 'social',
            isVisible: true
        },
        {
            id: '5',
            title: '🐦 Twitter',
            url: 'https://twitter.com/khonsu',
            type: 'social',
            isVisible: true
        },
    ];

    const stories = [
        {
            id: '1',
            imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400&h=600&fit=crop',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            imageUrl: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400&h=600&fit=crop',
            createdAt: new Date().toISOString()
        },
        {
            id: '3',
            imageUrl: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400&h=600&fit=crop',
            createdAt: new Date().toISOString()
        },
    ];

    const places = [
        {
            id: '1',
            title: 'Pyramids of Giza',
            description: 'Ancient wonders that stand as a testament to human ingenuity and the glory of pharaohs.',
            imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=600&fit=crop',
            locationLink: 'https://maps.google.com/?q=Pyramids+of+Giza',
            rating: 5
        },
        {
            id: '2',
            title: 'Luxor Temple',
            description: 'A magnificent temple complex on the east bank of the Nile, dedicated to the rejuvenation of kingship.',
            imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&h=600&fit=crop',
            locationLink: 'https://maps.google.com/?q=Luxor+Temple',
            rating: 5
        },
        {
            id: '3',
            title: 'Valley of the Kings',
            description: 'The burial ground of Egypt\'s most powerful pharaohs, including the famous tomb of Tutankhamun.',
            imageUrl: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&h=600&fit=crop',
            locationLink: 'https://maps.google.com/?q=Valley+of+the+Kings',
            rating: 5
        },
    ];

    const themes = {
        pharaoh: 'linear-gradient(135deg, #0d0d0d 0%, #1a1614 50%, #0d0d0d 100%)',
    };

    const backgroundStyle = themes.pharaoh;

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
                        background: 'linear-gradient(135deg, #d4af37 0%, #b8960f 100%)',
                        color: '#0d0d0d',
                        borderRadius: '24px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-cinzel), serif',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 16px rgba(212, 175, 55, 0.4)'
                    }}>
                        ✨ Demo Profile
                    </span>
                </div>

                {/* Profile Section */}
                <div className={styles.profileSection}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/khonsu-logo.png"
                            alt="Khonsu Demo"
                            width={120}
                            height={120}
                            className={styles.profileImage}
                            style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))' }}
                        />
                    </div>
                    <h1 className={styles.name} style={{ fontFamily: 'var(--font-cinzel), serif', color: '#d4af37' }}>
                        {profile.name}
                    </h1>
                    <p className={styles.username}>@{profile.username}</p>
                    <p className={styles.bio}>{profile.bio}</p>

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

                {/* Profile Tab - Links and Stories */}
                {activeTab === 'profile' && (
                    <>
                        {/* Stories */}
                        {stories.length > 0 && (
                            <div className={styles.storiesSection}>
                                <div className={styles.storiesGrid}>
                                    {stories.map((story, index) => (
                                        <div
                                            key={story.id}
                                            className={styles.storyCircle}
                                            style={{ backgroundImage: `url(${story.imageUrl})` }}
                                            onClick={() => {
                                                setSelectedStoryIndex(index);
                                                setShowStoryViewer(true);
                                            }}
                                        >
                                            <div className={styles.storyRing}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Links */}
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
                    </>
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
