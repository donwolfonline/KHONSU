import Navbar from '@/components/Navbar';
import styles from '../page.module.css';

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <main className={styles.main} style={{ paddingTop: '100px', minHeight: '100vh', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A1A1A' }}>Thatch Blog</h1>
                    <p style={{ color: '#666', marginBottom: '3rem' }}>Latest news, travel tips, and updates from the Thatch team.</p>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <article style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '16px' }}>
                            <span style={{ color: '#FF6B4A', fontWeight: 600, fontSize: '0.9rem' }}>Product Update</span>
                            <h2 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>Introducing Thatch: A New Era for Travel Creators</h2>
                            <p style={{ color: '#555', lineHeight: '1.6' }}>We are thrilled to announce the launch of our new branding and improved platform features...</p>
                        </article>

                        <article style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '16px' }}>
                            <span style={{ color: '#FF6B4A', fontWeight: 600, fontSize: '0.9rem' }}>Community</span>
                            <h2 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>Top 10 Hidden Gems in Kyoto</h2>
                            <p style={{ color: '#555', lineHeight: '1.6' }}>Our community of creators has spoken. Here are the most beloved secret spots in Kyoto...</p>
                        </article>
                    </div>
                </div>
            </main>
        </>
    );
}
