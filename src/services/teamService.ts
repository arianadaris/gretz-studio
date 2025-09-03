import { supabase } from '../lib/supabase';
import type { TeamMember, TeamMemberInsert, TeamMemberUpdate } from '../lib/supabase';

export const teamService = {
  // Get all team members
  async getTeamMembers(): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }

    return data || [];
  },

  // Get a specific team member by ID
  async getTeamMember(id: string): Promise<TeamMember | null> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching team member:', error);
      throw error;
    }

    return data;
  },

  // Create a new team member
  async createTeamMember(member: TeamMemberInsert): Promise<TeamMember> {
    const { data, error } = await supabase
      .from('team_members')
      .insert([member])
      .select()
      .single();

    if (error) {
      console.error('Error creating team member:', error);
      throw error;
    }

    return data;
  },

  // Update an existing team member
  async updateTeamMember(id: string, updates: TeamMemberUpdate): Promise<TeamMember> {
    const { data, error } = await supabase
      .from('team_members')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating team member:', error);
      throw error;
    }

    return data;
  },

  // Delete a team member
  async deleteTeamMember(id: string): Promise<void> {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
  },

  // Initialize default team members if none exist
  async initializeDefaultTeamMembers(): Promise<void> {
    const existingMembers = await this.getTeamMembers();
    
    if (existingMembers.length === 0) {
      // Create Ariana's profile
      await this.createTeamMember({
        id: 'ariana',
        name: 'Ariana',
        role: 'Founder & Creative Director',
        avatar: '/photos/Headshot.jpg',
        bio: 'Strategic creative director with a passion for building meaningful brands and experiences.',
        skills: ['Brand Strategy', 'Creative Direction', 'User Experience', 'Team Leadership']
      });

      // Create Cooper's profile
      await this.createTeamMember({
        id: 'cooper',
        name: 'Cooper',
        role: 'Co-Founder & Creative Director',
        avatar: '/photos/CooperHeadshot.jpg',
        bio: 'Creative visionary and strategic partner, bringing innovative design solutions to life.',
        skills: ['Creative Direction', 'Brand Strategy', 'Visual Design', 'Team Leadership']
      });
    }
  },

  // Get team member by name (for easy access)
  async getTeamMemberByName(name: string): Promise<TeamMember | null> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('name', name)
      .single();

    if (error) {
      console.error('Error fetching team member by name:', error);
      return null;
    }

    return data;
  }
};
