"use client";

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  // Parallax removed in favor of CSS "Tire Cycle" animation
  useEffect(() => {
    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animateIn');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className={styles.main}>
      <Navbar />

      {/* Hero Section - "Tire Cycle" Orbit */}
      <section className={styles.hero}>

        {/* Floating Travel Images (Unsplash) - Orbiting */}
        <div className={styles.heroVisuals}>
          <div className={`${styles.heroFloatingImg} ${styles.img1}`}>
            <img
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=300&q=80"
              alt="Beach Vacation"
              className={styles.visualImg}
            />
          </div>
          <div className={`${styles.heroFloatingImg} ${styles.img2}`}>
            <img
              src="https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=300&q=80"
              alt="City Exploration"
              className={styles.visualImg}
            />
          </div>
          <div className={`${styles.heroFloatingImg} ${styles.img3}`}>
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80"
              alt="Mountain Adventure"
              className={styles.visualImg}
            />
          </div>
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            {/* Removed Redundant Logo */}

            {/* New Attractive Copy */}
            <h1 className={styles.animatedTitle}>
              <span className={styles.word}>{t('curate')}</span>{' '}
              <span className={styles.word}>{t('your')}</span>{' '}
              <span className={styles.wordHighlight}>{t('journey')}</span>
            </h1>

            <p className={`${styles.heroSubtitle} ${styles.heroSubtitleGradient}`}>
              {t('heroSubtitle')}
            </p>

            <div className={styles.heroCtas}>
              <Link href="/register" className={`btn btn-primary ${styles.pulseBtn}`}>
                {t('startCreating')}
              </Link>
              <Link href="/demo" className="btn btn-secondary">
                {t('viewDemo')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Interest - Fixed Grid Layout */}
      <section className={styles.exploreSection} data-animate="fade-up">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('exploreTitle')}</h2>
            <p className={styles.sectionSubtitle}>
              {t('exploreSubtitle')}
            </p>
          </div>

          <div className={styles.destinationGrid}>
            <div className={styles.destinationCard}>
              <div className={styles.cardImage}>
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=750&q=80"
                  alt="Beach Destinations"
                  className={styles.cardImg}
                />
              </div>
              <div className={styles.cardOverlay}>
                <span className={styles.categoryIcon}>🏖️</span>
                <h3>{t('beachEscapes')}</h3>
                <p>{t('sunSoaked')}</p>
              </div>
            </div>

            <div className={styles.destinationCard}>
              <div className={styles.cardImage}>
                <img
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&h=750&q=80"
                  alt="City Destinations"
                  className={styles.cardImg}
                />
              </div>
              <div className={styles.cardOverlay}>
                <span className={styles.categoryIcon}>🏙️</span>
                <h3>{t('urbanStories')}</h3>
                <p>{t('cityLights')}</p>
              </div>
            </div>

            <div className={styles.destinationCard}>
              <div className={styles.cardImage}>
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&h=750&q=80"
                  alt="Mountain Destinations"
                  className={styles.cardImg}
                />
              </div>
              <div className={styles.cardOverlay}>
                <span className={styles.categoryIcon}>⛰️</span>
                <h3>{t('highAltitudes')}</h3>
                <p>{t('peaksValleys')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features} data-animate="fade-up">
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('featuresTitle')}</h2>
          <p className={styles.sectionSubtitle}>
            {t('featuresSubtitle')}
          </p>

          <div className={styles.grid}>
            <div className={`glass-card ${styles.featureCard}`} data-animate="fade-up">
              <div className={styles.featureIconWrapper}>
                <span className={styles.featureIcon}>✨</span>
              </div>
              <h3>{t('visualsTitle')}</h3>
              <p>{t('visualsDesc')}</p>
            </div>

            <div className={`glass-card ${styles.featureCard}`} data-animate="fade-up">
              <div className={styles.featureIconWrapper}>
                <span className={styles.featureIcon}>🗺️</span>
              </div>
              <h3>{t('mapsTitle')}</h3>
              <p>{t('mapsDesc')}</p>
            </div>

            <div className={`glass-card ${styles.featureCard}`} data-animate="fade-up">
              <div className={styles.featureIconWrapper}>
                <span className={styles.featureIcon}>📱</span>
              </div>
              <h3>{t('mobileTitle')}</h3>
              <p>{t('mobileDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} data-animate="fade-up">
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{t('readyTakeoff')}</h2>
            <p className={styles.ctaSubtitle}>
              {t('joinGeneration')}
            </p>
            <Link href="/register" className={`btn btn-gradient ${styles.pulseBtn}`}>
              {t('joinFree')}
            </Link>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className={styles.appSection} data-animate="fade-up">
        <div className="container">
          <div className={styles.appContent}>
            <h2>{t('takeThatch')}</h2>
            <p>{t('appDesc')}</p>
            <div className={styles.appButtons}>
              <a href="#" className={styles.appBtn}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on App Store"
                  style={{ height: '50px', width: 'auto' }}
                />
              </a>
              <a href="#" className={styles.appBtn}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  style={{ height: '50px', width: 'auto' }}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Image src="/thatch-full-logo.png" alt="Thatch" width={120} height={32} />
            </div>
            <div className={styles.footerLinks}>
              <Link href="/about">{t('about')}</Link>
              <Link href="/blog">{t('blog')}</Link>
              <Link href="/careers">{t('careers')}</Link>
              <Link href="/contact">{t('contact')}</Link>
            </div>
            <div className={styles.footerSocials}>
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
              <a href="#">Twitter</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Thatch. {t('rights')}</p>
            <div className={styles.legalLinks}>
              <Link href="/privacy">{t('privacy')}</Link>
              <Link href="/terms">{t('terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
