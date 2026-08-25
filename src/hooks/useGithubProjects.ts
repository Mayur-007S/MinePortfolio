import { useState, useEffect } from 'react';
import type { Project } from '../components/ProjectCard';

const projectInsights: Record<string, Partial<Project>> = {
  'Chalooo---Car-Journey-Booking': {
    title: 'Chaloo - Car Journey Booking',
    description: 'An enterprise-grade backend system for inter-city car journey bookings with real-time seat locking and dynamic pricing.',
    detailedDescription: 'An enterprise-grade backend microservice architecture for inter-city car journey bookings. Features real-time concurrency-safe seat locking, dynamic surge pricing algorithm, automated SMS/Email confirmations, and role-based JWT authentication.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=300&fit=crop',
    featured: true,
    status: 'Complete',
    progress: 100,
    lastUpdated: 'Aug 24, 2026, 06:15 PM',
    developer: {
      name: 'Mayur Myana',
      role: 'Lead Backend Architect',
      avatar: '/profile.png',
    },
    contributors: [
      { name: 'Mayur Myana', role: 'Core Spring Boot & Microservices', avatar: '/profile.png' },
      { name: 'Database Team', role: 'MySQL Indexing & Concurrency Lock', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    ],
    features: [
      'Real-time pessimistic and optimistic seat locking mechanism to prevent overbooking',
      'Dynamic distance-based fare calculation with surge support',
      'Secure stateless JWT authentication with refresh tokens',
      'Automated email notification dispatcher for booking confirmation',
    ],
    journey: [
      {
        phase: 'Phase 1: Architecture',
        title: 'System Design & ER Diagrams',
        description: 'Designed database schema for multi-seat rides, routes, and transaction lifecycles.',
        status: 'completed',
        date: 'Jan 2026',
      },
      {
        phase: 'Phase 2: Core API',
        title: 'Spring Boot REST Engine',
        description: 'Implemented ride search, booking validation, and payment integration hooks.',
        status: 'completed',
        date: 'Mar 2026',
      },
      {
        phase: 'Phase 3: Concurrency & Lock',
        title: 'Distributed Locking & Stress Testing',
        description: 'Performed JMeter load testing simulating 1,000 concurrent seat reservation requests.',
        status: 'completed',
        date: 'Jun 2026',
      },
      {
        phase: 'Phase 4: Deployment',
        title: 'Cloud Containerization & Release',
        description: 'Dockerized microservice deployment with health monitoring and automated backups.',
        status: 'completed',
        date: 'Aug 2026',
      },
    ],
  },
  'sanatanswabhavdoshsarni': {
    title: 'Swabhav Dosh Sarni',
    description: 'A spiritual self-improvement application for personality defect removal with local storage and multi-language support.',
    detailedDescription: 'A spiritual self-improvement application for personality defect removal (PDR) based on holistic spiritual science. Features 100% offline-first local storage, multi-language localization (English, Hindi, Marathi), defect categorization, and Excel report export functionality.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=300&fit=crop',
    featured: true,
    status: 'Active Development',
    progress: 90,
    lastUpdated: 'Aug 22, 2026, 04:45 PM',
    developer: {
      name: 'Mayur Myana',
      role: 'Full Stack & Mobile Engineer',
      avatar: '/profile.png',
    },
    contributors: [
      { name: 'Mayur Myana', role: 'Lead Developer & Architecture', avatar: '/profile.png' },
      { name: 'Language Reviewers', role: 'Hindi & Marathi Localization', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    ],
    features: [
      '100% offline storage with zero data tracking for complete user privacy',
      'Multi-language interface (English, Hindi, Marathi, etc.)',
      'Monthly self-audit progress charts and Excel workbook exporter',
      'Defect categorization with custom autosuggestions and remedies',
    ],
    journey: [
      {
        phase: 'Phase 1: Conceptualization',
        title: 'Mindset & Self-Audit Framework',
        description: 'Analyzed traditional PDR chart formats and converted them to digital workflows.',
        status: 'completed',
        date: 'Feb 2026',
      },
      {
        phase: 'Phase 2: Local Storage Core',
        title: 'Offline Database & Multi-lingual Logic',
        description: 'Created robust JSON/IndexedDB storage and i18n localization translation matrix.',
        status: 'completed',
        date: 'May 2026',
      },
      {
        phase: 'Phase 3: Excel Reporting',
        title: 'Analytical Charts & Export',
        description: 'Implemented automated spreadsheet formatting and self-reflection metrics.',
        status: 'completed',
        date: 'Jul 2026',
      },
      {
        phase: 'Phase 4: Cloud Sync & Backup',
        title: 'Encrypted Cloud Backup Options',
        description: 'Building optional end-to-end encrypted backup for cross-device sync.',
        status: 'in-progress',
        date: 'Ongoing',
      },
    ],
  },
  'carvilla': {
    title: 'CARVILLA',
    description: 'A modern car dealership platform designed for seamless vehicle browsing, comparisons, and test-drive bookings.',
    detailedDescription: 'A comprehensive modern car dealership portal allowing buyers to explore vehicle inventories, filter by specifications and budget, schedule test drives, and submit financing inquiries.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=300&fit=crop',
    featured: true,
    status: 'Complete',
    progress: 100,
    lastUpdated: 'Aug 18, 2026, 11:20 AM',
    developer: {
      name: 'Mayur Myana',
      role: 'Full Stack Java Developer',
      avatar: '/profile.png',
    },
    contributors: [
      { name: 'Mayur Myana', role: 'Spring Boot Backend & UI Integration', avatar: '/profile.png' },
      { name: 'UI/UX Designer', role: 'Vehicle Showroom Layout Design', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    ],
    features: [
      'Interactive car catalog with high-res multi-angle image gallery',
      'Advanced multi-tier filtering (Make, Model, Transmission, Fuel type, Price)',
      'Online test-drive slot reservation management system',
      'Admin dashboard for real-time inventory management',
    ],
    journey: [
      {
        phase: 'Phase 1: Prototyping',
        title: 'Showroom UI & Catalog Wireframing',
        description: 'Designed vehicle showcase layouts and mobile-responsive filter drawers.',
        status: 'completed',
        date: 'Feb 2026',
      },
      {
        phase: 'Phase 2: Inventory System',
        title: 'CRUD Backend & Media Management',
        description: 'Built Spring Boot endpoints for vehicle listings and image storage.',
        status: 'completed',
        date: 'Apr 2026',
      },
      {
        phase: 'Phase 3: Booking Flow',
        title: 'Test Drive Calendar Scheduling',
        description: 'Connected frontend date-picker with backend slot availability verification.',
        status: 'completed',
        date: 'Jun 2026',
      },
      {
        phase: 'Phase 4: Launch',
        title: 'Production Build & Optimization',
        description: 'Optimized image loading, caching strategies, and deployed live showcase.',
        status: 'completed',
        date: 'Aug 2026',
      },
    ],
  },
  'BootStudentManagementSystem': {
    title: 'Student Management System',
    description: 'A robust Spring Boot application for managing student records, course enrollment, and administrative workflows.',
    detailedDescription: 'An enterprise academic administration suite developed with Spring Boot and relational persistence. Enables academic institutions to manage student admissions, semester enrollments, grading records, and automated transcript generation.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=300&fit=crop',
    featured: false,
    status: 'Complete',
    progress: 100,
    lastUpdated: 'Jul 30, 2026, 02:10 PM',
    developer: {
      name: 'Mayur Myana',
      role: 'Backend Java Developer',
      avatar: '/profile.png',
    },
    contributors: [
      { name: 'Mayur Myana', role: 'Spring Data JPA & Controller Architecture', avatar: '/profile.png' },
    ],
    features: [
      'Complete student lifecycle management from admission to alumni',
      'Role-based access control (Admins, Faculty, Students)',
      'Automated GPA and grade calculation algorithms',
      'Clean JPA relationship modeling with Hibernate validation',
    ],
    journey: [
      {
        phase: 'Phase 1: Domain Modeling',
        title: 'Academic Schema & Entities',
        description: 'Modeled Many-to-Many course enrollments and One-to-Many student grade books.',
        status: 'completed',
        date: 'Mar 2026',
      },
      {
        phase: 'Phase 2: Service Layer',
        title: 'Business Validation & Security',
        description: 'Implemented transaction-safe enrollment caps and role-based authorization.',
        status: 'completed',
        date: 'May 2026',
      },
      {
        phase: 'Phase 3: Testing & Delivery',
        title: 'Integration Tests & Documentation',
        description: 'Wrote unit test coverage for GPA calculators and delivered final release.',
        status: 'completed',
        date: 'Jul 2026',
      },
    ],
  },
  'ImageProcessingPortal': {
    title: 'Image Processing Portal',
    description: 'Java-based application providing image manipulation, pixel filtering, and batch transformation pipelines.',
    detailedDescription: 'A high-performance Java desktop utility for digital image processing and matrix transformations. Implements custom convolution algorithms for edge detection, Gaussian blur, color balance adjustment, and bulk format conversion.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=300&fit=crop',
    featured: false,
    status: 'Complete',
    progress: 100,
    lastUpdated: 'Jun 15, 2026, 10:00 AM',
    developer: {
      name: 'Mayur Myana',
      role: 'Algorithm & Java Developer',
      avatar: '/profile.png',
    },
    contributors: [
      { name: 'Mayur Myana', role: 'Core Matrix Convolution Engine', avatar: '/profile.png' },
    ],
    features: [
      'Custom 2D convolution filters (Sobel Edge, Sharpen, Blur, Emboss)',
      'Histogram equalization for brightness and contrast normalization',
      'Multi-threaded batch processing for processing hundreds of images concurrently',
      'Modular Java Swing GUI with instant before/after preview panes',
    ],
    journey: [
      {
        phase: 'Phase 1: Math Foundations',
        title: 'Pixel Matrix Operations',
        description: 'Engineered custom 2D convolution kernel math and RGB color space transformations.',
        status: 'completed',
        date: 'Feb 2026',
      },
      {
        phase: 'Phase 2: Concurrency',
        title: 'Multi-threaded Processing',
        description: 'Applied Java ExecutorService for concurrent pixel block computation.',
        status: 'completed',
        date: 'Apr 2026',
      },
      {
        phase: 'Phase 3: GUI & Polish',
        title: 'Interactive Desktop Interface',
        description: 'Added intuitive sliders and real-time histogram graphical feedback.',
        status: 'completed',
        date: 'Jun 2026',
      },
    ],
  }
};

const defaultImages = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=300&fit=crop'
];

export function useGithubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('https://api.github.com/users/Mayur-007S/repos?per_page=100&sort=pushed');
        if (!res.ok) throw new Error('Failed to fetch repositories from GitHub');
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid response format from GitHub');
        }

        const mappedProjects: Project[] = data
          .filter((repo: any) => repo.name !== 'Mayur-007S') // exclude profile readme
          .map((repo: any, index: number) => {
            const insight = projectInsights[repo.name] || {};
            
            // Combine topics and language into tags
            const tags = new Set<string>();
            if (repo.language) tags.add(repo.language);
            if (repo.topics && Array.isArray(repo.topics)) {
              repo.topics.forEach((t: string) => tags.add(t));
            }
            if (tags.size === 0) tags.add('Code'); // Fallback tag

            // Format date if available
            const updatedDate = repo.pushed_at
              ? new Date(repo.pushed_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : insight.lastUpdated || 'Recently';

            return {
              title: insight.title || repo.name.replace(/-/g, ' '),
              description: insight.description || repo.description || 'A custom project repository developed by Mayur-007S.',
              detailedDescription: insight.detailedDescription || repo.description,
              tags: Array.from(tags),
              stars: repo.stargazers_count,
              githubUrl: repo.html_url,
              liveUrl: repo.homepage || undefined,
              image: insight.image || defaultImages[index % defaultImages.length],
              featured: insight.featured || false,
              status: insight.status || 'Complete',
              progress: insight.progress ?? 100,
              lastUpdated: insight.lastUpdated || updatedDate,
              developer: insight.developer || {
                name: 'Mayur Myana',
                role: 'Lead Java & Backend Developer',
                avatar: '/profile.png',
              },
              contributors: insight.contributors,
              features: insight.features,
              journey: insight.journey,
            };
          });

        setProjects(mappedProjects);
        setError(null);
      } catch (err: any) {
        console.warn('GitHub API fetch failed. Using fallback project list.', err);
        
        // Generate projects from local projectInsights
        const fallbackList: Project[] = Object.entries(projectInsights).map(([key, insight], index) => {
          let tags = ['Java'];
          if (key === 'Chalooo---Car-Journey-Booking') tags = ['Java', 'Spring Boot', 'MySQL', 'JWT'];
          else if (key === 'sanatanswabhavdoshsarni') tags = ['Java', 'Android', 'Excel', 'Local Storage'];
          else if (key === 'carvilla') tags = ['Java', 'Spring Boot', 'Thymeleaf', 'Bootstrap'];
          else if (key === 'BootStudentManagementSystem') tags = ['Java', 'Spring Boot', 'JSP'];
          else if (key === 'ImageProcessingPortal') tags = ['Java', 'Swing', 'Image Processing'];

          return {
            title: insight.title || key.replace(/-/g, ' '),
            description: insight.description || 'A custom project repository developed by Mayur-007S.',
            detailedDescription: insight.detailedDescription,
            tags,
            stars: 0,
            githubUrl: `https://github.com/Mayur-007S/${key}`,
            image: insight.image || defaultImages[index % defaultImages.length],
            featured: insight.featured || false,
            status: insight.status || 'Complete',
            progress: insight.progress ?? 100,
            lastUpdated: insight.lastUpdated || 'Aug 2026',
            developer: insight.developer || {
              name: 'Mayur Myana',
              role: 'Lead Java Developer',
              avatar: '/profile.png',
            },
            contributors: insight.contributors,
            features: insight.features,
            journey: insight.journey,
          };
        });
        
        setProjects(fallbackList);
        setError(null); // Clear error to allow fallback view
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return { projects, loading, error };
}
