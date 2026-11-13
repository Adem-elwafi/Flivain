import React, { useState } from 'react';
import { Container, Tabs } from '../../components/ui';
import { useI18n } from '../../i18n';
import styles from './BookingWidget.module.css';

export interface BookingWidgetProps {
  className?: string;
}

type CabinType = 'economy' | 'business' | 'firstClass';

interface TravelersState {
  adults: number;
  children: number;
  infants: number;
}

const POPULAR_DESTINATIONS = [
  'Dubai, UAE (DXB)',
  'Paris, France (CDG)',
  'London, UK (LHR)',
  'Tokyo, Japan (HND)',
  'New York, USA (JFK)',
  'Rome, Italy (FCO)',
];

export default function BookingWidget({ className = '' }: BookingWidgetProps): React.JSX.Element {
  const { t } = useI18n();

  // Form State
  const [cabin, setCabin] = useState<CabinType>('business'); // Reference default is Business Class
  const [location, setLocation] = useState('Dubai, UAE (DXB)');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [travelers, setTravelers] = useState<TravelersState>({ adults: 1, children: 0, infants: 0 });
  const [isTravelerPopoverOpen, setIsTravelerPopoverOpen] = useState(false);
  
  // Set default dates: tomorrow and 7 days later
  const today = new Date().toISOString().split('T')[0];
  const defaultDeparture = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const defaultReturn = new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultDeparture);
  const [checkOut, setCheckOut] = useState(defaultReturn);

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cabin Tabs Definition
  const cabinTabs = [
    { id: 'economy', label: t('booking.tabs.economy') },
    { id: 'business', label: t('booking.tabs.business') },
    { id: 'firstClass', label: t('booking.tabs.firstClass') },
  ];

  const totalTravelers = travelers.adults + travelers.children + travelers.infants;

  const handleTravelerCountChange = (type: keyof TravelersState, delta: number) => {
    setTravelers((prev) => {
      const current = prev[type];
      const next = current + delta;
      if (type === 'adults' && (next < 1 || next > 9)) return prev;
      if (type === 'children' && (next < 0 || next > 9)) return prev;
      if (type === 'infants' && (next < 0 || next > 4)) return prev;
      return { ...prev, [type]: next };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!location.trim()) {
      newErrors.location = t('booking.validation.locationRequired');
    }
    if (!checkIn) {
      newErrors.checkIn = t('booking.validation.checkInRequired');
    }
    if (!checkOut) {
      newErrors.checkOut = t('booking.validation.checkOutRequired');
    } else if (checkIn && checkOut < checkIn) {
      newErrors.checkOut = t('booking.validation.invalidDateRange');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsModalOpen(true);
    }
  };

  const getCabinName = (id: CabinType): string => {
    if (id === 'economy') return t('booking.tabs.economy');
    if (id === 'business') return t('booking.tabs.business');
    return t('booking.tabs.firstClass');
  };

  return (
    <section className={`${styles.widgetSection} ${className}`.trim()} aria-label="Flight booking search">
      <Container size="standard">
        <div className={styles.widgetContainer}>
          <div className={styles.card}>
            {/* Top Tabs */}
            <div className={styles.tabsRow}>
              <Tabs
                items={cabinTabs}
                activeId={cabin}
                onChange={(id) => setCabin(id as CabinType)}
                ariaLabel="Select cabin class"
              />
            </div>

            {/* Form Fields Row */}
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formGrid}>
                {/* 1. Location Field */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="booking-location" className={styles.fieldLabel}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{t('booking.fields.location')}</span>
                  </label>

                  <div
                    className={`${styles.fieldControl} ${errors.location ? styles.fieldControlError : ''}`.trim()}
                    onClick={() => setIsLocationDropdownOpen(true)}
                  >
                    <span className={styles.iconSlot} aria-hidden="true">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flipOnRtl"
                      >
                        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                      </svg>
                    </span>

                    <input
                      id="booking-location"
                      type="text"
                      className={styles.input}
                      value={location}
                      placeholder={t('booking.fields.locationPlaceholder')}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                      }}
                      onFocus={() => setIsLocationDropdownOpen(true)}
                      aria-invalid={Boolean(errors.location)}
                      aria-describedby={errors.location ? 'location-error' : undefined}
                    />
                  </div>

                  {errors.location && (
                    <span id="location-error" className={styles.errorText} role="alert">
                      {errors.location}
                    </span>
                  )}

                  {isLocationDropdownOpen && (
                    <>
                      <div
                        className={styles.popoverBackdrop}
                        onClick={() => setIsLocationDropdownOpen(false)}
                      />
                      <ul className={styles.suggestionsList} role="listbox">
                        {POPULAR_DESTINATIONS.map((dest) => (
                          <li
                            key={dest}
                            role="option"
                            aria-selected={location === dest}
                            className={styles.suggestionItem}
                            onClick={() => {
                              setLocation(dest);
                              setIsLocationDropdownOpen(false);
                              if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                            }}
                          >
                            {dest}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* 2. Travelers Field */}
                <div className={styles.fieldGroup}>
                  <label id="travelers-label" className={styles.fieldLabel}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>{t('booking.fields.travelers')}</span>
                  </label>

                  <div
                    className={`${styles.fieldControl} ${isTravelerPopoverOpen ? styles.fieldControlActive : ''}`}
                    onClick={() => setIsTravelerPopoverOpen(!isTravelerPopoverOpen)}
                    role="button"
                    tabIndex={0}
                    aria-haspopup="dialog"
                    aria-expanded={isTravelerPopoverOpen}
                    aria-labelledby="travelers-label"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsTravelerPopoverOpen(!isTravelerPopoverOpen);
                      }
                    }}
                  >
                    <span className={styles.iconSlot} aria-hidden="true">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 1 0-16 0" />
                      </svg>
                    </span>
                    <span className={styles.displayText}>
                      {t('booking.fields.travelersCount', { count: totalTravelers })}
                    </span>
                  </div>

                  {isTravelerPopoverOpen && (
                    <>
                      <div
                        className={styles.popoverBackdrop}
                        onClick={() => setIsTravelerPopoverOpen(false)}
                      />
                      <div className={styles.travelerPopover} role="dialog" aria-label="Travelers count selection">
                        {/* Adults */}
                        <div className={styles.travelerRow}>
                          <span className={styles.travelerLabel}>{t('booking.travelerModal.adults')}</span>
                          <div className={styles.stepperGroup}>
                            <button
                              type="button"
                              className={styles.stepperBtn}
                              disabled={travelers.adults <= 1}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTravelerCountChange('adults', -1);
                              }}
                              aria-label="Decrease adults"
                            >
                              -
                            </button>
                            <span className={styles.stepperCount}>{travelers.adults}</span>
                            <button
                              type="button"
                              className={styles.stepperBtn}
                              disabled={travelers.adults >= 9}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTravelerCountChange('adults', 1);
                              }}
                              aria-label="Increase adults"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className={styles.travelerRow}>
                          <span className={styles.travelerLabel}>{t('booking.travelerModal.children')}</span>
                          <div className={styles.stepperGroup}>
                            <button
                              type="button"
                              className={styles.stepperBtn}
                              disabled={travelers.children <= 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTravelerCountChange('children', -1);
                              }}
                              aria-label="Decrease children"
                            >
                              -
                            </button>
                            <span className={styles.stepperCount}>{travelers.children}</span>
                            <button
                              type="button"
                              className={styles.stepperBtn}
                              disabled={travelers.children >= 9}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTravelerCountChange('children', 1);
                              }}
                              aria-label="Increase children"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className={styles.travelerRow}>
                          <span className={styles.travelerLabel}>{t('booking.travelerModal.infants')}</span>
                          <div className={styles.stepperGroup}>
                            <button
                              type="button"
                              className={styles.stepperBtn}
                              disabled={travelers.infants <= 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTravelerCountChange('infants', -1);
                              }}
                              aria-label="Decrease infants"
                            >
                              -
                            </button>
                            <span className={styles.stepperCount}>{travelers.infants}</span>
                            <button
                              type="button"
                              className={styles.stepperBtn}
                              disabled={travelers.infants >= 4}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTravelerCountChange('infants', 1);
                              }}
                              aria-label="Increase infants"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={styles.searchButton}
                          style={{
                            blockSize: '38px',
                            fontSize: 'var(--font-size-sm)',
                            marginBlockStart: 'var(--space-2)',
                          }}
                          onClick={() => setIsTravelerPopoverOpen(false)}
                        >
                          {t('booking.travelerModal.done')}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* 3. Check in Field */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="booking-checkin" className={styles.fieldLabel}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{t('booking.fields.checkIn')}</span>
                  </label>

                  <div className={`${styles.fieldControl} ${errors.checkIn ? styles.fieldControlError : ''}`}>
                    <input
                      id="booking-checkin"
                      type="date"
                      className={styles.input}
                      min={today}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (errors.checkIn) setErrors((prev) => ({ ...prev, checkIn: '' }));
                      }}
                      aria-invalid={Boolean(errors.checkIn)}
                      aria-describedby={errors.checkIn ? 'checkin-error' : undefined}
                    />
                  </div>
                  {errors.checkIn && (
                    <span id="checkin-error" className={styles.errorText} role="alert">
                      {errors.checkIn}
                    </span>
                  )}
                </div>

                {/* 4. Check out Field */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="booking-checkout" className={styles.fieldLabel}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{t('booking.fields.checkOut')}</span>
                  </label>

                  <div className={`${styles.fieldControl} ${errors.checkOut ? styles.fieldControlError : ''}`}>
                    <input
                      id="booking-checkout"
                      type="date"
                      className={styles.input}
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        if (errors.checkOut) setErrors((prev) => ({ ...prev, checkOut: '' }));
                      }}
                      aria-invalid={Boolean(errors.checkOut)}
                      aria-describedby={errors.checkOut ? 'checkout-error' : undefined}
                    />
                  </div>
                  {errors.checkOut && (
                    <span id="checkout-error" className={styles.errorText} role="alert">
                      {errors.checkOut}
                    </span>
                  )}
                </div>

                {/* 5. Circular Search Action Button */}
                <div className={styles.searchActionCol}>
                  <button
                    type="submit"
                    className={styles.searchButton}
                    aria-label={t('booking.searchButtonAria')}
                  >
                    <span className={styles.searchIcon} aria-hidden="true">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flipOnRtl"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                    <span className={styles.searchBtnText}>{t('booking.searchButtonAria')}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>

      {/* Demo Search Results Confirmation Modal */}
      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 id="modal-title" className={styles.modalTitle}>
                {t('booking.modal.title')}
              </h2>
              <button
                type="button"
                className={styles.stepperBtn}
                onClick={() => setIsModalOpen(false)}
                aria-label={t('booking.modal.close')}
              >
                ✕
              </button>
            </div>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {t('booking.modal.successNotice')}
            </p>

            <div className={styles.modalSummaryCard}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{t('booking.modal.destination')}:</span>
                <span className={styles.summaryValue}>{location}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{t('booking.modal.cabin')}:</span>
                <span className={styles.summaryValue}>{getCabinName(cabin)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{t('booking.modal.dates')}:</span>
                <span className={styles.summaryValue}>
                  {checkIn} → {checkOut}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{t('booking.modal.passengers')}:</span>
                <span className={styles.summaryValue}>
                  {totalTravelers} ({travelers.adults}A, {travelers.children}C, {travelers.infants}I)
                </span>
              </div>
            </div>

            <button
              type="button"
              className={styles.searchButton}
              style={{ blockSize: '44px' }}
              onClick={() => setIsModalOpen(false)}
            >
              {t('booking.modal.close')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
