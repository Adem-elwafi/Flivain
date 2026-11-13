import type { TranslationSchema } from './en';

export const ar: TranslationSchema = {
  header: {
    support: 'الدعم الفني',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    contact: 'اتصل بنا',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      offers: 'العروض',
      seats: 'المقاعد',
      destinations: 'الوجهات',
    },
    brand: {
      name: 'فليفاين',
      tagline: 'وكالة حجز طيران',
    },
    menuAria: 'تبديل قائمة التنقل',
    languageSwitcherAria: 'تغيير اللغة',
  },
  hero: {
    titleLine1: 'ابحث واحجز',
    titleLine2: 'تجربة استثنائية',
    subtitle: 'استمتع بتجربة سفر فاخرة وحجوزات طيران سلسة لأشهر الوجهات العالمية.',
    planeAlt: 'منظر أمامي لطائرة ركاب تجارية تحلق عبر السحاب',
    skyAlt: 'سماء زرقاء صافية مع غيوم بيضاء متفرقة',
  },
  booking: {
    tabs: {
      economy: 'الدرجة السياحية',
      business: 'درجة الأعمال',
      firstClass: 'الدرجة الأولى',
    },
    fields: {
      location: 'الوجهة',
      locationPlaceholder: 'إلى أين ترغب بالسفر؟ (مثال: دبي، باريس)',
      travelers: 'المسافرون',
      travelersCount: '{count} مسافر',
      checkIn: 'تاريخ المغادرة',
      checkOut: 'تاريخ العودة',
    },
    searchButtonAria: 'بحث عن رحلات الطيران',
    travelerModal: {
      adults: 'البالغون (12+ سنة)',
      children: 'الأطفال (2-11 سنة)',
      infants: 'الرضع (أقل من سنتين)',
      done: 'تم',
    },
    validation: {
      locationRequired: 'يرجى تحديد أو إدخال وجهة السفر',
      checkInRequired: 'تاريخ المغادرة مطلوب',
      checkOutRequired: 'تاريخ العودة مطلوب',
      invalidDateRange: 'تاريخ العودة يجب أن يكون في أو بعد تاريخ المغادرة',
    },
    modal: {
      title: 'نتائج البحث عن الرحلات',
      close: 'إغلاق',
      cabin: 'الدرجة المختارة',
      dates: 'مواعيد الرحلة',
      passengers: 'المسافرون',
      destination: 'الوجهة',
      successNotice: 'جاري البحث عن أفضل الرحلات المتاحة التي تطابق جدولك...',
    },
  },
  offers: {
    title: 'أقوى عروض السفر',
    subtitle: 'اكتشف أفضل الأسعار وامتيازات الطيران المصممة خصيصاً لرحلتك',
    bookNow: 'احجز الآن',
    classComparisonTitle: 'اختر تجربة مقصورتك المثالية',
    perks: {
      economyPerk: 'مقاعد مريحة، أمتعة قياسية، ونظام ترفيه متكامل في الأجواء',
      businessPerk: 'مقاعد سرير منبسطة، دخول حصري لصالات الاستراحة، ووجبات راقية',
      firstPerk: 'أجنحة خاصة منعزلة، خدمة سائق خاص، وطاقم ضيافة مخصص',
    },
  },
  destinations: {
    title: 'أشهر الوجهات السياحية',
    subtitle: 'سافر إلى أكثر المدن إقبالاً وسحراً حول العالم',
    viewAll: 'استكشف كافة الوجهات',
    cta: {
      title: 'هل أنت جاهز للإقلاع في رحلتك القادمة؟',
      subtitle: 'انضم إلى ملايين المسافرين الذين يثقون في فليفاين لحجوزات سهلة ومريحة.',
      button: 'ابدأ الآن',
    },
    footer: {
      description: 'فليفاين وكالة طيران راقية تقدم حجوزات سلسة وخدمات سفر استثنائية حول العالم.',
      company: 'الشركة',
      services: 'الخدمات',
      support: 'الدعم والمساعدة',
      legal: 'الشروط والخصوصية',
      copyright: '© 2026 وكالة فليفاين. جميع الحقوق محفوظة.',
    },
  },
};
