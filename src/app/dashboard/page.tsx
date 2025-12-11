"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import styles from './dashboard.module.css';
import StoryViewer from '@/components/StoryViewer';

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const initialTab = searchParams.get('tab') || 'profile';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [previewTab, setPreviewTab] = useState('profile');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('pharaoh');
    const [links, setLinks] = useState<Array<{ id: string; title: string; url: string; type: string; isVisible?: boolean; autoplay?: boolean }>>([]);
    const [stories, setStories] = useState<Array<{ id: string; imageUrl: string; createdAt: string }>>([]);
    const [places, setPlaces] = useState<Array<{ id: string; title: string; description: string; imageUrl: string; locationLink: string; rating: number }>>([]);
    const [uploading, setUploading] = useState(false);
    const [showStoryViewer, setShowStoryViewer] = useState(false);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
    const [newPlaceData, setNewPlaceData] = useState<{ id?: string; title: string; description: string; locationLink: string; imageUrl: string; rating: number } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const placeFileInputRef = useRef<HTMLInputElement>(null);

    // Password change state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [changingPassword, setChangingPassword] = useState(false);

    // Sync URL when tab changes
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', tab);
        router.push(`${pathname}?${params.toString()}`);
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

    // Custom background state
    const [customBackground, setCustomBackground] = useState('');
    const customBgInputRef = useRef<HTMLInputElement>(null);

    // Font customization state
    const [fontColor, setFontColor] = useState('#ffffff');
    const [fontFamily, setFontFamily] = useState('Inter');
    const [buttonShape, setButtonShape] = useState('rounded');

    // New State for Collapsible Links
    const [expandedLinkIds, setExpandedLinkIds] = useState<Set<string>>(new Set());

    const toggleLinkExpansion = (id: string) => {
        const newExpanded = new Set(expandedLinkIds);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedLinkIds(newExpanded);
    };

    const themes = [
        {
            id: 'pharaoh',
            name: '👑 Pharaoh',
            gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1614 50%, #0d0d0d 100%)',
            textColor: '#f5f5dc',
            secondaryTextColor: 'rgba(245, 245, 220, 0.8)',
            accentColor: '#d4af37',
            borderColor: 'rgba(212, 175, 55, 0.3)',
            special: true // Flag to identify as special theme
        },
        {
            id: 'purple',
            name: 'Purple Gradient',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.8)'
        },
        {
            id: 'pink',
            name: 'Pink Sunset',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.8)'
        },
        {
            id: 'blue',
            name: 'Ocean Blue',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.8)'
        },
        {
            id: 'dark',
            name: 'Dark Mode',
            gradient: '#0a0a0a',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.7)'
        },
        {
            id: 'sunrise',
            name: 'Sunrise',
            gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 50%, #6bcfff 100%)',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.9)'
        },
        {
            id: 'northern',
            name: 'Northern Lights',
            gradient: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 50%, #b721ff 100%)',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.9)'
        },
        {
            id: 'cherry',
            name: 'Cherry Blossom',
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.9)'
        },
        {
            id: 'tropical',
            name: 'Tropical',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            textColor: '#1a1a1a',
            secondaryTextColor: 'rgba(26, 26, 26, 0.8)'
        },
        {
            id: 'beach',
            name: 'Sunset Beach',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.9)'
        },
        {
            id: 'galaxy',
            name: 'Galaxy',
            gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 50%, #9b59b6 100%)',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.9)'
        },
        {
            id: 'forest',
            name: 'Forest',
            gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.9)'
        },
        {
            id: 'fire',
            name: 'Fire',
            gradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
            textColor: '#ffffff',
            secondaryTextColor: 'rgba(255, 255, 255, 0.9)'
        },
    ];

    // Load user data
    useEffect(() => {
        fetchProfile();
        fetchLinks();
        fetchStories();
        fetchPlaces();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch('/api/profile', { cache: 'no-store' });
            if (res.status === 401) {
                router.push('/login');
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setName(data.user.name || '');
                setUsername(data.user.username || '');
                setBio(data.user.bio || '');
                setImage(data.user.image || '');
                setSelectedTheme(data.user.themeId || 'purple');
                setCustomBackground(data.user.customBackground || '');
                setFontColor(data.user.fontColor || '#ffffff');
                setFontFamily(data.user.fontFamily || 'Inter');
                setButtonShape(data.user.buttonShape || 'rounded');
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };

    const fetchLinks = async () => {
        try {
            const linksRes = await fetch('/api/links');
            if (linksRes.status === 401) return; // Handled by fetchProfile
            if (linksRes.ok) {
                const data = await linksRes.json();
                setLinks(data.links);
                // Auto-expand if only one link or new user
                if (data.links.length === 1) {
                    setExpandedLinkIds(new Set([data.links[0].id]));
                }
            }
        } catch (error) {
            console.error('Failed to fetch links:', error);
        }
    };

    const fetchStories = async () => {
        try {
            const res = await fetch('/api/stories');
            if (res.status === 401) return; // Handled by fetchProfile
            if (res.ok) {
                const data = await res.json();
                setStories(data.stories);
            }
        } catch (error) {
            console.error('Failed to fetch stories:', error);
        }
    };

    const saveProfile = async () => {
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, bio, image: image, themeId: selectedTheme, customBackground, fontColor, fontFamily, buttonShape }),
            });

            if (res.ok) {
                alert('Profile saved successfully!');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to save profile');
            }
        } catch (error) {
            console.error('Failed to save profile:', error);
        }
    };

    const fetchPlaces = async () => {
        try {
            const res = await fetch('/api/places');
            if (res.status === 401) return; // Handled by fetchProfile
            if (res.ok) {
                const data = await res.json();
                setPlaces(data.places);
            }
        } catch (error) {
            console.error('Failed to fetch places:', error);
        }
    };

    const addPlace = async () => {
        if (!placeFileInputRef.current) return;
        placeFileInputRef.current.click();
    };

    const handlePlaceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (uploadRes.ok) {
                const { url } = await uploadRes.json();
                // Set the image URL and show the form
                setNewPlaceData({ title: '', description: '', locationLink: '', imageUrl: url, rating: 5 });
            }
        } catch (error) {
            console.error('Failed to upload image:', error);
        } finally {
            setUploading(false);
        }
    };

    const editPlace = (place: any) => {
        setNewPlaceData({
            id: place.id,
            title: place.title,
            description: place.description || '',
            locationLink: place.locationLink,
            imageUrl: place.imageUrl,
            rating: place.rating || 5
        });
    };

    const saveNewPlace = async () => {
        if (!newPlaceData || !newPlaceData.title || !newPlaceData.locationLink || !newPlaceData.imageUrl) {
            alert('Title, location link, and image are required!');
            return;
        }

        setUploading(true);
        try {
            const method = newPlaceData.id ? 'PUT' : 'POST';
            const body = {
                ...(newPlaceData.id && { id: newPlaceData.id }),
                title: newPlaceData.title,
                description: newPlaceData.description,
                locationLink: newPlaceData.locationLink,
                imageUrl: newPlaceData.imageUrl,
                rating: newPlaceData.rating
            };

            const res = await fetch('/api/places', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                // Refresh places
                const placesRes = await fetch('/api/places');
                const data = await placesRes.json();
                setPlaces(data.places);
                setNewPlaceData(null);
            } else {
                const errorData = await res.json();
                alert(errorData.error || 'Failed to save place');
            }
        } catch (error) {
            console.error('Failed to save place:', error);
        } finally {
            setUploading(false);
        }
    };

    const cancelNewPlace = () => {
        setNewPlaceData(null);
    };

    const removePlace = async (id: string) => {
        try {
            const res = await fetch(`/api/places?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setPlaces(places.filter(place => place.id !== id));
            }
        } catch (error) {
            console.error('Failed to remove place:', error);
        }
    };

    const selectTheme = async (themeId: string) => {
        setSelectedTheme(themeId);

        // Clear custom background when selecting a preset theme
        if (themeId !== 'custom') {
            setCustomBackground('');
        }

        // Auto-save theme selection
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ themeId, customBackground: themeId === 'custom' ? customBackground : '' }),
            });

            if (res.ok) {
                console.log('Theme saved successfully:', themeId);
            } else {
                console.error('Failed to save theme - HTTP status:', res.status);
                const errorData = await res.json();
                console.error('Error details:', errorData);
            }
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    const handleCustomBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setCustomBackground(data.url);
                setSelectedTheme('custom');

                // Auto-save custom background
                await fetch('/api/profile', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ customBackground: data.url, themeId: 'custom' }),
                });
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setImage(data.url);

                // Auto-save to profile
                await fetch('/api/profile', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: data.url }),
                });
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    const addLink = async () => {
        // Optimistic update
        const tempId = Date.now().toString();
        const newLink = { id: tempId, title: '', url: '', type: 'custom', isVisible: true };
        setLinks([...links, newLink]);

        // Auto-expand the new link
        const newExpanded = new Set(expandedLinkIds);
        newExpanded.add(tempId);
        setExpandedLinkIds(newExpanded);

        try {
            const res = await fetch('/api/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLink),
            });
            if (res.ok) {
                const data = await res.json();
                setLinks([...links, data.link]);
            }
        } catch (error) {
            console.error('Failed to add link:', error);
        }
    };

    const removeLink = async (id: string) => {
        try {
            const res = await fetch(`/api/links?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setLinks(links.filter(link => link.id !== id));
            }
        } catch (error) {
            console.error('Failed to remove link:', error);
        }
    };

    const updateLink = async (id: string, field: string, value: string) => {
        setLinks(links.map(link =>
            link.id === id ? { ...link, [field]: value } : link
        ));

        try {
            await fetch('/api/links', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, [field]: value }),
            });
        } catch (error) {
            console.error('Failed to update link:', error);
        }
    };

    const addStory = async () => {
        if (!fileInputRef.current) return;
        fileInputRef.current.click();
    };

    const handleStoryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (uploadRes.ok) {
                const uploadData = await uploadRes.json();

                const storyRes = await fetch('/api/stories', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageUrl: uploadData.url }),
                });

                if (storyRes.ok) {
                    const data = await storyRes.json();
                    setStories([data.story, ...stories]);
                }
            }
        } catch (error) {
            console.error('Failed to add story:', error);
        } finally {
            setUploading(false);
        }
    };

    const removeStory = async (id: string) => {
        try {
            const res = await fetch(`/api/stories?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setStories(stories.filter(story => story.id !== id));
            }
        } catch (error) {
            console.error('Failed to remove story:', error);
        }
    };

    const handlePasswordChange = async () => {
        setPasswordMessage(null);

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'All fields are required' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
            return;
        }

        setChangingPassword(true);

        try {
            const res = await fetch('/api/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setPasswordMessage({ type: 'error', text: data.error || 'Failed to change password' });
            }
        } catch (error) {
            console.error('Failed to change password:', error);
            setPasswordMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setChangingPassword(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className={styles.container}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleStoryUpload}
                style={{ display: 'none' }}
            />
            <input
                ref={placeFileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePlaceImageUpload}
                style={{ display: 'none' }}
            />

            {/* Header */}
            <div className={styles.header}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/khonsu-logo.png"
                                alt="Khonsu Logo"
                                width={45}
                                height={45}
                                style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 12px rgba(212, 175, 55, 0.8))', marginRight: '0.5rem' }}
                            />
                            <span style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.15em', color: '#d4af37', textShadow: '0 0 15px rgba(212, 175, 55, 0.5)' }}>KHONSU</span>
                        </Link>
                        <div className={styles.headerActions}>
                            <Link href={`/${username || 'preview'}`} target="_blank" className="btn btn-secondary">
                                Preview
                            </Link>
                            <button className="btn btn-primary" onClick={saveProfile} disabled={uploading}>
                                {uploading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button className="btn btn-secondary" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`container ${styles.mainContent}`}>
                <div className={styles.grid}>
                    {/* Editor Sidebar */}
                    <div className={styles.editorPanel}>
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${activeTab === 'profile' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('profile')}
                            >
                                <span className={styles.tabIcon}>👤</span>
                                <span className={styles.tabLabel}>Profile</span>
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'links' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('links')}
                            >
                                <span className={styles.tabIcon}>🔗</span>
                                <span className={styles.tabLabel}>Links</span>
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'stories' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('stories')}
                            >
                                <span className={styles.tabIcon}>📸</span>
                                <span className={styles.tabLabel}>Stories</span>
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'places' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('places')}
                            >
                                <span className={styles.tabIcon}>🌍</span>
                                <span className={styles.tabLabel}>Places</span>
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'appearance' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('appearance')}
                            >
                                <span className={styles.tabIcon}>🎨</span>
                                <span className={styles.tabLabel}>Appearance</span>
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'settings' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('settings')}
                            >
                                <span className={styles.tabIcon}>⚙️</span>
                                <span className={styles.tabLabel}>Settings</span>
                            </button>
                        </div>

                        <div className={styles.tabContent}>
                            {activeTab === 'profile' && (
                                <div className={styles.section}>
                                    <h2>Profile Settings</h2>

                                    <div className={styles.formGroup}>
                                        <label>Profile Image</label>
                                        <div className={styles.imageUpload}>
                                            <div
                                                className={styles.imagePlaceholder}
                                                style={image ? {
                                                    backgroundImage: `url(${image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                } : {}}
                                            >
                                                {!image && <span>📷</span>}
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                                id="profile-upload"
                                            />
                                            <button
                                                className="btn btn-secondary"
                                                style={{ marginTop: '1rem' }}
                                                onClick={() => document.getElementById('profile-upload')?.click()}
                                                disabled={uploading}
                                            >
                                                {uploading ? 'Uploading...' : 'Upload Image'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Display Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Username</label>
                                        <div className={styles.usernameField}>
                                            <span className={styles.urlPrefix}>travlink.com/</span>
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                                                placeholder="username"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Bio</label>
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder="Tell people about yourself"
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'links' && (
                                <div className={styles.section}>
                                    <div className={styles.sectionHeader}>
                                        <h2>Your Links</h2>
                                        <button className="btn btn-primary" onClick={addLink}>
                                            + Add Link
                                        </button>
                                    </div>

                                    <div className={styles.linksList}>
                                        <div className={styles.linksList}>
                                            {links.map((link, index) => {
                                                const isExpanded = expandedLinkIds.has(link.id);
                                                return (
                                                    <div key={link.id} className={styles.linkCard}>
                                                        {/* Card Header (Always Visible) */}
                                                        <div
                                                            className={styles.linkCardHeader}
                                                            onClick={() => toggleLinkExpansion(link.id)}
                                                        >
                                                            <div className={styles.dragHandle}>☰</div>
                                                            <div className={styles.linkSummary}>
                                                                <span className={styles.summaryTitle}>
                                                                    {link.title || 'Untitled Link'}
                                                                </span>
                                                                <span className={styles.summaryUrl}>
                                                                    {link.url || 'No URL set'}
                                                                </span>
                                                            </div>
                                                            <div className={styles.cardActions}>
                                                                <button
                                                                    className={styles.iconBtn}
                                                                    title={isExpanded ? "Collapse" : "Edit"}
                                                                >
                                                                    {isExpanded ? '▲' : '✏️'}
                                                                </button>
                                                                <button
                                                                    className={`${styles.iconBtn} ${styles.deleteBtn}`}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeLink(link.id);
                                                                    }}
                                                                    title="Delete Link"
                                                                >
                                                                    🗑️
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Card Body (Collapsible) */}
                                                        {isExpanded && (
                                                            <div className={styles.linkCardBody}>
                                                                <div className={styles.formGroup}>
                                                                    <label>Title</label>
                                                                    <input
                                                                        type="text"
                                                                        value={link.title}
                                                                        onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                                                                        placeholder="e.g., My Portfolio"
                                                                        autoFocus
                                                                    />
                                                                </div>

                                                                <div className={styles.formGroup}>
                                                                    <label>URL</label>
                                                                    <input
                                                                        type="url"
                                                                        value={link.url}
                                                                        onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                                                        placeholder="https://"
                                                                    />
                                                                </div>

                                                                <div className={styles.formGroup}>
                                                                    <label>Type</label>
                                                                    <select
                                                                        value={link.type}
                                                                        onChange={(e) => updateLink(link.id, 'type', e.target.value)}
                                                                    >
                                                                        <option value="custom">Custom Link</option>
                                                                        <option value="social">Social Media</option>
                                                                        <option value="video">Video</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'stories' && (
                                <div className={styles.section}>
                                    <div className={styles.sectionHeader}>
                                        <div>
                                            <h2>Stories</h2>
                                            <p className={styles.helperText}>Share moments that disappear after 24 hours</p>
                                        </div>
                                        <button
                                            className="btn btn-primary"
                                            onClick={addStory}
                                            disabled={uploading}
                                        >
                                            {uploading ? 'Uploading...' : '+ Add Story'}
                                        </button>
                                    </div>

                                    {stories.length === 0 ? (
                                        <div className={styles.emptyStoriesState}>
                                            <div className={styles.emptyIcon}>📸</div>
                                            <h3>No Stories Yet</h3>
                                            <p>Add your first story to share with your audience</p>
                                        </div>
                                    ) : (
                                        <div className={styles.storiesGrid}>
                                            {stories.map((story) => (
                                                <div key={story.id} className={styles.storyCard}>
                                                    <div
                                                        className={styles.storyImage}
                                                        style={{ backgroundImage: `url(${story.imageUrl})` }}
                                                    >
                                                        <button
                                                            className={styles.removeStoryBtn}
                                                            onClick={() => removeStory(story.id)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                    <div className={styles.storyTime}>
                                                        {new Date(story.createdAt).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'places' && (
                                <div className={styles.section}>
                                    <div className={styles.sectionHeader}>
                                        <div>
                                            <h2>Favorite Places</h2>
                                            <p className={styles.helperText}>Share your favorite travel destinations</p>
                                        </div>
                                        <button
                                            className="btn btn-primary"
                                            onClick={addPlace}
                                            disabled={uploading}
                                        >
                                            {uploading ? 'Uploading...' : '+ Add Place'}
                                        </button>
                                    </div>

                                    {newPlaceData && (
                                        <div className={styles.newPlaceForm}>
                                            <div className={styles.newPlacePreview}>
                                                <img src={newPlaceData.imageUrl} alt="Preview" />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Title *</label>
                                                <input
                                                    type="text"
                                                    value={newPlaceData.title}
                                                    onChange={(e) => setNewPlaceData({ ...newPlaceData, title: e.target.value })}
                                                    placeholder="e.g., Tokyo Tower"
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Rating</label>
                                                <div className={styles.starRatingInput}>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            className={`${styles.starBtn} ${(newPlaceData.rating || 5) >= star ? styles.active : ''}`}
                                                            onClick={() => setNewPlaceData({ ...newPlaceData, rating: star })}
                                                        >
                                                            ★
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Description</label>
                                                <textarea
                                                    value={newPlaceData.description}
                                                    onChange={(e) => setNewPlaceData({ ...newPlaceData, description: e.target.value })}
                                                    placeholder="Share what makes this place special..."
                                                    rows={3}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Location Link *</label>
                                                <input
                                                    type="url"
                                                    value={newPlaceData.locationLink}
                                                    onChange={(e) => setNewPlaceData({ ...newPlaceData, locationLink: e.target.value })}
                                                    placeholder="https://maps.google.com/..."
                                                />
                                            </div>
                                            <div className={styles.formActions}>
                                                <button className="btn btn-secondary" onClick={cancelNewPlace}>
                                                    Cancel
                                                </button>
                                                <button className="btn btn-primary" onClick={saveNewPlace}>
                                                    Save Place
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {places.length === 0 && !newPlaceData ? (
                                        <div className={styles.emptyStoriesState}>
                                            <div className={styles.emptyIcon}>🌍</div>
                                            <h3>No Places Yet</h3>
                                            <p>Add your first favorite place to share with your audience</p>
                                        </div>
                                    ) : (
                                        <div className={styles.placesGrid}>
                                            {places.map((place) => (
                                                <div key={place.id} className={styles.placeCard}>
                                                    <div
                                                        className={styles.placeImage}
                                                        style={{ backgroundImage: `url(${place.imageUrl})` }}
                                                    >
                                                        <div className={styles.placeActions}>
                                                            <button
                                                                className={styles.editPlaceBtn}
                                                                onClick={() => editPlace(place)}
                                                                title="Edit Place"
                                                            >
                                                                ✎
                                                            </button>
                                                            <button
                                                                className={styles.removePlaceBtn}
                                                                onClick={() => removePlace(place.id)}
                                                                title="Delete Place"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className={styles.placeCardContent}>
                                                        <div className={styles.placeHeaderRow}>
                                                            <h3 className={styles.placeTitle}>{place.title}</h3>
                                                            <div className={styles.placeRating}>
                                                                {'★'.repeat(place.rating || 5)}
                                                                <span className={styles.ratingDim}>
                                                                    {'★'.repeat(5 - (place.rating || 5))}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {place.description && (
                                                            <p className={styles.placeDescription}>{place.description}</p>
                                                        )}
                                                        <a
                                                            href={place.locationLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={styles.placeLink}
                                                        >
                                                            📍 View Location
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'appearance' && (
                                <div className={styles.section}>
                                    {/* Theme Selection - Palette Style */}
                                    <div className={styles.appearanceSection}>
                                        <div className={styles.sectionHeader}>
                                            <div>
                                                <h2>🎨 Choose Your Theme</h2>
                                                <p className={styles.helperText}>Pick a "plate" style for your background</p>
                                            </div>
                                            <div className={styles.themeQuickStats}>
                                                <span className={styles.quickStatBadge}>{themes.length} Styles</span>
                                            </div>
                                        </div>

                                        <div className={styles.paletteGrid}>
                                            {themes.map((theme) => (
                                                <div key={theme.id} style={{ position: 'relative' }}>
                                                    <button
                                                        className={`${styles.colorPlate} ${selectedTheme === theme.id ? styles.plateActive : ''}`}
                                                        style={{ background: theme.gradient }}
                                                        onClick={() => selectTheme(theme.id)}
                                                        aria-label={theme.name}
                                                    >
                                                        <span className={styles.plateCheck}>✓</span>
                                                        <span className={styles.plateLabel}>{theme.name}</span>
                                                    </button>
                                                </div>
                                            ))}

                                            {/* Custom Background Plate */}
                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    className={`${styles.colorPlate} ${selectedTheme === 'custom' ? styles.plateActive : ''}`}
                                                    style={{
                                                        background: customBackground
                                                            ? `url(${customBackground}) center/cover`
                                                            : 'linear-gradient(45deg, #333, #666)',
                                                        border: selectedTheme === 'custom' ? '2px solid white' : '2px dashed rgba(255,255,255,0.3)'
                                                    }}
                                                    onClick={() => customBgInputRef.current?.click()}
                                                    aria-label="Custom Background"
                                                >
                                                    <span className={styles.plateCheck}>✓</span>
                                                    <span className={styles.plateLabel}>Custom</span>
                                                </button>
                                            </div>
                                        </div>

                                        <input
                                            ref={customBgInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCustomBackgroundUpload}
                                            style={{ display: 'none' }}
                                        />

                                        {customBackground && (
                                            <div className={styles.successMessage}>
                                                <span>✓</span>
                                                <p>Custom background uploaded!</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Font Customization - Cool UI */}
                                    <div className={styles.fontSection} style={{ marginTop: '2rem' }}>

                                        {/* Font Family - Pills */}
                                        <h3 className={styles.sectionTitle}>🔤 Font Style</h3>
                                        <div className={styles.fontGroup}>
                                            {['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Playfair Display', 'Lora'].map(font => (
                                                <button
                                                    key={font}
                                                    className={`${styles.fontPill} ${fontFamily === font ? styles.pillActive : ''}`}
                                                    style={{ fontFamily: font }}
                                                    onClick={() => setFontFamily(font)}
                                                >
                                                    {font}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Font Color - Swatches */}
                                        <h3 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>🎨 Text Color</h3>
                                        <div className={styles.swatchGrid}>
                                            {['#ffffff', '#000000', '#f8fafc', '#9ca3af', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'].map(color => (
                                                <button
                                                    key={color}
                                                    className={`${styles.colorSwatch} ${fontColor === color ? styles.swatchActive : ''}`}
                                                    style={{ background: color }}
                                                    onClick={() => setFontColor(color)}
                                                    aria-label={`Select color ${color}`}
                                                />
                                            ))}

                                            {/* Custom Color Button */}
                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    className={styles.customColorBtn}
                                                    onClick={() => document.getElementById('customColorInput')?.click()}
                                                    title="Custom Color"
                                                >
                                                    🌈
                                                </button>
                                                <input
                                                    id="customColorInput"
                                                    type="color"
                                                    value={fontColor}
                                                    onChange={(e) => setFontColor(e.target.value)}
                                                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0, bottom: 0, left: 0 }}
                                                />
                                            </div>
                                        </div>

                                        {/* Live Preview Card */}
                                        <div className={styles.fontPreviewCard}>
                                            <h4 className={styles.previewTitle}>Preview</h4>
                                            <div
                                                className={styles.fontPreviewText}
                                                style={{
                                                    fontFamily: fontFamily,
                                                    color: fontColor
                                                }}
                                            >
                                                <p className={styles.previewName}>Your Name</p>
                                                <p className={styles.previewBioText}>This is how your bio text will look with the selected font and color.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Button Shapes */}
                                    <div className={styles.appearanceSection} style={{ marginTop: '2rem' }}>
                                        <div>
                                            <h2>🔘 Button Shapes</h2>
                                            <p className={styles.helperText}>Choose how your link buttons look</p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                                            {[
                                                { id: 'rounded', name: 'Rounded', radius: '16px' },
                                                { id: 'pill', name: 'Pill', radius: '50px' },
                                                { id: 'sharp', name: 'Sharp', radius: '0px' },
                                                { id: 'soft', name: 'Soft', radius: '8px' },
                                            ].map((shape) => (
                                                <button
                                                    key={shape.id}
                                                    onClick={() => setButtonShape(shape.id)}
                                                    style={{
                                                        padding: '0.875rem 1.5rem',
                                                        borderRadius: shape.radius,
                                                        background: buttonShape === shape.id
                                                            ? 'linear-gradient(135deg, #d4af37 0%, #b8960f 100%)'
                                                            : 'rgba(26, 22, 20, 0.6)',
                                                        border: buttonShape === shape.id
                                                            ? '2px solid #d4af37'
                                                            : '2px solid rgba(212, 175, 55, 0.3)',
                                                        color: buttonShape === shape.id ? '#0d0d0d' : '#f5f5dc',
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s',
                                                        fontSize: '0.9rem',
                                                        fontFamily: 'var(--font-cinzel), serif',
                                                        letterSpacing: '0.05em',
                                                        textTransform: 'uppercase'
                                                    }}
                                                >
                                                    {shape.name}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Preview */}
                                        <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(26, 22, 20, 0.4)', borderRadius: '12px', border: '2px solid rgba(212, 175, 55, 0.2)' }}>
                                            <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#d4af37', fontFamily: 'var(--font-cinzel), serif' }}>Preview</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                <div style={{
                                                    padding: '1rem 1.5rem',
                                                    borderRadius: buttonShape === 'rounded' ? '16px' : buttonShape === 'pill' ? '50px' : buttonShape === 'sharp' ? '0px' : '8px',
                                                    background: 'rgba(26, 22, 20, 0.6)',
                                                    border: '2px solid rgba(212, 175, 55, 0.4)',
                                                    color: '#f5f5dc',
                                                    textAlign: 'center',
                                                    fontWeight: 600
                                                }}>
                                                    Sample Link Button
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        {activeTab === 'settings' && (
                            <div className={styles.section}>
                                <h2>Account Settings</h2>

                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        defaultValue="test_ui@example.com"
                                        disabled
                                    />
                                    <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                                        To change your username, go to the Profile tab
                                    </p>
                                </div>

                                <div className={styles.formGroup} style={{ marginTop: '2rem' }}>
                                    <h3 style={{ marginBottom: '1rem' }}>Change Password</h3>

                                    {passwordMessage && (
                                        <div style={{
                                            padding: '0.75rem',
                                            marginBottom: '1rem',
                                            borderRadius: '8px',
                                            backgroundColor: passwordMessage.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            border: `1px solid ${passwordMessage.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                                            color: passwordMessage.type === 'success' ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
                                        }}>
                                            {passwordMessage.text}
                                        </div>
                                    )}

                                    <div className={styles.formGroup}>
                                        <label>Current Password</label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter current password"
                                            disabled={changingPassword}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password (min. 6 characters)"
                                            disabled={changingPassword}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm new password"
                                            disabled={changingPassword}
                                        />
                                    </div>

                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePasswordChange}
                                        disabled={changingPassword}
                                        style={{ marginTop: '1rem' }}
                                    >
                                        {changingPassword ? 'Changing Password...' : 'Change Password'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Live Preview */}
                    <div className={styles.previewPanel}>
                        <div className={styles.previewHeader}>
                            <h3>Live Preview</h3>
                        </div>
                        <div className={styles.previewContent}>
                            <div className={styles.phoneFrame}>
                                <div
                                    className={styles.phoneScreen}
                                    style={{
                                        background: selectedTheme === 'custom' && customBackground
                                            ? `url(${customBackground}) center/cover`
                                            : (themes.find(t => t.id === selectedTheme)?.gradient || themes[0].gradient)
                                    }}
                                >
                                    <div
                                        className={styles.profilePreview}
                                        style={{
                                            fontFamily: fontFamily,
                                            color: fontColor,
                                        }}
                                    >
                                        <div
                                            className={`${styles.previewImage} ${stories.length > 0 ? styles.hasStory : ''}`}
                                        >
                                            <div
                                                className={styles.innerImage}
                                                style={image ? {
                                                    backgroundImage: `url(${image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%'
                                                } : {
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {!image && <span>📷</span>}
                                            </div>
                                        </div>

                                        {/* Mock Share Button for Preview */}
                                        <div className={styles.floatingShareBtn}>
                                            <span>📤</span> Share
                                        </div>
                                        <h3
                                            className={styles.previewName}
                                        >
                                            {name || 'Your Name'}
                                        </h3>
                                        <p
                                            className={styles.previewBio}
                                            style={{ color: themes.find(t => t.id === selectedTheme)?.secondaryTextColor }}
                                        >
                                            {bio || 'Your bio will appear here'}
                                        </p>

                                        {/* Social Icons Row (Moved Here) */}
                                        {links.filter(l => l.type === 'social').length > 0 && (
                                            <div className={styles.socialIconsRow}>
                                                {links.filter(l => l.type === 'social').map(link => (
                                                    <div
                                                        key={link.id}
                                                        className={styles.socialIconLink}
                                                        title={link.title}
                                                    >
                                                        {getSocialIcon(link.url)}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Preview Tabs */}
                                        {/* Preview Tabs (Segmented Control) */}
                                        {places.length > 0 && (
                                            <div className={styles.segmentedControl}>
                                                <div
                                                    className={`${styles.activeIndicator} ${previewTab === 'places' ? styles.moveRight : ''}`}
                                                />
                                                <button
                                                    className={`${styles.controlItem} ${previewTab === 'profile' ? styles.active : ''}`}
                                                    onClick={() => setPreviewTab('profile')}
                                                >
                                                    Profile
                                                </button>
                                                <button
                                                    className={`${styles.controlItem} ${previewTab === 'places' ? styles.active : ''}`}
                                                    onClick={() => setPreviewTab('places')}
                                                >
                                                    My Places
                                                </button>
                                            </div>
                                        )}

                                        {/* Profile Tab Content */}
                                        {previewTab === 'profile' && (
                                            <>




                                                <div className={styles.previewLinks}>
                                                    {links.filter(l => l.title && l.url && l.type !== 'social').map((link) => {
                                                        // Map buttonShape to CSS class
                                                        const shapeClass = buttonShape === 'pill' ? styles.btnPill
                                                            : buttonShape === 'sharp' ? styles.btnSharp
                                                                : buttonShape === 'soft' ? styles.btnSoft
                                                                    : styles.btnRounded;

                                                        return (
                                                            <div key={link.id} className={`${styles.previewLink} ${shapeClass}`}>
                                                                {link.type === 'video' && <span className={styles.videoIcon}>▶</span>}
                                                                {link.title}
                                                            </div>
                                                        )
                                                    })}
                                                    {links.length === 0 && (
                                                        <p
                                                            className={styles.emptyState}
                                                            style={{ color: themes.find(t => t.id === selectedTheme)?.secondaryTextColor }}
                                                        >
                                                            Your links will appear here
                                                        </p>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {/* Places Tab Content */}
                                        {previewTab === 'places' && places.length > 0 && (
                                            <div className={styles.previewPlaces}>
                                                <h4 style={{ color: themes.find(t => t.id === selectedTheme)?.textColor }}>My Places</h4>
                                                <div className={styles.previewPlacesGrid}>
                                                    {places.map((place) => (
                                                        <div key={place.id} className={styles.previewPlaceCard}>
                                                            <div
                                                                className={styles.previewPlaceImage}
                                                                style={{ backgroundImage: `url(${place.imageUrl})` }}
                                                            />
                                                            <p style={{ color: themes.find(t => t.id === selectedTheme)?.textColor }}>
                                                                {place.title}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    showStoryViewer && (
                        <StoryViewer
                            stories={stories}
                            initialIndex={selectedStoryIndex}
                            onClose={() => setShowStoryViewer(false)}
                        />
                    )
                }
            </div>
        </div>
    );
}
