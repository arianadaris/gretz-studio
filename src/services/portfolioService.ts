export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
  year: string;
}

class PortfolioService {
  private readonly STORAGE_KEY = 'portfolioProjects';

  // Get all projects
  getProjects(): Project[] {
    try {
      const savedProjects = localStorage.getItem(this.STORAGE_KEY);
      return savedProjects ? JSON.parse(savedProjects) : [];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  }

  // Save projects
  saveProjects(projects: Project[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }

  // Add a new project
  addProject(project: Omit<Project, 'id'>): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...project,
      id: Date.now()
    };
    projects.push(newProject);
    this.saveProjects(projects);
    return newProject;
  }

  // Update an existing project
  updateProject(project: Project): Project | null {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      projects[index] = project;
      this.saveProjects(projects);
      return project;
    }
    return null;
  }

  // Delete a project
  deleteProject(projectId: number): boolean {
    const projects = this.getProjects();
    const filteredProjects = projects.filter(p => p.id !== projectId);
    if (filteredProjects.length !== projects.length) {
      this.saveProjects(filteredProjects);
      return true;
    }
    return false;
  }

  // Get projects by category
  getProjectsByCategory(category: string): Project[] {
    const projects = this.getProjects();
    return category === 'all' 
      ? projects 
      : projects.filter(project => project.category === category);
  }

  // Get featured projects
  getFeaturedProjects(): Project[] {
    const projects = this.getProjects();
    return projects.filter(project => project.featured);
  }

  // Initialize with default projects if none exist
  initializeDefaultProjects(): void {
    const projects = this.getProjects();
    if (projects.length === 0) {
      const defaultProjects: Project[] = [];
      this.saveProjects(defaultProjects);
    }
  }

  // Get available categories
  getCategories(): string[] {
    const projects = this.getProjects();
    const categories = new Set(projects.map(p => p.category));
    return Array.from(categories);
  }

  // Get categories with full information (from settings)
  getCategoriesWithInfo(): Array<{id: string, name: string, color: string, label: string}> {
    try {
      const savedCategories = localStorage.getItem('portfolioCategories');
      if (savedCategories) {
        return JSON.parse(savedCategories);
      }
      return [];
    } catch (error) {
      console.error('Error loading categories:', error);
      return [];
    }
  }

  // Get category color by category name
  getCategoryColor(category: string): string {
    const categories = this.getCategoriesWithInfo();
    const foundCategory = categories.find(cat => cat.name === category);
    return foundCategory ? foundCategory.color : '#95A5A6';
  }

  // Get category label by category name
  getCategoryLabel(category: string): string {
    const categories = this.getCategoriesWithInfo();
    const foundCategory = categories.find(cat => cat.name === category);
    return foundCategory ? foundCategory.label : category;
  }

  // Get tags with full information (from settings)
  getTagsWithInfo(): Array<{id: string, name: string, color: string}> {
    try {
      const savedTags = localStorage.getItem('portfolioTags');
      if (savedTags) {
        return JSON.parse(savedTags);
      }
      // Return default tags if none are saved
      return [];
    } catch (error) {
      console.error('Error loading tags:', error);
      return [];
    }
  }

  // Get tag color by tag name
  getTagColor(tag: string): string {
    const tags = this.getTagsWithInfo();
    const foundTag = tags.find(t => t.name === tag);
    return foundTag ? foundTag.color : '#FF6B6B';
  }

  // Get available years
  getYears(): string[] {
    const projects = this.getProjects();
    const years = new Set(projects.map(p => p.year));
    return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending
  }
}

export const portfolioService = new PortfolioService(); 