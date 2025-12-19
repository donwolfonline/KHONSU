import Navbar from '@/components/Navbar';
import styles from '../page.module.css';

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main className={styles.main} style={{ paddingTop: '100px', minHeight: '100vh', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', color: '#1A1A1A' }}>Terms of Service</h1>
                    <div style={{ color: '#555', lineHeight: '1.7' }}>
                        <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            These Terms of Service ("Terms") constrain your access to and use of Thatch website and services. By accessing or using the Service, you agree to be bound by these Terms.
                        </p>
                        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#1A1A1A' }}>Use of Service</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            You must follow any policies made available to you within the Services. You may not misuse our Services. For example, do not interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
                        </p>
                        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#1A1A1A' }}>User Accounts</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
