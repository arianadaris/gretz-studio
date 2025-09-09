export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  order: number; // For display ordering
}

export interface TeamInfo {
  members: TeamMember[];
}

// Legacy interfaces for backward compatibility
export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
}

export interface HusbandInfo {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
}

class AboutService {
  private readonly STORAGE_KEY = 'aboutPageContent';
  private readonly HUSBAND_STORAGE_KEY = 'husbandInfo';
  private readonly TEAM_STORAGE_KEY = 'teamInfo';

  // Get personal info
  getPersonalInfo(): PersonalInfo | null {
    try {
      const savedInfo = localStorage.getItem(this.STORAGE_KEY);
      if (savedInfo) {
        return JSON.parse(savedInfo);
      }
      return null;
    } catch (error) {
      console.error('Error loading personal info:', error);
      return null;
    }
  }

  // Save personal info
  savePersonalInfo(info: PersonalInfo): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(info));
    } catch (error) {
      console.error('Error saving personal info:', error);
    }
  }

  // Update personal info
  updatePersonalInfo(updates: Partial<PersonalInfo>): PersonalInfo | null {
    const currentInfo = this.getPersonalInfo();
    if (!currentInfo) return null;
    
    const updatedInfo = { ...currentInfo, ...updates };
    this.savePersonalInfo(updatedInfo);
    return updatedInfo;
  }

  // Add a skill
  addSkill(skill: string): PersonalInfo | null {
    const currentInfo = this.getPersonalInfo();
    if (!currentInfo) return null;
    
    if (!currentInfo.skills.includes(skill)) {
      const updatedInfo = {
        ...currentInfo,
        skills: [...currentInfo.skills, skill]
      };
      this.savePersonalInfo(updatedInfo);
      return updatedInfo;
    }
    return currentInfo;
  }

  // Remove a skill
  removeSkill(skill: string): PersonalInfo | null {
    const currentInfo = this.getPersonalInfo();
    if (!currentInfo) return null;
    
    const updatedInfo = {
      ...currentInfo,
      skills: currentInfo.skills.filter(s => s !== skill)
    };
    this.savePersonalInfo(updatedInfo);
    return updatedInfo;
  }

  // Update a skill
  updateSkill(oldSkill: string, newSkill: string): PersonalInfo | null {
    const currentInfo = this.getPersonalInfo();
    if (!currentInfo) return null;
    
    const skillIndex = currentInfo.skills.indexOf(oldSkill);
    if (skillIndex !== -1) {
      const updatedSkills = [...currentInfo.skills];
      updatedSkills[skillIndex] = newSkill;
      const updatedInfo = {
        ...currentInfo,
        skills: updatedSkills
      };
      this.savePersonalInfo(updatedInfo);
      return updatedInfo;
    }
    return currentInfo;
  }

  // Clear cached data and reset to defaults
  clearCache(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.HUSBAND_STORAGE_KEY);
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  // Get husband info
  getHusbandInfo(): HusbandInfo | null {
    try {
      const savedInfo = localStorage.getItem(this.HUSBAND_STORAGE_KEY);
      if (savedInfo) {
        return JSON.parse(savedInfo);
      }
      return null;
    } catch (error) {
      console.error('Error loading husband info:', error);
      return null;
    }
  }

  // Save husband info
  saveHusbandInfo(info: HusbandInfo): void {
    try {
      localStorage.setItem(this.HUSBAND_STORAGE_KEY, JSON.stringify(info));
    } catch (error) {
      console.error('Error saving husband info:', error);
    }
  }

  // Update husband info
  updateHusbandInfo(updates: Partial<HusbandInfo>): HusbandInfo | null {
    const currentInfo = this.getHusbandInfo();
    if (!currentInfo) return null;
    
    const updatedInfo = { ...currentInfo, ...updates };
    this.saveHusbandInfo(updatedInfo);
    return updatedInfo;
  }

  // Add a husband skill
  addHusbandSkill(skill: string): HusbandInfo | null {
    const currentInfo = this.getHusbandInfo();
    if (!currentInfo) return null;
    
    if (!currentInfo.skills.includes(skill)) {
      const updatedInfo = {
        ...currentInfo,
        skills: [...currentInfo.skills, skill]
      };
      this.saveHusbandInfo(updatedInfo);
      return updatedInfo;
    }
    return currentInfo;
  }

  // Remove a husband skill
  removeHusbandSkill(skill: string): HusbandInfo | null {
    const currentInfo = this.getHusbandInfo();
    if (!currentInfo) return null;
    
    const updatedInfo = {
      ...currentInfo,
      skills: currentInfo.skills.filter(s => s !== skill)
    };
    this.saveHusbandInfo(updatedInfo);
    return updatedInfo;
  }

  // Update a husband skill
  updateHusbandSkill(oldSkill: string, newSkill: string): HusbandInfo | null {
    const currentInfo = this.getHusbandInfo();
    if (!currentInfo) return null;
    
    const skillIndex = currentInfo.skills.indexOf(oldSkill);
    if (skillIndex !== -1) {
      const updatedSkills = [...currentInfo.skills];
      updatedSkills[skillIndex] = newSkill;
      const updatedInfo = {
        ...currentInfo,
        skills: updatedSkills
      };
      this.saveHusbandInfo(updatedInfo);
      return updatedInfo;
    }
    return currentInfo;
  }

  // Team Info Methods
  
  // Get team info
  getTeamInfo(): TeamInfo | null {
    try {
      const savedInfo = localStorage.getItem(this.TEAM_STORAGE_KEY);
      if (savedInfo) {
        return JSON.parse(savedInfo);
      }
      return null;
    } catch (error) {
      console.error('Error loading team info:', error);
      return null;
    }
  }

  // Save team info
  saveTeamInfo(info: TeamInfo): void {
    try {
      localStorage.setItem(this.TEAM_STORAGE_KEY, JSON.stringify(info));
    } catch (error) {
      console.error('Error saving team info:', error);
    }
  }

  // Update team info
  updateTeamInfo(updates: Partial<TeamInfo>): TeamInfo | null {
    const currentInfo = this.getTeamInfo();
    if (!currentInfo) return null;
    
    const updatedInfo = { ...currentInfo, ...updates };
    this.saveTeamInfo(updatedInfo);
    return updatedInfo;
  }

  // Add a team member
  addTeamMember(member: TeamMember): TeamInfo | null {
    let currentInfo = this.getTeamInfo();
    if (!currentInfo) {
      currentInfo = { members: [] };
    }
    
    const updatedInfo = {
      ...currentInfo,
      members: [...currentInfo.members, member].sort((a, b) => a.order - b.order)
    };
    this.saveTeamInfo(updatedInfo);
    return updatedInfo;
  }

  // Update a team member
  updateTeamMember(memberId: string, updates: Partial<TeamMember>): TeamInfo | null {
    const currentInfo = this.getTeamInfo();
    if (!currentInfo) return null;
    
    const memberIndex = currentInfo.members.findIndex(member => member.id === memberId);
    if (memberIndex === -1) return currentInfo;
    
    const updatedMembers = [...currentInfo.members];
    updatedMembers[memberIndex] = { ...updatedMembers[memberIndex], ...updates };
    
    const updatedInfo = {
      ...currentInfo,
      members: updatedMembers.sort((a, b) => a.order - b.order)
    };
    this.saveTeamInfo(updatedInfo);
    return updatedInfo;
  }

  // Remove a team member
  removeTeamMember(memberId: string): TeamInfo | null {
    const currentInfo = this.getTeamInfo();
    if (!currentInfo) return null;
    
    const updatedInfo = {
      ...currentInfo,
      members: currentInfo.members.filter(member => member.id !== memberId)
    };
    this.saveTeamInfo(updatedInfo);
    return updatedInfo;
  }

  // Add skill to a team member
  addTeamMemberSkill(memberId: string, skill: string): TeamInfo | null {
    const currentInfo = this.getTeamInfo();
    if (!currentInfo) return null;
    
    const memberIndex = currentInfo.members.findIndex(member => member.id === memberId);
    if (memberIndex === -1) return currentInfo;
    
    const member = currentInfo.members[memberIndex];
    if (member.skills.includes(skill)) return currentInfo;
    
    const updatedMembers = [...currentInfo.members];
    updatedMembers[memberIndex] = {
      ...member,
      skills: [...member.skills, skill]
    };
    
    const updatedInfo = {
      ...currentInfo,
      members: updatedMembers
    };
    this.saveTeamInfo(updatedInfo);
    return updatedInfo;
  }

  // Remove skill from a team member
  removeTeamMemberSkill(memberId: string, skill: string): TeamInfo | null {
    const currentInfo = this.getTeamInfo();
    if (!currentInfo) return null;
    
    const memberIndex = currentInfo.members.findIndex(member => member.id === memberId);
    if (memberIndex === -1) return currentInfo;
    
    const member = currentInfo.members[memberIndex];
    const updatedMembers = [...currentInfo.members];
    updatedMembers[memberIndex] = {
      ...member,
      skills: member.skills.filter(s => s !== skill)
    };
    
    const updatedInfo = {
      ...currentInfo,
      members: updatedMembers
    };
    this.saveTeamInfo(updatedInfo);
    return updatedInfo;
  }

  // Clear all cached data
  clearAllCache(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.HUSBAND_STORAGE_KEY);
      localStorage.removeItem(this.TEAM_STORAGE_KEY);
      console.log('All cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

export const aboutService = new AboutService(); 