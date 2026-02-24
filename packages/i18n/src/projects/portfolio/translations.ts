export const translations = {
  en: {
    nav: {
      brand: 'Mehdi',
      brandMark: 'M',
      tagline: 'Full-Stack Developer',
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      expertise: 'Expertise',
      contact: 'Contact',
    },
    hero: {
      name: 'Mehdi Rezaei',
      title: 'Full-Stack Developer',
      description: 'I build products end to end: backend services, frontend apps, and delivery pipelines.',
      cta: 'View Projects',
      contact: 'Contact',
      downloadResume: 'Download CV',
      highlightsLabel: 'What I build',
      highlights: [
        'Multi-tenant dashboards with organization switching',
        'Auth and session flows for web products',
        'Subscription and billing integrations',
        'Background job and queue processing',
        'Feature-flag rollout and staged release workflows',
        'Notification workflows across email and in-app channels',
        'Third-party API integrations with retry handling',
        'Admin tooling for operations and support teams',
        'CI/CD pipelines with automated checks',
        'Monitoring and alerting foundations',
        'Technical documentation for faster onboarding',
      ],
      snapshotTitle: 'Outcomes',
      snapshotItems: [
        'Shorter lead time from requirement to release',
        'Fewer production issues with clear system boundaries',
        'Lower support load with better internal tooling',
        'Faster incident response with monitoring and logs',
        'Maintainable codebases as teams scale',
      ],
    },
    about: {
      title: 'About',
      p1: 'Full-Stack Developer with 5+ years building ERP, OTA/CRS, and ticketing products.',
      p2: 'I ship features across backend, frontend, and platform layers.',
      p3: 'I focus on reliability, clear architecture, and fast iteration.',
      focusTitle: 'Working style',
      focusItems: [
        'Define scope from product goals',
        'Keep backend and frontend models aligned',
        'Design for observability and testability',
        'Document decisions for faster delivery',
      ],
    },
    skills: {
      title: 'Core Capabilities',
      subtitle: 'Backend, Frontend, and Delivery',
      description: 'TypeScript stack with practical patterns for building and operating products.',
      caption: 'Delivery-ready',
    },
    projects: {
      title: 'Selected Builds',
      subtitle: 'Built from this repository',
      description: 'Production-style apps from this monorepo with clear scope and implementation depth.',
      empty: 'No projects were detected in the repository.',
      stackLabel: 'Stack',
      pathLabel: 'Repository path',
    },
    expertise: {
      title: 'Architecture & Delivery Expertise',
      subtitle: 'Representative problems solved across financial consistency, query performance, and enterprise operations workflows.',
      whyMatters: 'Business impact:',
      approach: 'Execution:',
      viewSource: 'View code reference',
      categoryLabel: 'Capability',
      back: 'Back to home',
      items: {
        frontend: [
          {
            problem: '**High-Volume Operations Grid**',
            why: 'Operational teams lose throughput when data tables degrade at scale. This build targets **100,000 rows** and **22 columns** while preserving usability.',
            approach:
              'Implemented paginated and virtual modes with progressive loading (**1,200 initial rows**, **2,000-row increments**) plus debounced filtering to keep interaction costs predictable.',
          },
          {
            problem: '**Field-Level Authorization in Dynamic Forms**',
            why: 'UI-only hiding fails audits because blocked fields can still be submitted. Unauthorized writes become a compliance and trust risk.',
            approach:
              'Built a schema-driven permission engine that resolves `editable/readonly/hidden` states and enforces server filtering with `allowedData`, `rejectedFields`, and validation errors.',
          },
          {
            problem: '**Tenant-Aware Operations Dashboard**',
            why: 'Cross-tenant data exposure is a high-impact failure mode in multi-organization products.',
            approach:
              'Designed guarded routes, signed HTTP-only sessions, and membership-validated organization switching to protect access boundaries during day-to-day operations.',
          },
        ],
        backend: [
          {
            problem: '**ACID Ledger Core with Concurrency Control**',
            why: 'Financial systems fail quickly when balances drift under concurrent writes. Reconciliation risk becomes a direct business issue.',
            approach:
              'Implemented atomic `transaction + postings + balances` persistence with deterministic `SELECT ... FOR UPDATE` lock ordering, **up to 200 postings** validation, and **50-concurrent-transfer** test coverage.',
          },
          {
            problem: '**N+1 Query Optimization Framework**',
            why: 'Unbounded relational query growth increases latency and infrastructure cost as usage scales.',
            approach:
              'Built naive, relation-loading, and `LEFT JOIN + JSON_AGG` strategies with per-request SQL telemetry and detector rules on a **100 users x 10 posts** benchmark dataset, including single-query join verification.',
          },
          {
            problem: '**Reservation Workflow Safety Patterns**',
            why: 'Double booking and unsafe retries directly impact revenue, support cost, and customer trust.',
            approach: 'Apply transaction-scoped overlap checks, lock-aware writes, and idempotent API patterns so booking flows stay deterministic under concurrent demand.',
          },
        ],
        saas: [
          {
            problem: '**Cross-System Contract Design**',
            why: 'ERP and travel platforms break when booking, inventory, pricing, and reporting services evolve without explicit contracts.',
            approach: 'Define integration boundaries with backward-compatible rollout plans and fallback behavior for partial-service failure.',
          },
          {
            problem: '**Incident-Ready Delivery**',
            why: 'Senior backend ownership is measured by predictable recovery, not feature throughput alone.',
            approach: 'Apply stress testing, failure-mode validation, and observability-first diagnostics so incidents are explainable and recovery steps are repeatable.',
          },
          {
            problem: '**Architecture Decision Discipline**',
            why: 'Teams slow down when system behavior depends on undocumented assumptions.',
            approach: 'Capture decisions, tradeoffs, and invariants in implementation notes so onboarding and delivery velocity stay high as systems evolve.',
          },
        ],
      },
      categories: {
        frontend: 'Operator Experience Systems',
        backend: 'Backend Reliability Systems',
        saas: 'Cross-Domain System Design',
      },
    },
    contact: {
      title: 'Contact',
      heading: 'Open to full-stack roles and consulting',
      description: 'Available for product development, system design, and architecture work.',
      cta: 'Start the conversation',
    },
    footer: {
      credit: 'Built by Mehdi',
    },
  },
  de: {
    nav: {
      brand: 'Mehdi',
      brandMark: 'M',
      tagline: 'Full-Stack Entwickler',
      home: 'Start',
      about: 'Über mich',
      skills: 'Skills',
      projects: 'Projekte',
      expertise: 'Expertise',
      contact: 'Kontakt',
    },
    hero: {
      name: 'Mehdi Rezaei',
      title: 'Full-Stack Entwickler',
      description: 'Ich baue Produkte Ende zu Ende: Backend-Services, Frontend-Apps und Delivery-Pipelines.',
      cta: 'Projekte ansehen',
      contact: 'Kontakt',
      downloadResume: 'CV herunterladen',
      highlightsLabel: 'Was ich baue',
      highlights: [
        'Mandantenfahige Dashboards mit Organisationswechsel',
        'Auth- und Session-Flows fur Webprodukte',
        'Subscription- und Billing-Integrationen',
        'Background Jobs und Queue-Verarbeitung',
        'Feature-Flag-Rollout und stufenweise Releases',
        'Benachrichtigungs-Workflows fur E-Mail und In-App',
        'Drittanbieter-Integrationen mit Retry-Handling',
        'Admin-Tools fur Operations- und Support-Teams',
        'CI/CD-Pipelines mit automatischen Checks',
        'Monitoring- und Alerting-Grundlagen',
        'Technische Dokumentation fur schnelleres Onboarding',
      ],
      snapshotTitle: 'Ergebnisse',
      snapshotItems: [
        'Kurzerer Weg von Anforderung bis Release',
        'Weniger Produktionsprobleme durch klare Systemgrenzen',
        'Weniger Support-Aufwand durch bessere interne Tools',
        'Schnellere Incident-Reaktion mit Monitoring und Logs',
        'Wartbare Codebasen bei wachsendem Team',
      ],
    },
    about: {
      title: 'Über mich',
      p1: 'Full-Stack Entwickler mit 5+ Jahren in ERP-, OTA/CRS- und Ticketing-Produkten.',
      p2: 'Ich liefere Features uber Backend, Frontend und Plattform.',
      p3: 'Mein Fokus: Zuverlassigkeit, klare Architektur und schnelle Iteration.',
      focusTitle: 'Arbeitsweise',
      focusItems: [
        'Scope aus Produktzielen ableiten',
        'Backend- und Frontend-Modelle konsistent halten',
        'Auf Observability und Testbarkeit auslegen',
        'Entscheidungen dokumentieren fur schnellere Umsetzung',
      ],
    },
    skills: {
      title: 'Kernkompetenzen',
      subtitle: 'Backend, Frontend und Delivery',
      description: 'TypeScript-Stack mit praxistauglichen Mustern fur Build und Betrieb von Produkten.',
      caption: 'Delivery-ready',
    },
    projects: {
      title: 'Projekte',
      subtitle: 'Direkt aus diesem Repository',
      description: 'Produktionsnahe Apps aus diesem Monorepo mit klarem Scope und technischer Tiefe.',
      empty: 'Keine Projekte im Repository gefunden.',
      stackLabel: 'Stack',
      pathLabel: 'Pfad',
    },
    expertise: {
      title: 'Technische Expertise',
      subtitle: 'Diese Eintrage fokussieren auf die schwierigsten Engineering-Probleme aus zwei produktiven Backend-Kernen und Enterprise-Frontend-Arbeit.',
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
            approach: 'Step-Schemata, geschutzte Ubergange und persistenter Draft-State mit einheitlicher Validierungsmap fur konsistente Ergebnisse uber alle Schritte.',
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
            approach: 'Integrationsgrenzen mit klaren Vertragen, abwartskompatiblen Rollouts und operativen Schutzmechanismen fur Partial-Failure-Szenarien.',
          },
          {
            problem: '**Operational Readiness & Incident Hardening**',
            why: 'Enterprise-Systeme mussen unter Lastspitzen, Retries und partiellen Ausfallen stabil bleiben.',
            approach: 'Eingesetzt mit Stresstests, Failure-Mode-Validierung und Observability-first-Diagnostik fur erklarbares und wiederherstellbares Produktionsverhalten.',
          },
          {
            problem: '**Additional Case Studies**',
            why: 'Ein fokussiertes Portfolio wirkt starker, wenn jeder Eintrag nachvollziehbare technische Tiefe liefert.',
            approach: 'Weitere produktionsnahe Breakdowns werden schrittweise erganzt, inklusive Tradeoffs, Architekturentscheidungen und messbaren Ergebnissen.',
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
      heading: 'Offen fur Full-Stack Rollen und Consulting',
      description: 'Verfugbar fur Produktentwicklung, Systemdesign und Architekturarbeit.',
      cta: 'Nachricht senden',
    },
    footer: {
      credit: 'Gebaut von Mehdi',
    },
  },
} as const;

