import React, { useState, useEffect } from 'react';
import { Container, Button } from '../../components/ui';
import { useI18n } from '../../i18n';
import styles from './Header.module.css';

export interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps): React.JSX.Element {
  const { t, locale, toggleLocale } = useI18n();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: t('header.nav.home'), href: '#home' },
    { id: 'about', label: t('header.nav.about'), href: '#about' },
    { id: 'offers', label: t('header.nav.offers'), href: '#offers' },
    { id: 'seats', label: t('header.nav.seats'), href: '#seats' },
    { id: 'destinations', label: t('header.nav.destinations'), href: '#destinations' },
  ];

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  return (
    <header className={`${styles.headerContainer} ${className}`.trim()}>
      {/* 1. Utility Bar */}
      <div className={styles.utilityBar}>
        <Container size="standard">
          <div className={styles.utilityInner}>
            <div className={styles.utilityStart}>
              <a href="#support" className={styles.utilityLink}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                <span>{t('header.support')}</span>
              </a>
            </div>

            <div className={styles.utilityEnd}>
              <button
                type="button"
                className={styles.langSwitcher}
                onClick={toggleLocale}
                aria-label={t('header.languageSwitcherAria')}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>{locale === 'en' ? 'العربية' : 'English'}</span>
              </button>

              <span className={styles.utilityDivider} aria-hidden="true" />

              <a href="#signin" className={styles.utilityLink}>
                {t('header.signIn')}
              </a>
              <a href="#signup" className={styles.utilityLink}>
                {t('header.signUp')}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className={styles.mainNav} aria-label="Main Navigation">
        <Container size="standard">
          <div className={styles.navInner}>
            {/* Logo */}
            <a href="#home" className={styles.logo}>
              <div className={styles.logoIconWrapper}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="flipOnRtl"
                >
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </div>
              <div className={styles.logoTextCol}>
                <span className={styles.brandName}>{t('header.brand.name')}</span>
                <span className={styles.brandTagline}>{t('header.brand.tagline')}</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <ul className={styles.desktopNavList}>
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`.trim()}
                      onClick={() => setActiveSection(item.id)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Contact Action Button */}
            <div className={styles.desktopContactBtn}>
              <Button
                variant="dark"
                size="md"
                onClick={() => {
                  window.location.hash = '#contact';
                }}
              >
                {t('header.contact')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={styles.menuToggle}
              onClick={() => setIsDrawerOpen(true)}
              aria-label={t('header.menuAria')}
              aria-expanded={isDrawerOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`${styles.drawerBackdrop} ${isDrawerOpen ? styles.drawerBackdropOpen : ''}`.trim()}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className={styles.drawerHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIconWrapper}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
                className="flipOnRtl"
              >
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
              </svg>
            </div>
            <span className={styles.brandName}>{t('header.brand.name')}</span>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className={styles.drawerNavList}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={styles.drawerNavLink}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsDrawerOpen(false);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.drawerFooter}>
          <Button
            variant="dark"
            size="lg"
            className={styles.drawerContactBtn}
            onClick={() => {
              setIsDrawerOpen(false);
              window.location.hash = '#contact';
            }}
          >
            {t('header.contact')}
          </Button>

          <button
            type="button"
            className={styles.langSwitcher}
            onClick={() => {
              toggleLocale();
              setIsDrawerOpen(false);
            }}
            style={{ justifyContent: 'center', paddingBlock: '10px' }}
          >
            <span>{locale === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
