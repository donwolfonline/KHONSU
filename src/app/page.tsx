"use client";

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Parallax & Mouse Move Effect for Hero Images
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate mouse position relative to center (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      const items = heroRef.current.querySelectorAll(`.${styles.heroFloatingImg}`);

      items.forEach((item, index) => {
        // Different speeds for depth effect
        const speed = (index + 1) * 15;
        const xOffset = xPos * speed;
        const yOffset = yPos * speed;

        (item as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

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
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <main className={styles.main}>
      <Navbar />

      {/* Hero Section - Interactive & Parallax */}
      <section className={styles.hero} ref={heroRef}>

        {/* Floating Travel Images (Unsplash) */}
        <div className={styles.heroVisuals}>
          <div className={`${styles.heroFloatingImg} ${styles.img1}`}>
            <img
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=400&q=80"
              alt="Beach Vacation"
              className={styles.visualImg}
            />
          </div>
          <div className={`${styles.heroFloatingImg} ${styles.img2}`}>
            <img
              src="https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=400&q=80"
              alt="City Exploration"
              className={styles.visualImg}
            />
          </div>
          <div className={`${styles.heroFloatingImg} ${styles.img3}`}>
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"
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
              <span className={styles.word}>Curate</span>{' '}
              <span className={styles.word}>your</span>{' '}
              <span className={styles.wordHighlight}>journey.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Transform your travel recommendations into a stunning visual story.
              Inspire others with your authentic experiences.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/register" className={`btn btn-primary ${styles.pulseBtn}`}>
                Start Creating Free
              </Link>
              <Link href="/demo" className="btn btn-secondary">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Interest - Fixed Grid Layout */}
      <section className={styles.exploreSection} data-animate="fade-up">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Where will you go next?</h2>
            <p className={styles.sectionSubtitle}>
              Explore trending destinations curated by travelers like you.
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
                <h3>Beach Escapes</h3>
                <p>Sun-soaked paradises</p>
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
                <h3>Urban Stories</h3>
                <p>City lights & culture</p>
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
                <h3>High Altitudes</h3>
                <p>Peaks & valleys</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features} data-animate="fade-up">
        <div className="container">
          <h2 className={styles.sectionTitle}>Designed for Explorers</h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to showcase your adventures.
          </p>

          <div className={styles.grid}>
            <div className={`glass-card ${styles.featureCard}`} data-animate="fade-up">
              <div className={styles.featureIconWrapper}>
                <span className={styles.featureIcon}>✨</span>
              </div>
              <h3>Stunning Visuals</h3>
              <p>Your photos take center stage with our immersive layouts.</p>
            </div>

            <div className={`glass-card ${styles.featureCard}`} data-animate="fade-up">
              <div className={styles.featureIconWrapper}>
                <span className={styles.featureIcon}>🗺️</span>
              </div>
              <h3>Interactive Maps</h3>
              <p>Pin your favorite spots and guide others to hidden gems.</p>
            </div>

            <div className={`glass-card ${styles.featureCard}`} data-animate="fade-up">
              <div className={styles.featureIconWrapper}>
                <span className={styles.featureIcon}>📱</span>
              </div>
              <h3>Mobile Optimized</h3>
              <p>Looks perfect on every device, everywhere you travel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} data-animate="fade-up">
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready for takeoff?</h2>
            <p className={styles.ctaSubtitle}>
              Join the new generation of travel storytellers.
            </p>
            <Link href="/register" className={`btn btn-gradient ${styles.pulseBtn}`}>
              Join Thatch Free
            </Link>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className={styles.appSection} data-animate="fade-up">
        <div className="container">
          <div className={styles.appContent}>
            <h2>Take Thatch with you</h2>
            <p>Plan, create, and share on the go. Download the mobile app.</p>
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
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className={styles.footerSocials}>
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
              <a href="#">Twitter</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Thatch. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
