import React from 'react';
import { Container } from '../../components/ui';
import { useI18n } from '../../i18n';
import styles from './DestinationsFooter.module.css';

export interface DestinationsFooterProps {
  className?: string;
}

export default function DestinationsFooter({ className = '' }: DestinationsFooterProps): React.JSX.Element {
  const { t, locale, toggleLocale } = useI18n();

  const destinations = [
    {
      id: 'dest-1',
      city: 'Dubai',
      country: 'United Arab Emirates',
      price: 'From $420',
      tag: 'Direct Flights',
      bgGradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    },
    {
      id: 'dest-2',
      city: 'Paris',
      country: 'France',
      price: 'From $380',
      tag: 'Trending',
      bgGradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
    },
    {
      id: 'dest-3',
      city: 'Tokyo',
      country: 'Japan',
      price: 'From $790',
      tag: 'Top Rated',
      bgGradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    },
    {
      id: 'dest-4',
      city: 'London',
      country: 'United Kingdom',
      price: 'From $450',
      tag: 'Popular',
      bgGradient: 'linear-gradient(135deg, #373b44 0%, #4286f4 100%)',
    },
    {
      id: 'dest-5',
      city: 'New York',
      country: 'United States',
      price: 'From $520',
      tag: 'Non-stop',
      bgGradient: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
    },
    {
      id: 'dest-6',
      city: 'Rome',
      country: 'Italy',
      price: 'From $410',
      tag: 'Cultural Deal',
      bgGradient: 'linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)',
    },
  ];

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {/* 1. Destinations Showcase Section */}
      <section
        id="destinations"
        className={styles.destinationsSection}
        aria-labelledby="destinations-heading"
      >
        <Container size="standard">
          <div className={styles.headerCol}>
            <span className={styles.sectionBadge}>Global Network</span>
            <h2 id="destinations-heading" className={styles.sectionTitle}>
              {t('destinations.title')}
            </h2>
            <p className={styles.sectionSubtitle}>{t('destinations.subtitle')}</p>
          </div>

          <div className={styles.destinationsGrid}>
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className={styles.destinationCard}
                onClick={() => {
                  const el = document.getElementById('main-content');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div
                  className={styles.cardBg}
                  style={{ background: dest.bgGradient }}
                  aria-hidden="true"
                />
                <div className={styles.cardOverlay} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <h3 className={styles.cityName}>{dest.city}</h3>
                  <span className={styles.countryName}>{dest.country}</span>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>{dest.price}</span>
                    <span className={styles.cardTag}>{dest.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div id="contact" className={styles.ctaContainer}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>{t('destinations.cta.title')}</h2>
              <p className={styles.ctaSubtitle}>{t('destinations.cta.subtitle')}</p>
              <button
                type="button"
                className={styles.ctaButton}
                onClick={() => {
                  const el = document.getElementById('main-content');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('destinations.cta.button')}
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Semantic Footer */}
      <footer className={styles.footer} role="contentinfo">
        <Container size="standard">
          <div className={styles.footerGrid}>
            {/* Brand column */}
            <div className={styles.footerBrandCol}>
              <div className={styles.footerLogo}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flipOnRtl"
                >
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
                <span className={styles.footerBrandName}>{t('header.brand.name')}</span>
              </div>
              <p className={styles.footerDesc}>{t('destinations.footer.description')}</p>
            </div>

            {/* Navigation links columns */}
            <div className={styles.footerNavCols}>
              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>{t('destinations.footer.company')}</h4>
                <ul className={styles.footerLinksList}>
                  <li>
                    <a href="#about" className={styles.footerLink}>
                      {t('header.nav.about')}
                    </a>
                  </li>
                  <li>
                    <a href="#careers" className={styles.footerLink}>
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#press" className={styles.footerLink}>
                      Press
                    </a>
                  </li>
                  <li>
                    <a href="#sustainability" className={styles.footerLink}>
                      Sustainability
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>{t('destinations.footer.services')}</h4>
                <ul className={styles.footerLinksList}>
                  <li>
                    <a href="#home" className={styles.footerLink}>
                      Flight Search
                    </a>
                  </li>
                  <li>
                    <a href="#seats" className={styles.footerLink}>
                      {t('header.nav.seats')}
                    </a>
                  </li>
                  <li>
                    <a href="#offers" className={styles.footerLink}>
                      {t('header.nav.offers')}
                    </a>
                  </li>
                  <li>
                    <a href="#charters" className={styles.footerLink}>
                      Private Charter
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>{t('destinations.footer.support')}</h4>
                <ul className={styles.footerLinksList}>
                  <li>
                    <a href="#support" className={styles.footerLink}>
                      {t('header.support')}
                    </a>
                  </li>
                  <li>
                    <a href="#status" className={styles.footerLink}>
                      Flight Status
                    </a>
                  </li>
                  <li>
                    <a href="#refund" className={styles.footerLink}>
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className={styles.footerLink}>
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>{t('destinations.footer.legal')}</h4>
                <ul className={styles.footerLinksList}>
                  <li>
                    <a href="#terms" className={styles.footerLink}>
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#privacy" className={styles.footerLink}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#cookies" className={styles.footerLink}>
                      Cookie Preferences
                    </a>
                  </li>
                  <li>
                    <a href="#security" className={styles.footerLink}>
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.copyrightText}>{t('destinations.footer.copyright')}</p>
            <button
              type="button"
              onClick={toggleLocale}
              style={{
                color: '#94a3b8',
                fontSize: 'var(--font-size-xs)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>🌐</span>
              <span>{locale === 'en' ? 'العربية (RTL)' : 'English (LTR)'}</span>
            </button>
          </div>
        </Container>
      </footer>
    </div>
  );
}
