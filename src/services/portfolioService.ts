import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Project = Database['public']['Tables']['portfolio_projects']['Row'];
type ProjectInsert = Database['public']['Tables']['portfolio_projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['portfolio_projects']['Update'];

type Category = Database['public']['Tables']['portfolio_categories']['Row'];
type Tag = Database['public']['Tables']['portfolio_tags']['Row'];

class PortfolioService {
  private projectsCache: Project[] | null = null;
  private categoriesCache: Category[] | null = null;
  private tagsCache: Tag[] | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private isCacheValid(): boolean {
    return this.cacheTimestamp > 0 && 
           (Date.now() - this.cacheTimestamp) < this.CACHE_DURATION;
  }

  private clearCache(): void {
    this.projectsCache = null;
    this.categoriesCache = null;
    this.tagsCache = null;
    this.cacheTimestamp = 0;
  }

  // Public method to manually clear cache (useful for admin operations)
  public clearAllCache(): void {
    this.clearCache();
  }

  // Get all projects
  async getProjects(): Promise<Project[]> {
    // Return cached data if valid
    if (this.projectsCache && this.isCacheValid()) {
      return this.projectsCache;
    }

    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return [];
      }

      // Cache the result
      this.projectsCache = data || [];
      this.cacheTimestamp = Date.now();
      
      return this.projectsCache;
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  }

  // Save projects (for bulk operations)
  async saveProjects(projects: Project[]): Promise<void> {
    try {
      // Clear existing projects
      const { error: deleteError } = await supabase
        .from('portfolio_projects')
        .delete()
        .neq('id', 0);

      if (deleteError) {
        console.error('Error clearing projects:', deleteError);
        return;
      }

      // Insert new projects
      const { error: insertError } = await supabase
        .from('portfolio_projects')
        .insert(projects);

      if (insertError) {
        console.error('Error inserting projects:', insertError);
      } else {
        // Clear cache after successful modification
        this.clearCache();
      }
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }

  // Add a new project
  async addProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
    try {
      const newProject: ProjectInsert = {
        ...project,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('portfolio_projects')
        .insert(newProject)
        .select()
        .single();

      if (error) {
        console.error('Error adding project:', error);
        return null;
      }

      // Clear cache after successful modification
      this.clearCache();
      return data;
    } catch (error) {
      console.error('Error adding project:', error);
      return null;
    }
  }

  // Update an existing project
  async updateProject(project: Project): Promise<Project | null> {
    try {
      const updateData: ProjectUpdate = {
        ...project,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('portfolio_projects')
        .update(updateData)
        .eq('id', project.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        return null;
      }

      // Clear cache after successful modification
      this.clearCache();
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  }

    // Delete a project
  async deleteProject(projectId: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', projectId);

      if (error) {
        console.error('Error deleting project:', error);
        return false;
      }

      // Clear cache after successful modification
      this.clearCache();
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
      }
  }

  // Get projects by category
  async getProjectsByCategory(category: string): Promise<Project[]> {
    try {
      if (category === 'all') {
        return await this.getProjects();
      }

      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects by category:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error loading projects by category:', error);
      return [];
    }
  }

  // Get featured projects
  async getFeaturedProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching featured projects:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error loading featured projects:', error);
      return [];
    }
  }

  // Initialize with default projects if none exist
  async initializeDefaultProjects(): Promise<void> {
    try {
      const projects = await this.getProjects();
      if (projects.length === 0) {
        const defaultProjects: ProjectInsert[] = [
          {
            title: 'Sample Project',
            category: 'web-design',
            description: 'This is a sample project to demonstrate the new URL functionality. You can add a View URL to make the button functional.',
            image: '/logos/PrimaryLogo.svg',
            tags: ['React', 'TypeScript', 'Material-UI'],
            featured: true,
            year: '2024',
            view_url: 'https://example.com'
          }
        ];

        for (const project of defaultProjects) {
          await this.addProject(project);
        }
      }
    } catch (error) {
      console.error('Error initializing default projects:', error);
    }
  }

  // Get available categories
  async getCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('category');

      if (error) {
        console.error('Error fetching categories:', error);
        return [];
      }

      const categories = new Set(data?.map(p => p.category) || []);
      return Array.from(categories);
    } catch (error) {
      console.error('Error loading categories:', error);
      return [];
    }
  }

  // Get categories with full information
  async getCategoriesWithInfo(): Promise<Category[]> {
    // Return cached data if valid
    if (this.categoriesCache && this.isCacheValid()) {
      return this.categoriesCache;
    }

    try {
      const { data, error } = await supabase
        .from('portfolio_categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories info:', error);
        return [];
      }

      // Cache the result
      this.categoriesCache = data || [];
      this.cacheTimestamp = Date.now();
      
      return this.categoriesCache;
    } catch (error) {
      console.error('Error loading categories info:', error);
      return [];
    }
  }

  // Get category color by category name
  async getCategoryColor(category: string): Promise<string> {
    try {
      const categories = await this.getCategoriesWithInfo();
      const foundCategory = categories.find(cat => cat.name === category);
      return foundCategory ? foundCategory.color : '#95A5A6';
    } catch (error) {
      console.error('Error getting category color:', error);
      return '#95A5A6';
    }
  }

  // Get category label by category name
  getCategoryLabel(category: string): string {
    try {
      if (this.categoriesCache && this.isCacheValid()) {
        const foundCategory = this.categoriesCache.find(cat => cat.name === category);
        return foundCategory ? foundCategory.label : category;
      }
      return category;
    } catch (error) {
      console.error('Error getting category label:', error);
      return category;
    }
  }

  // Get tags with full information
  async getTagsWithInfo(): Promise<Tag[]> {
    // Return cached data if valid
    if (this.tagsCache && this.isCacheValid()) {
      return this.tagsCache;
    }

    try {
      const { data, error } = await supabase
        .from('portfolio_tags')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching tags info:', error);
        return [];
      }

      // Cache the result
      this.tagsCache = data || [];
      this.cacheTimestamp = Date.now();
      
      return this.tagsCache;
    } catch (error) {
      console.error('Error loading tags info:', error);
      return [];
    }
  }

  // Get tag color by tag name
  async getTagColor(tag: string): Promise<string> {
    try {
      const tags = await this.getTagsWithInfo();
      const foundTag = tags.find(t => t.name === tag);
      return foundTag ? foundTag.color : '#4A90E2';
    } catch (error) {
      console.error('Error getting tag color:', error);
      return '#4A90E2';
    }
  }

  // Get available years
  async getYears(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('year');

      if (error) {
        console.error('Error fetching years:', error);
        return [];
      }

      const years = new Set(data?.map(p => p.year) || []);
      return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending
    } catch (error) {
      console.error('Error loading years:', error);
      return [];
    }
  }

  // Upload image to Supabase storage
  async uploadImage(file: File, fileName?: string): Promise<string | null> {
    try {
      // Generate a unique filename if not provided
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = fileName || `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
      const filePath = `projects/${uniqueFileName}`;

      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading image:', error);
        return null;
      }

      // Get public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }

  // Delete image from Supabase storage
  async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      // Extract file path from URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(-2).join('/'); // Get 'projects/filename'

      const { error } = await supabase.storage
        .from('project-images')
        .remove([filePath]);

      if (error) {
        console.error('Error deleting image:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  // Update image in Supabase storage (delete old, upload new)
  async updateImage(oldImageUrl: string, newFile: File, fileName?: string): Promise<string | null> {
    try {
      // Upload new image first
      const newImageUrl = await this.uploadImage(newFile, fileName);
      
      if (newImageUrl) {
        // Delete old image only if new upload was successful
        await this.deleteImage(oldImageUrl);
        return newImageUrl;
      }
      
      return null;
    } catch (error) {
      console.error('Error updating image:', error);
      return null;
    }
  }

  // Get image URL from Supabase storage
  getImageUrl(filePath: string): string {
    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  }

  // Validate image file
  validateImageFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Please upload JPEG, PNG, WebP, SVG, or GIF images.' };
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'File size too large. Please upload images smaller than 10MB.' };
    }

    return { valid: true };
  }

  // Migration helper: Import from localStorage
  async migrateFromLocalStorage(): Promise<void> {
    try {
      const storageKey = 'portfolioProjects';
      const savedProjects = localStorage.getItem(storageKey);
      
      if (savedProjects) {
        const projects = JSON.parse(savedProjects);
        for (const project of projects) {
          // Remove id and add timestamps
          const { id, ...projectData } = project;
          await this.addProject(projectData);
        }
        
        // Clear localStorage after successful migration
        localStorage.removeItem(storageKey);
        console.log('Successfully migrated projects from localStorage to Supabase');
      }
    } catch (error) {
      console.error('Error migrating from localStorage:', error);
    }
  }
}

export const portfolioService = new PortfolioService(); 