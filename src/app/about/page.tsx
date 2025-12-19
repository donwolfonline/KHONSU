import Navbar from '@/components/Navbar';
import styles from '../page.module.css';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className={styles.main} style={{ paddingTop: '100px', minHeight: '100vh', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1A1A1A' }}>About Thatch</h1>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#555', marginBottom: '1rem' }}>
                        Thatch is the new generation of travel storytelling. We believe that every journey deserves to be shared beautifully.
                        Our mission is to empower travelers, guides, and creators to curate their recommendations and share them with the world through a single, stunning link.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#555' }}>
                        Born from a passion for exploration, Thatch makes it effortless to organize your favorite spots, guide others to hidden gems, and build your digital travel identity.
                    </p>
                </div>
            </main>
        </>
    );
}
