import Navbar from '@/components/Navbar';
import styles from '../page.module.css';

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main className={styles.main} style={{ paddingTop: '100px', minHeight: '100vh', background: 'white' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1A1A1A' }}>Contact Us</h1>
                    <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem' }}>
                        Have questions or feedback? We&apos;re here to help.
                    </p>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                            <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="Your name" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                            <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="your@email.com" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                            <textarea style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', minHeight: '150px' }} placeholder="How can we help?"></textarea>
                        </div>
                        <button className="btn btn-gradient" style={{ alignSelf: 'flex-start' }}>Send Message</button>
                    </form>
                </div>
            </main>
        </>
    );
}
