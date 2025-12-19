import Navbar from '@/components/Navbar';
import styles from '../page.module.css';

export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <main className={styles.main} style={{ paddingTop: '100px', minHeight: '100vh', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', color: '#1A1A1A' }}>Privacy Policy</h1>
                    <div style={{ color: '#555', lineHeight: '1.7' }}>
                        <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            At Thatch, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website or use our mobile application.
                        </p>
                        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#1A1A1A' }}>Information We Collect</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                            <li>Personal Data (Name, Email address)</li>
                            <li>Derivative Data (IP address, Browser type)</li>
                            <li>Financial Data (if you make purchases)</li>
                        </ul>
                        <p>
                            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
