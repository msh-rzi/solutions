export const translations = {
  en: {
    nav: {
      brand: 'Mehdi',
      brandMark: 'M',
      tagline: 'Systems Engineer',
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      expertise: 'Expertise',
      contact: 'Contact',
    },
    hero: {
      name: 'Mehdi',
      title: 'Senior Full-Stack Engineer | 5+ Years in ERP, OTA, CRS, Ticketing',
      description:
        'I build high-integrity production systems for ERP and travel domains, including OTA/CRS and ticketing platforms, with React.js, Next.js, Node.js/NestJS, PostgreSQL, Prisma, and Drizzle ORM.',
      cta: 'Explore Expertise',
      contact: 'Start a Project',
      highlightsLabel: 'Focus areas',
      highlights: [
        'Concurrency-safe reservation and inventory workflows',
        'ACID-compliant ledger and immutable audit design',
        'Enterprise UI architecture with data grid and field-level access control',
      ],
      snapshotTitle: 'Systems I deliver',
      snapshotItems: [
        'ERP, OTA, CRS, and ticketing platforms',
        'Reservation and financial transaction cores',
        'Data-heavy enterprise frontend systems',
      ],
    },
    about: {
      title: 'About',
      p1: 'Senior full-stack engineer with 5+ years building ERP, OTA, CRS, and ticketing systems.',
      p2: 'On the backend, I design ACID transaction boundaries, idempotent APIs, and locking strategies that keep data consistent under heavy concurrency.',
      p3: 'On the frontend, I build enterprise components - server-driven data grids, complex forms, and role/field-level permission controls - that stay fast and predictable at scale.',
      focusTitle: 'Operating principles',
      focusItems: [
        'ACID transactions, isolation levels, and auditability',
        'Race-condition prevention, lock design, and concurrency testing',
        'Data-grid performance, virtualization, and policy-driven UI architecture',
        'Clear documentation, decision records, and reproducible delivery',
      ],
    },
    skills: {
      title: 'Tech Stack',
      subtitle: 'Tools I trust in production',
      description: 'TypeScript across the stack with Next.js, NestJS, PostgreSQL, and infrastructure tools that keep systems observable and reliable.',
      caption: 'Production-ready',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Synced with repository apps',
      description: 'Live inventory of backend and frontend apps currently present in this monorepo.',
      empty: 'No projects were detected in the repository.',
      stackLabel: 'Stack',
      pathLabel: 'Path',
    },
    expertise: {
      title: 'Technical Expertise',
      subtitle: 'These entries focus on the hardest engineering problems solved in production across my two backend cores and enterprise frontend experience.',
      whyMatters: 'Why it matters:',
      approach: 'Approach:',
      viewSource: 'View source code on GitHub',
      categoryLabel: 'Category',
      back: 'Back to home',
      items: {
        frontend: [
          {
            problem: '**Enterprise Data Grid** (Frontend Core)',
            why: 'Enterprise UIs break with **10k+ rows**, heavy filters, and inline editing. If latency or frame drops appear, operational teams lose trust immediately.',
            approach:
              'Built with **virtualization**, server-side pagination/filtering, and stable query keys. Benchmarked end-to-end interaction paths and tuned rendering to keep data-heavy screens responsive.',
          },
          {
            problem: '**Field-Level Access Control** and Dynamic Forms',
            why: 'Complex operational forms need strict **role-based field permissions** plus conditional rules. Scattered logic creates security gaps and inconsistent behavior.',
            approach:
              'Centralized a testable **policy layer** that evaluates user role, scope, and form state. UI renders from schema and derived state so permissions stay deterministic and auditable.',
          },
          {
            problem: '**Multi-Step Workflow Forms**',
            why: 'Multi-step business workflows fail when validation and transitions are fragmented, causing data loss and inconsistent submissions.',
            approach:
              'Implemented step schemas, guarded transitions, and persistent draft state with one validation map to keep submissions consistent across tabs and refreshes.',
          },
        ],
        backend: [
          {
            problem: '**Reservation Core (Backend + Ops UI)**',
            why: 'Booking systems must prevent **double booking** under concurrent requests while still supporting safe retries and operational visibility.',
            approach:
              'Hard parts solved: **(1)** overlap checks and writes inside one transaction with lock-aware queries; **(2)** API-level **idempotency keys** for retry safety; **(3)** ops-facing **data grid + field-level access control** for role-based visibility and editing.',
          },
          {
            problem: '**ACID Transaction System (Financial Ledger Core)**',
            why: 'Financial operations require **provable consistency**. Any drift causes reconciliation failures, audit risk, and loss of trust.',
            approach:
              'Hard parts solved: **(1)** atomic `transaction + postings + balances` with strict **double-entry** validation; **(2)** **row-level locks** with deterministic lock ordering to reduce race conditions and deadlocks; **(3)** **immutable audit trail** with overdraft and currency-consistency controls.',
          },
          {
            problem: '**Additional Enterprise Experience** (ERP / OTA / CRS / Ticketing)',
            why: 'These domains combine high-concurrency workflows, complex rule engines, and strict operational permission requirements.',
            approach:
              'Production delivery across multiple teams and domains. Detailed case studies are intentionally condensed here and can be expanded in a dedicated section.',
          },
        ],
        saas: [
          {
            problem: '**Cross-System Integrations & Domain Workflows**',
            why: 'ERP, OTA, CRS, and ticketing systems depend on reliable contracts across booking, inventory, pricing, and reporting services.',
            approach:
              'Designed integration boundaries with explicit contracts, backward-compatible rollout strategies, and operational safeguards for partial failure scenarios.',
          },
          {
            problem: '**Operational Readiness & Incident Hardening**',
            why: 'Enterprise systems must stay stable under traffic spikes, retries, and partial outages.',
            approach:
              'Applied stress tests, failure-mode validation, and observability-first diagnostics so production behavior remains explainable and recoverable.',
          },
          {
            problem: '**Additional Case Studies**',
            why: 'A focused portfolio is more credible when each item includes verifiable technical depth.',
            approach:
              'Additional production-grade breakdowns will be added incrementally with architecture decisions, tradeoffs, and measured outcomes.',
          },
        ],
      },
      categories: {
        frontend: 'Frontend Systems',
        backend: 'Backend & Data Systems',
        saas: 'Additional Enterprise Experience',
      },
    },
    contact: {
      title: 'Contact',
      heading: 'Get in touch',
      description:
        "Available for contract work, consulting, and full-time roles. If you have a technical challenge or a system that needs to be built correctly, I'd be glad to discuss it.",
      cta: 'Send a message',
    },
    footer: {
      credit: 'Designed and built by Mehdi',
    },
  },
  fa: {
    nav: {
      brand: 'مهدی',
      brandMark: 'م',
      tagline: 'مهندس سیستم‌ها',
      home: 'خانه',
      about: 'درباره',
      skills: 'مهارت‌ها',
      projects: 'پروژه‌ها',
      expertise: 'تخصص‌ها',
      contact: 'تماس',
    },
    hero: {
      name: 'مهدی',
      title: 'مهندس ارشد فول‌استک | بیش از ۵ سال در ERP، OTA، CRS و Ticketing',
      description:
        'سیستم‌های تولیدی با صحت بالا برای دامنه‌های ERP و سفر می‌سازم؛ شامل OTA/CRS و پلتفرم‌های ticketing با React.js، Next.js، Node.js/NestJS، PostgreSQL، Prisma و Drizzle ORM.',
      cta: 'بررسی تخصص‌ها',
      contact: 'شروع همکاری',
      highlightsLabel: 'حوزه‌های تمرکز',
      highlights: [
        'جریان‌های رزرو و موجودی ایمن در هم‌زمانی',
        'دفترکل مالی ACID و ممیزی تغییرناپذیر',
        'معماری فرانت سازمانی با data grid و کنترل دسترسی سطح فیلد',
      ],
      snapshotTitle: 'سیستم‌هایی که تحویل می‌دهم',
      snapshotItems: [
        'پلتفرم‌های ERP، OTA، CRS و ticketing',
        'هسته رزرو و تراکنش مالی',
        'سیستم‌های فرانت سازمانی داده‌محور',
      ],
    },
    about: {
      title: 'درباره',
      p1: 'مهندس ارشد فول‌استک با بیش از ۵ سال تجربه در ERP، OTA، CRS و ticketing.',
      p2: 'در بک‌اند روی مرزهای ACID، APIهای idempotent و استراتژی‌های قفل‌گذاری تمرکز دارم تا داده در هم‌زمانی بالا هم سازگار بماند.',
      p3: 'در فرانت‌اند، data grid سمت‌سرور، فرم‌های پیچیده و کنترل دسترسی سطح نقش/فیلد را پیاده‌سازی می‌کنم تا UX در مقیاس پایدار و قابل اتکا بماند.',
      focusTitle: 'اصول کاری',
      focusItems: [
        'تراکنش‌های ACID، سطح‌های ایزولیشن و ممیزی‌پذیری',
        'جلوگیری از Race Condition، طراحی قفل و تست هم‌زمانی',
        'کارایی data grid، مجازی‌سازی و معماری UI مبتنی بر policy',
        'مستندسازی شفاف، تصمیمات معماری و تحویل قابل تکرار',
      ],
    },
    skills: {
      title: 'پشته فناوری',
      subtitle: 'ابزارهایی که در تولید به آن‌ها اعتماد دارم',
      description: 'TypeScript در سراسر استک همراه با Next.js، NestJS، PostgreSQL و ابزارهای زیرساختی برای مشاهده‌پذیری و پایداری.',
      caption: 'آماده تولید',
    },
    projects: {
      title: 'پروژه‌ها',
      subtitle: 'همگام با اپلیکیشن‌های مخزن',
      description: 'فهرست زنده از اپ‌های بک‌اند و فرانت‌اند که هم‌اکنون در این monorepo وجود دارند.',
      empty: 'هیچ پروژه‌ای در مخزن پیدا نشد.',
      stackLabel: 'استک',
      pathLabel: 'مسیر',
    },
    expertise: {
      title: 'تخصص فنی',
      subtitle:
        'این بخش روی سخت‌ترین چالش‌های مهندسی در دو هسته بک‌اند و تجربه فرانت سازمانی من تمرکز دارد.',
      whyMatters: 'چرا مهم است:',
      approach: 'رویکرد:',
      viewSource: 'مشاهده کد منبع در GitHub',
      categoryLabel: 'دسته‌بندی',
      back: 'بازگشت به خانه',
      items: {
        frontend: [
          {
            problem: '**Enterprise Data Grid** (Frontend Core)',
            why: 'رابط‌های سازمانی با **۱۰هزار+ ردیف**، فیلترهای سنگین و ویرایش درون‌خطی سریعاً کند می‌شوند و تیم عملیاتی اعتمادش را از دست می‌دهد.',
            approach:
              'با **virtualization**، صفحه‌بندی/فیلتر سمت‌سرور و query key پایدار پیاده‌سازی شده است. مسیرهای تعاملی benchmark شده‌اند تا UI داده‌محور پاسخ‌گو بماند.',
          },
          {
            problem: '**Field-Level Access Control** و فرم پویا',
            why: 'فرم‌های عملیاتی به **مجوز سطح فیلد** و قواعد شرطی سخت‌گیرانه نیاز دارند. منطق پراکنده هم امنیت را تهدید می‌کند و هم رفتار را ناسازگار می‌سازد.',
            approach:
              'قواعد در یک **policy layer** قابل تست متمرکز شده‌اند که نقش، scope و وضعیت فرم را ارزیابی می‌کند. UI از schema و state مشتق‌شده رندر می‌شود.',
          },
          {
            problem: '**Multi-Step Workflow Forms**',
            why: 'گردش‌کارهای چندمرحله‌ای با اعتبارسنجی و جابه‌جایی پراکنده باعث از دست رفتن پیشرفت کاربر و ثبت داده ناسازگار می‌شوند.',
            approach:
              '**schema مرحله‌ای**، جابه‌جایی محافظت‌شده و draft پایدار با یک نقشه اعتبارسنجی واحد تا رفتار فرم در همه مراحل قابل پیش‌بینی بماند.',
          },
        ],
        backend: [
          {
            problem: '**Reservation Core (Backend + Ops UI)**',
            why: 'در سیستم رزرو باید **double booking** در درخواست‌های هم‌زمان حذف شود و retryها هم رزرو تکراری نسازند، در حالی که تیم عملیات دسترسی امن داشته باشد.',
            approach:
              'سه بخش سخت: **(1)** بررسی هم‌پوشانی و ثبت رزرو در یک تراکنش lock-aware؛ **(2)** پیاده‌سازی **idempotency key** برای retry امن؛ **(3)** **data grid + کنترل دسترسی سطح فیلد** برای نمایش/ویرایش مبتنی بر نقش.',
          },
          {
            problem: '**ACID Transaction System (Financial Ledger Core)**',
            why: 'عملیات مالی باید **سازگاری قابل اثبات** داشته باشد؛ هر انحرافی باعث خطای تطبیق، ریسک حسابرسی و بی‌اعتمادی می‌شود.',
            approach:
              'سه بخش سخت: **(1)** اتمیک‌بودن `transaction + postings + balances` با اعتبارسنجی **double-entry**؛ **(2)** **row-level locking** با ترتیب قفل‌گذاری مشخص برای کاهش race/deadlock؛ **(3)** **audit trail تغییرناپذیر** با کنترل overdraft و سازگاری ارز.',
          },
          {
            problem: '**Additional Enterprise Experience** (ERP / OTA / CRS / Ticketing)',
            why: 'این دامنه‌ها ترکیبی از هم‌زمانی بالا، موتور قواعد پیچیده و نیازمندی‌های سخت دسترسی عملیاتی هستند.',
            approach:
              'تحویل در چند تیم و چند دامنه به‌صورت production انجام شده است. جزئیات بیشتر case studyها عمداً خلاصه شده و در آپدیت بعدی قابل گسترش است.',
          },
        ],
        saas: [
          {
            problem: '**Cross-System Integrations & Domain Workflows**',
            why: 'در ERP، OTA، CRS و ticketing، یکپارچگی قابل اتکا بین سرویس‌های رزرو، موجودی، قیمت‌گذاری و گزارش‌گیری حیاتی است.',
            approach:
              'مرزهای یکپارچه‌سازی با قراردادهای صریح، rollout سازگار با نسخه قبل، و محافظت عملیاتی برای سناریوهای شکست جزئی طراحی شده است.',
          },
          {
            problem: '**Operational Readiness & Incident Hardening**',
            why: 'سیستم‌های سازمانی باید در زمان جهش ترافیک، retry و outage جزئی پایدار بمانند.',
            approach:
              'با stress test، اعتبارسنجی failure mode و observability هدفمند، رفتار production قابل توضیح و قابل بازیابی نگه داشته شده است.',
          },
          {
            problem: '**Additional Case Studies**',
            why: 'رزومه حرفه‌ای زمانی قوی‌تر است که هر آیتم عمق فنی قابل راستی‌آزمایی داشته باشد.',
            approach:
              'تحلیل‌های فنی بیشتر به‌صورت مرحله‌ای اضافه می‌شود تا tradeoffها، تصمیمات معماری و خروجی قابل اندازه‌گیری شفاف باشد.',
          },
        ],
      },
      categories: {
        frontend: 'سیستم‌های فرانت‌اند',
        backend: 'بک‌اند و سیستم‌های داده',
        saas: 'تجربه تکمیلی سازمانی',
      },
    },
    contact: {
      title: 'تماس',
      heading: 'در ارتباط باشیم',
      description:
        'برای همکاری قراردادی، مشاوره و نقش‌های ارشد تمام‌وقت در دسترس هستم. اگر چالش فنی دارید یا سیستمی باید درست ساخته شود، خوشحال می‌شوم گفت‌وگو کنیم.',
      cta: 'ارسال پیام',
    },
    footer: {
      credit: 'طراحی و توسعه توسط مهدی',
    },
  },
  de: {
    nav: {
      brand: 'Mehdi',
      brandMark: 'M',
      tagline: 'Systems Engineer',
      home: 'Start',
      about: 'Über mich',
      skills: 'Skills',
      projects: 'Projekte',
      expertise: 'Expertise',
      contact: 'Kontakt',
    },
    hero: {
      name: 'Mehdi',
      title: 'Senior Full-Stack Engineer | 5+ Jahre in ERP, OTA, CRS, Ticketing',
      description:
        'Ich baue hochintegre Produktionssysteme fur ERP- und Travel-Domains, inklusive OTA/CRS und Ticketing-Plattformen, mit React.js, Next.js, Node.js/NestJS, PostgreSQL, Prisma und Drizzle ORM.',
      cta: 'Expertise erkunden',
      contact: 'Projekt starten',
      highlightsLabel: 'Schwerpunkte',
      highlights: [
        'Nebenlaufigkeitssichere Reservierungs- und Bestands-Workflows',
        'ACID-konformes Ledger und unveranderliches Audit-Design',
        'Enterprise-UI mit Data Grid und Field-Level Access Control',
      ],
      snapshotTitle: 'Was ich liefere',
      snapshotItems: [
        'ERP-, OTA-, CRS- und Ticketing-Plattformen',
        'Reservierungs- und Finanztransaktions-Kerne',
        'Datenintensive Enterprise-Frontend-Systeme',
      ],
    },
    about: {
      title: 'Über mich',
      p1: 'Senior Full-Stack Engineer mit 5+ Jahren Erfahrung in ERP-, OTA-, CRS- und Ticketing-Systemen.',
      p2: 'Im Backend entwerfe ich ACID-Transaktionsgrenzen, idempotente APIs und Locking-Strategien fur konsistente Daten unter hoher Nebenlaufigkeit.',
      p3: 'Im Frontend liefere ich servergetriebene Data Grids, komplexe Formulare und rollen-/feldbasierte Berechtigungsmodelle, die auch im Maßstab stabil bleiben.',
      focusTitle: 'Arbeitsprinzipien',
      focusItems: [
        'ACID-Transaktionen, Isolationsebenen und Auditierbarkeit',
        'Race-Condition-Vermeidung, Lock-Design und Concurrency-Tests',
        'Data-Grid-Performance, Virtualisierung und Policy-basierte UI-Architektur',
        'Klare Dokumentation, Architekturentscheidungen und reproduzierbare Lieferung',
      ],
    },
    skills: {
      title: 'Tech-Stack',
      subtitle: 'Tools, denen ich in Produktion vertraue',
      description: 'TypeScript im gesamten Stack mit Next.js, NestJS, PostgreSQL und Infrastruktur-Tools für Observability und Zuverlässigkeit.',
      caption: 'Produktionsbereit',
    },
    projects: {
      title: 'Projekte',
      subtitle: 'Mit Repository-Apps synchronisiert',
      description: 'Live-Ubersicht der Backend- und Frontend-Apps, die aktuell in diesem Monorepo vorhanden sind.',
      empty: 'Keine Projekte im Repository gefunden.',
      stackLabel: 'Stack',
      pathLabel: 'Pfad',
    },
    expertise: {
      title: 'Technische Expertise',
      subtitle:
        'Diese Eintrage fokussieren auf die schwierigsten Engineering-Probleme aus zwei produktiven Backend-Kernen und Enterprise-Frontend-Arbeit.',
      whyMatters: 'Warum es wichtig ist:',
      approach: 'Ansatz:',
      viewSource: 'Quellcode auf GitHub ansehen',
      categoryLabel: 'Kategorie',
      back: 'Zur Startseite',
      items: {
        frontend: [
          {
            problem: '**Enterprise Data Grid** (Frontend Core)',
            why: 'Enterprise-UIs brechen bei **10k+ Zeilen**, schweren Filtern und Inline-Editing ein. Bei Latenzverlust sinkt das Vertrauen operativer Teams sofort.',
            approach:
              'Umgesetzt mit Virtualisierung, serverseitiger Pagination/Filterung und stabilen Query-Keys. Interaktionspfade wurden benchmarkt, damit datenintensive Screens reaktionsfahig bleiben.',
          },
          {
            problem: '**Field-Level Access Control** und dynamische Formulare',
            why: 'Operative Formulare brauchen strikte **feldbasierte Berechtigungen** plus bedingte Regeln. Verstreute Logik erzeugt Sicherheitslucken und inkonsistentes Verhalten.',
            approach:
              'Regeln in einer testbaren **Policy-Schicht** zentralisiert, die Rolle, Scope und Formularzustand auswertet. UI wird aus Schema und abgeleitetem State gerendert.',
          },
          {
            problem: '**Multi-Step Workflow Forms**',
            why: 'Mehrstufige Workflows scheitern bei fragmentierter Validierung und Navigation, was zu Datenverlust und inkonsistenten Submissions fuhrt.',
            approach:
              'Step-Schemata, geschutzte Ubergange und persistenter Draft-State mit einheitlicher Validierungsmap fur konsistente Ergebnisse uber alle Schritte.',
          },
        ],
        backend: [
          {
            problem: '**Reservation Core (Backend + Ops UI)**',
            why: 'Buchungssysteme mussen **Double Booking** unter gleichzeitigen Requests verhindern und trotzdem sichere Retries sowie operative Sichtbarkeit bieten.',
            approach:
              'Geloste Kernprobleme: **(1)** Overlap-Checks und Writes in einer lock-bewussten Transaktion; **(2)** API-**Idempotency-Keys** fur sichere Retries; **(3)** ops-orientiertes **Data Grid + Field-Level Access Control**.',
          },
          {
            problem: '**ACID Transaction System (Financial Ledger Core)**',
            why: 'Finanzoperationen erfordern **nachweisbare Konsistenz**. Jede Abweichung fuhrt zu Reconciliation-Fehlern, Audit-Risiken und Vertrauensverlust.',
            approach:
              'Geloste Kernprobleme: **(1)** atomare `transaction + postings + balances` mit strikter **Double-Entry**-Validierung; **(2)** **Row-Level Locks** mit deterministischer Lock-Reihenfolge gegen Race/Deadlock; **(3)** **unveranderlicher Audit Trail** plus Overdraft- und Currency-Checks.',
          },
          {
            problem: '**Additional Enterprise Experience** (ERP / OTA / CRS / Ticketing)',
            why: 'Diese Domains kombinieren hohe Nebenlaufigkeit, komplexe Regel-Engines und strenge operative Berechtigungsanforderungen.',
            approach:
              'Produktive Lieferung uber mehrere Teams und Domänen. Detaillierte Case Studies sind hier absichtlich verdichtet und konnen im nachsten Update erweitert werden.',
          },
        ],
        saas: [
          {
            problem: '**Cross-System Integrations & Domain Workflows**',
            why: 'ERP-, OTA-, CRS- und Ticketing-Systeme hangen von zuverlassigen Vertragen zwischen Buchung, Bestand, Pricing und Reporting ab.',
            approach:
              'Integrationsgrenzen mit klaren Vertragen, abwartskompatiblen Rollouts und operativen Schutzmechanismen fur Partial-Failure-Szenarien.',
          },
          {
            problem: '**Operational Readiness & Incident Hardening**',
            why: 'Enterprise-Systeme mussen unter Lastspitzen, Retries und partiellen Ausfallen stabil bleiben.',
            approach:
              'Eingesetzt mit Stresstests, Failure-Mode-Validierung und Observability-first-Diagnostik fur erklarbares und wiederherstellbares Produktionsverhalten.',
          },
          {
            problem: '**Additional Case Studies**',
            why: 'Ein fokussiertes Portfolio wirkt starker, wenn jeder Eintrag nachvollziehbare technische Tiefe liefert.',
            approach:
              'Weitere produktionsnahe Breakdowns werden schrittweise erganzt, inklusive Tradeoffs, Architekturentscheidungen und messbaren Ergebnissen.',
          },
        ],
      },
      categories: {
        frontend: 'Frontend-Systeme',
        backend: 'Backend- & Datensysteme',
        saas: 'Zusatzliche Enterprise-Erfahrung',
      },
    },
    contact: {
      title: 'Kontakt',
      heading: 'Kontakt aufnehmen',
      description:
        'Verfügbar für Vertragsarbeit, Beratung und Festanstellungen. Wenn Sie eine technische Herausforderung haben oder ein System, das korrekt gebaut werden muss, freue ich mich auf ein Gespräch.',
      cta: 'Nachricht senden',
    },
    footer: {
      credit: 'Entworfen und gebaut von Mehdi',
    },
  },
} as const;
