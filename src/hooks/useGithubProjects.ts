import { useState, useEffect } from 'react';
import type { Project } from '../components/ProjectCard';

const projectInsights: Record<string, Partial<Project>> = {
  'Chalooo---Car-Journey-Booking': {
    title: 'Chaloo - Car Journey Booking',
    description: 'An enterprise-grade backend system for inter-city car journey bookings. Features real-time seat locking, dynamic pricing, and automated communication. Built with Spring Boot, MySQL, and JWT authentication.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=300&fit=crop',
    featured: true,
  },
  'sanatanswabhavdoshsarni': {
    title: 'Swabhav Dosh Sarni',
    description: 'A spiritual self-improvement application for personality defect removal. Features 100% local storage, multi-language support (English, Hindi, Marathi, etc.), and Excel export functionality.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=300&fit=crop',
    featured: true,
  },
  'carvilla': {
    title: 'CARVILLA',
    description: 'A modern car dealership platform designed to provide a seamless experience for browsing, comparing, and booking vehicles. Includes user authentication and profile management.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=300&fit=crop',
    featured: true,
  },
  'BootStudentManagementSystem': {
    title: 'Student Management System',
    description: 'A robust Spring Boot application for managing student records, enrollment, and administrative tasks.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=300&fit=crop',
  },
  'ImageProcessingPortal': {
    title: 'Image Processing Portal',
    description: 'Java-based application providing various image manipulation and processing tasks.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=300&fit=crop',
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

            return {
              title: insight.title || repo.name.replace(/-/g, ' '),
              description: insight.description || repo.description || 'A custom project repository developed by Mayur-007S.',
              tags: Array.from(tags),
              stars: repo.stargazers_count,
              githubUrl: repo.html_url,
              liveUrl: repo.homepage || undefined,
              image: insight.image || defaultImages[index % defaultImages.length],
              featured: insight.featured || false,
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
            tags,
            stars: 0,
            githubUrl: `https://github.com/Mayur-007S/${key}`,
            image: insight.image || defaultImages[index % defaultImages.length],
            featured: insight.featured || false,
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
