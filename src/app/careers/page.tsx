import Navbar from '@/components/Navbar';
import styles from '../page.module.css';

export default function CareersPage() {
    return (
        <>
            <Navbar />
            <main className={styles.main} style={{ paddingTop: '100px', minHeight: '100vh', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1A1A1A' }}>Join the Team</h1>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#555', marginBottom: '3rem' }}>
                        We're building the future of travel curation. If you're passionate about travel, design, and technology, we'd love to hear from you.
                    </p>

                    <div style={{ padding: '2rem', background: '#FFF9F7', borderRadius: '16px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No open positions right now</h3>
                        <p style={{ color: '#666' }}>Check back soon or follow us on social media for updates.</p>
                    </div>
                </div>
            </main>
        </>
    );
}
