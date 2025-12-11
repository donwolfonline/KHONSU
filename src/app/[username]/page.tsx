"use client";

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import styles from './username.module.css';
import StoryViewer from '@/components/StoryViewer';

export default function UsernamePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = use(params);
    const [profile, setProfile] = useState<any>(null);
    const [links, setLinks] = useState<any[]>([]);
    const [stories, setStories] = useState<any[]>([]);
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showStoryViewer, setShowStoryViewer] = useState(false);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('profile');
    const [copied, setCopied] = useState(false);
    const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);

    // Effect to handle autoplay
    useEffect(() => {
        if (links.length > 0) {
            const autoplayLink = links.find((l: any) => l.autoplay && l.type === 'video'); // Or check URL if type isn't strict
            // fallback if type isn't set but it youtube
            const autoPlayGeneric = links.find((l: any) => l.autoplay && getYouTubeId(l.url));

            if (autoplayLink) {
                setExpandedVideoId(autoplayLink.id);
            } else if (autoPlayGeneric) {
                setExpandedVideoId(autoPlayGeneric.id);
            }
        }
    }, [links]);

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getSocialIcon = (url: string) => {
        const lowerUrl = url.toLowerCase();
        const iconStyle = { width: '20px', height: '20px', fill: 'currentColor' };

        if (lowerUrl.includes('instagram.com')) return (
            <svg viewBox="0 0 24 24" style={iconStyle}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        );
        if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return (
            <svg viewBox="0 0 24 24" style={iconStyle}>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
        );
        if (lowerUrl.includes('facebook.com')) return (
            <svg viewBox="0 0 24 24" style={iconStyle}>
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 2.87v1.12h3.074l-.467 3.667h-2.607v7.98H9.101Z" />
            </svg>
        );
        if (lowerUrl.includes('linkedin.com')) return (
            <svg viewBox="0 0 24 24" style={iconStyle}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        );
        if (lowerUrl.includes('tiktok.com')) return (
            <svg viewBox="0 0 24 24" style={iconStyle}>
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17.82-1.23 1.79-.04.65.19 1.37.66 1.83.63.61 1.76.53 2.38-.03.56-.51.81-1.27.8-2.01.02-4.47.01-8.94.01-13.41h-.03.03z" />
            </svg>
        );
        if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return (
            <svg viewBox="0 0 24 24" style={iconStyle}>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        );
        if (lowerUrl.includes('snapchat.com')) return (
            <svg viewBox="0 0 24 24" style={iconStyle}>
                <path d="M12.004 2c-3.791 0-7.143 2.458-7.904 6.74l-.16.924c-.105.556-.37 1.056-.714 1.48L2.09 12.63c-.158.196-.06.52.19.57l2.844.755c.105.027.202.09.28.175.76.84 2.14.864 2.298 2.062.03.22.13.432.25.62l.21.36c.264.45.696.81 1.205 1.01.12.05.215.15.25.27.17.585.5.95 2.195.95 1.64 0 2.016-.364 2.193-.95.034-.12.132-.22.25-.268.512-.2.943-.56 1.206-1.01.074-.127.14-.24.21-.36.12-.192.217-.4.248-.62.158-1.2 1.54-1.22 2.3-2.064.075-.083.172-.148.277-.174l2.846-.755c.25-.05.348-.375.19-.572l-1.134-1.486c-.347-.423-.612-.924-.716-1.48l-.16-.926C19.146 4.46 15.795 2 12.004 2z" />
            </svg>
        );
        if (lowerUrl.includes('github.com')) return (
            <svg viewBox="0 0 24 24" style={iconStyle}>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        );
        if (lowerUrl.includes('discord.com') || lowerUrl.includes('discord.gg')) return (
            <svg viewBox="0 0 24 24" style={iconStyle}>
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
            </svg>
        );
        return (
            <svg viewBox="0 0 24 24" style={iconStyle}>
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
            </svg>
        );
    };

    const handleShare = async () => {
        const shareData = {
            title: `${profile?.name || profile?.username}'s Profile on TravLink`,
            text: `Check out ${profile?.name || profile?.username}'s profile!`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    const themes = {
        pharaoh: 'linear-gradient(135deg, #0d0d0d 0%, #1a1614 50%, #0d0d0d 100%)',
        purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        pink: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        blue: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        dark: '#0a0a0a',
        sunrise: 'linear-gradient(135deg, #ff0844 0%, #ffb199 50%, #00d4ff 100%)',
        northern: 'linear-gradient(135deg, #00d4ff 0%, #667eea 50%, #a855f7 100%)',
        cherry: 'linear-gradient(135deg, #fff5e1 0%, #ffb199 50%, #ff85d4 100%)',
        tropical: 'linear-gradient(135deg, #66ffda 0%, #ff85d4 100%)',
        sunset: 'linear-gradient(135deg, #ff85d4 0%, #ffb199 100%)',
        galaxy: 'linear-gradient(135deg, #1e3a8a 0%, #6366f1 50%, #a855f7 100%)',
        forest: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
        fire: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
    };

    useEffect(() => {
        fetchData();
    }, [username]);

    const fetchData = async () => {
        try {
            // Fetch user  by username
            const userRes = await fetch(`/api/user/${username}`);

            if (!userRes.ok) {
                return notFound();
            }

            const userData = await userRes.json();
            const userId = userData.user.id;

            // Fetch user's content
            const [linksRes, storiesRes, placesRes] = await Promise.all([
                fetch(`/api/user/${username}/links`),
                fetch(`/api/user/${username}/stories`),
                fetch(`/api/user/${username}/places`),
            ]);

            setProfile(userData.user);

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
            console.error('Failed to fetch user data:', error);
            notFound();
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading...</p>
            </div>
        );
    }

    // Support custom background or theme gradient
    const backgroundStyle = profile?.themeId === 'custom' && profile?.customBackground
        ? `url(${profile.customBackground}) center/cover`
        : (themes[profile?.themeId as keyof typeof themes] || themes.pharaoh);

    // Get button shape
    const buttonShape = profile?.buttonShape || 'rounded';

    return (
        <div
            className={styles.container}
            style={{
                background: backgroundStyle,
                fontFamily: profile?.fontFamily || 'Inter',
                color: profile?.fontColor || '#ffffff'
            }}
        >
            <div className={styles.profileContainer}>
                <div
                    className={`${styles.profileImage} ${stories.length > 0 ? styles.hasStory : ''}`}
                    onClick={() => {
                        if (stories.length > 0) {
                            setSelectedStoryIndex(0);
                            setShowStoryViewer(true);
                        }
                    }}
                >
                    {profile?.image ? (
                        <div
                            className={styles.innerImage}
                            style={{
                                backgroundImage: `url(${profile.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%'
                            }}
                        />
                    ) : (
                        <span className={styles.placeholder}>📷</span>
                    )}
                </div>

                <h1 className={styles.name}>{profile?.name || profile?.username || 'User'}</h1>
            </div>

            {/* Bio */}
            {
                profile?.bio && (
                    <div className={styles.bio}>
                        <p>{profile.bio}</p>
                    </div>
                )
            }

            {/* Social Icons Row (Moved Here) */}
            {
                links.filter(l => l.type === 'social').length > 0 && (
                    <div className={styles.socialIconsRow}>
                        {links.filter(l => l.type === 'social').map(link => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIconLink}
                                title={link.title}
                            >
                                {getSocialIcon(link.url)}
                            </a>
                        ))}
                    </div>
                )
            }

            {/* Tab Navigation (Segmented Control) */}
            {
                places.length > 0 && (
                    <div className={styles.segmentedControl}>
                        <div
                            className={`${styles.activeIndicator} ${activeTab === 'places' ? styles.moveRight : ''}`}
                        />
                        <button
                            className={`${styles.controlItem} ${activeTab === 'profile' ? styles.active : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </button>
                        <button
                            className={`${styles.controlItem} ${activeTab === 'places' ? styles.active : ''}`}
                            onClick={() => setActiveTab('places')}
                        >
                            My Places
                        </button>
                    </div>
                )
            }

            {/* Share Button (Floating) */}
            <button className={styles.floatingShareBtn} onClick={handleShare}>
                <span className={styles.shareIcon}>📤</span>
                {copied ? 'Link Copied!' : 'Share'}
            </button>

            {/* Profile Tab */}
            {
                activeTab === 'profile' && (
                    <>


                        {/* Stories */}


                        {/* Regular Links (Non-Social) */}
                        <div className={styles.links}>
                            {links.filter(l => l.type !== 'social').map((link) => {
                                const youtubeId = getYouTubeId(link.url);
                                const isExpanded = expandedVideoId === link.id;

                                // Map buttonShape to CSS class
                                const shapeClass = buttonShape === 'pill' ? styles.btnPill
                                    : buttonShape === 'sharp' ? styles.btnSharp
                                        : buttonShape === 'soft' ? styles.btnSoft
                                            : styles.btnRounded;

                                return (
                                    <div key={link.id} className={`${styles.link} ${shapeClass}`}>
                                        <div className={styles.linkContentWrapper}>
                                            <div className={styles.linkMainRow}>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
                                                >
                                                    {link.type === 'video' && <span className={styles.videoIcon}>▶</span>}
                                                    {link.title}
                                                </a>

                                                {/* Preview Toggle for YouTube Links */}
                                                {(link.type === 'video' || (link.url && getYouTubeId(link.url))) && (
                                                    <button
                                                        className={styles.previewToggleBtn}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setExpandedVideoId(expandedVideoId === link.id ? null : link.id);
                                                        }}
                                                        title={expandedVideoId === link.id ? "Close Preview" : "Preview Video"}
                                                    >
                                                        {expandedVideoId === link.id ? "✕" : "▼"}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Video Preview Iframe */}
                                            {expandedVideoId === link.id && getYouTubeId(link.url) && (
                                                <div className={styles.videoPreviewContainer}>
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${getYouTubeId(link.url)}?autoplay=1&mute=${link.autoplay ? '1' : '0'}`}
                                                        title={link.title}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            {links.length === 0 && (
                                <p className={styles.emptyState}>No links added yet</p>
                            )}
                        </div>
                    </>
                )
            }

            {/* Places Tab */}
            {
                activeTab === 'places' && places.length > 0 && (
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
                                        <div className={styles.placeRating}>
                                            {'★'.repeat(place.rating || 5)}
                                            <span className={styles.ratingDim}>
                                                {'★'.repeat(5 - (place.rating || 5))}
                                            </span>
                                        </div>
                                        {place.description && <p className={styles.placeDescription}>{place.description}</p>}
                                        <span className={styles.viewLocationLink}>📍 View on Map</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )
            }

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
