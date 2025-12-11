import styles from './ProfileView.module.css';
import Image from 'next/image';

interface Link {
    id: string;
    title: string;
    url: string;
    type: 'custom' | 'social' | 'video';
}

interface ProfileProps {
    username: string;
    image: string;
    bio: string;
    links: Link[];
    theme?: string; // Placeholder for theme logic
}

export default function ProfileView({ username, image, bio, links }: ProfileProps) {
    return (
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                <div className={styles.imageWrapper}>
                    {/* Using a placeholder if no image provided, but for demo we will provide one */}
                    <img src={image} alt={username} className={styles.profileImage} />
                </div>
                <h1 className={styles.username}>@{username}</h1>
                <p className={styles.bio}>{bio}</p>
            </div>

            <div className={styles.links}>
                {links.map((link) => (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.linkCard} ${link.type === 'video' ? styles.videoLink : ''}`}
                    >
                        {link.type === 'video' && <span className={styles.videoIcon}>▶</span>}
                        <span className={styles.linkTitle}>{link.title}</span>
                    </a>
                ))}
            </div>

            <div className={styles.footer}>
                <p>Powered by <strong>TravLink</strong></p>
            </div>
        </div>
    );
}
