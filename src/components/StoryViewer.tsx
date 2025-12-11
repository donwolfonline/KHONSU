"use client";

import { useEffect, useState, useCallback } from 'react';
import styles from './StoryViewer.module.css';

interface Story {
    id: string;
    imageUrl: string;
    createdAt: string;
}

interface StoryViewerProps {
    stories: Story[];
    initialIndex: number;
    onClose: () => void;
}

export default function StoryViewer({ stories, initialIndex, onClose }: StoryViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goToNext = useCallback(() => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setProgress(0);
        } else {
            // Defer onClose to avoid setState-during-render error
            setTimeout(() => onClose(), 0);
        }
    }, [currentIndex, stories.length, onClose]);

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setProgress(0);
        }
    };

    // Auto-advance timer (5 seconds per story)
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    goToNext();
                    return 0;
                }
                return prev + 2; // 2% every 100ms = 5 seconds total
            });
        }, 100);

        return () => clearInterval(interval);
    }, [currentIndex, isPaused, goToNext]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, onClose, goToNext]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const middleX = rect.width / 2;

        if (clickX < middleX) {
            goToPrevious();
        } else {
            goToNext();
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className={styles.closeBtn} onClick={onClose}>
                    ✕
                </button>

                {/* Progress Bars */}
                <div className={styles.progressBars}>
                    {stories.map((_, index) => (
                        <div key={index} className={styles.progressBarContainer}>
                            <div
                                className={styles.progressBar}
                                style={{
                                    width: index < currentIndex
                                        ? '100%'
                                        : index === currentIndex
                                            ? `${progress}%`
                                            : '0%'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Story Content */}
                <div
                    className={styles.storyContent}
                    onClick={handleClick}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <img
                        src={stories[currentIndex].imageUrl}
                        alt="Story"
                        className={styles.storyImage}
                    />
                </div>

                {/* Navigation Hints */}
                <div className={styles.navHints}>
                    {currentIndex > 0 && (
                        <div className={styles.navLeft} onClick={goToPrevious}>
                            ←
                        </div>
                    )}
                    {currentIndex < stories.length - 1 && (
                        <div className={styles.navRight} onClick={goToNext}>
                            →
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
