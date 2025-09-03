import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export individual types for convenience
export type Project = Database['public']['Tables']['portfolio_projects']['Row'];
export type ProjectInsert = Database['public']['Tables']['portfolio_projects']['Insert'];
export type ProjectUpdate = Database['public']['Tables']['portfolio_projects']['Update'];
export type Category = Database['public']['Tables']['portfolio_categories']['Row'];
export type Tag = Database['public']['Tables']['portfolio_tags']['Row'];
export type TeamMember = Database['public']['Tables']['team_members']['Row'];
export type TeamMemberInsert = Database['public']['Tables']['team_members']['Insert'];
export type TeamMemberUpdate = Database['public']['Tables']['team_members']['Update'];

// Database types
export interface Database {
  public: {
    Tables: {
      portfolio_projects: {
        Row: {
          id: number;
          title: string;
          category: string;
          description: string;
          image: string;
          tags: string[];
          featured: boolean;
          year: string;
          view_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          category: string;
          description: string;
          image: string;
          tags: string[];
          featured: boolean;
          year: string;
          view_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          category?: string;
          description?: string;
          image?: string;
          tags?: string[];
          featured?: boolean;
          year?: string;
          view_url?: string;
          updated_at?: string;
        };
      };
      portfolio_categories: {
        Row: {
          id: string;
          name: string;
          color: string;
          label: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          color: string;
          label: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          color?: string;
          label?: string;
        };
      };
      portfolio_tags: {
        Row: {
          id: string;
          name: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          color: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          color?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          avatar: string;
          bio: string;
          skills: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          avatar: string;
          bio: string;
          skills: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          avatar?: string;
          bio?: string;
          skills?: string[];
          updated_at?: string;
        };
      };
    };
  };
}
