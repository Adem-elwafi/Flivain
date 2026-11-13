export const en = {
  header: {
    support: 'Support',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    contact: 'Contact',
    nav: {
      home: 'Home',
      about: 'About',
      offers: 'Offers',
      seats: 'Seats',
      destinations: 'Destinations',
    },
    brand: {
      name: 'Flivain',
      tagline: 'Flight Booking Agency',
    },
    menuAria: 'Toggle navigation menu',
    languageSwitcherAria: 'Switch language',
  },
  hero: {
    titleLine1: 'Find And Book',
    titleLine2: 'A Great Experience',
    subtitle: 'Experience seamless travel with premium flight bookings to world-class destinations.',
    planeAlt: 'Front view of commercial airliner flying through cloud portal',
    skyAlt: 'Blue sky filled with soft white clouds',
  },
  booking: {
    tabs: {
      economy: 'Economy',
      business: 'Business Class',
      firstClass: 'First Class',
    },
    fields: {
      location: 'Location',
      locationPlaceholder: 'Where to? (e.g. Dubai, Paris)',
      travelers: 'Travelers',
      travelersCount: '{count} Traveler(s)',
      checkIn: 'Check in',
      checkOut: 'Check out',
    },
    searchButtonAria: 'Search flights',
    travelerModal: {
      adults: 'Adults (12+ yrs)',
      children: 'Children (2-11 yrs)',
      infants: 'Infants (<2 yrs)',
      done: 'Done',
    },
    validation: {
      locationRequired: 'Please select or enter a destination',
      checkInRequired: 'Departure date is required',
      checkOutRequired: 'Return date is required',
      invalidDateRange: 'Return date must be on or after departure date',
    },
    modal: {
      title: 'Flight Search Results',
      close: 'Close',
      cabin: 'Selected Cabin',
      dates: 'Flight Dates',
      passengers: 'Passengers',
      destination: 'Destination',
      successNotice: 'Searching best available flights matching your itinerary...',
    },
  },
  offers: {
    title: 'Special Travel Offers',
    subtitle: 'Discover exclusive fares and luxury flight perks curated for you',
    bookNow: 'Book Now',
    classComparisonTitle: 'Choose Your Cabin Experience',
    perks: {
      economyPerk: 'Ergonomic seating, standard baggage, inflight entertainment',
      businessPerk: 'Lie-flat bed seats, priority lounge access, gourmet dining',
      firstPerk: 'Private suites, dedicated chauffeur, personal cabin attendant',
    },
  },
  destinations: {
    title: 'Popular Destinations',
    subtitle: 'Fly to the most sought-after cities across the globe',
    viewAll: 'Explore All Destinations',
    cta: {
      title: 'Ready To Take Off On Your Next Journey?',
      subtitle: 'Join millions of travelers who trust Flivain for stress-free bookings.',
      button: 'Get Started Now',
    },
    footer: {
      description: 'Flivain is an elite flight booking agency delivering seamless travel and bespoke airline concierge services worldwide.',
      company: 'Company',
      services: 'Services',
      support: 'Support',
      legal: 'Legal & Privacy',
      copyright: '© 2026 Flivain Agency. All rights reserved.',
    },
  },
};

export type TranslationSchema = typeof en;
