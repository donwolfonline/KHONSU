import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.moonIcon}>
              <Image
                src="/khonsu-logo.png"
                alt="Khonsu"
                width={120}
                height={120}
                style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 40px rgba(212, 175, 55, 0.9))' }}
              />
            </div>
            <h1 className={styles.title}>
              Guide Your Travelers <br />
              <span className="text-gradient">Through the Night</span>
            </h1>
            <p className={styles.subtitle}>
              Like Khonsu, the ancient pathfinder, illuminate your digital universe.
              Protect your presence and guide your followers with a single, mystical link.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="/register" className="btn btn-primary">
                Claim Your Space
              </Link>
              <Link href="/demo" className="btn btn-secondary">
                See the Magic
              </Link>
            </div>
          </div>
        </div>

        {/* Celestial Background Effects */}
        <div className={styles.stars}></div>
        <div className={styles.moonGlow}></div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Celestial Features</h2>
          <p className={styles.sectionSubtitle}>Everything you need to shine in the digital cosmos</p>

          <div className={styles.grid}>
            <div className={`glass-card ${styles.card}`}>
              <div className={styles.cardIcon}>🌙</div>
              <h3>Moon Phase Themes</h3>
              <p>Choose from mystical themes inspired by lunar cycles. Each design crafted to illuminate your unique presence.</p>
            </div>

            <div className={`glass-card ${styles.card}`}>
              <div className={styles.cardIcon}>✨</div>
              <h3>Celestial Aesthetics</h3>
              <p>Premium dark-first designs with cosmic gradients, starlight effects, and ethereal animations.</p>
            </div>

            <div className={`glass-card ${styles.card}`}>
              <div className={styles.cardIcon}>🔮</div>
              <h3>Mystical Analytics</h3>
              <p>Track your cosmic reach and understand your audience with insightful, beautifully presented data.</p>
            </div>

            <div className={`glass-card ${styles.card}`}>
              <div className={styles.cardIcon}>🌌</div>
              <h3>Stories & Moments</h3>
              <p>Share your journey through the stars. Add photos, videos, and favorite places to your universe.</p>
            </div>

            <div className={`glass-card ${styles.card}`}>
              <div className={styles.cardIcon}>📧</div>
              <h3>Lunar Newsletter</h3>
              <p>Build your constellation of followers. Collect emails and grow your community effortlessly.</p>
            </div>

            <div className={`glass-card ${styles.card}`}>
              <div className={styles.cardIcon}>🎨</div>
              <h3>Infinite Customization</h3>
              <p>Custom fonts, colors, backgrounds. Make your page as unique as your constellation in the night sky.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Illuminate Your Presence?</h2>
            <p className={styles.ctaSubtitle}>Join creators, travelers, and dreamers who shine with Khonsu</p>
            <Link href="/register" className="btn btn-gradient">
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
