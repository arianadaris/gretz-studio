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

  // Get personal info
  getPersonalInfo(): PersonalInfo {
    try {
      const savedInfo = localStorage.getItem(this.STORAGE_KEY);
      if (savedInfo) {
        return JSON.parse(savedInfo);
      }
      // Return default info if none is saved
      return {
        name: 'Ariana Gretzema',
        role: 'Creative Director & Founder',
        bio: 'I am passionate about creating meaningful brand experiences that connect with audiences and drive results. With a fresh perspective and dedication to excellence, I bring creativity and vision to every project.',
        avatar: '/photos/AriHeadshot.jpg',
        skills: ['Brand Strategy', 'Creative Direction', 'Visual Design', 'Brand Identity', 'Digital Design', 'Creative Strategy']
      };
    } catch (error) {
      console.error('Error loading personal info:', error);
      return {
        name: 'Ariana Gretzema',
        role: 'Creative Director & Founder',
        bio: 'I am passionate about creating meaningful brand experiences that connect with audiences and drive results. With a fresh perspective and dedication to excellence, I bring creativity and vision to every project.',
        avatar: '/photos/AriHeadshot.jpg',
        skills: ['Brand Strategy', 'Creative Direction', 'Visual Design', 'Brand Identity', 'Digital Design', 'Creative Strategy']
      };
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
  updatePersonalInfo(updates: Partial<PersonalInfo>): PersonalInfo {
    const currentInfo = this.getPersonalInfo();
    const updatedInfo = { ...currentInfo, ...updates };
    this.savePersonalInfo(updatedInfo);
    return updatedInfo;
  }

  // Add a skill
  addSkill(skill: string): PersonalInfo {
    const currentInfo = this.getPersonalInfo();
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
  removeSkill(skill: string): PersonalInfo {
    const currentInfo = this.getPersonalInfo();
    const updatedInfo = {
      ...currentInfo,
      skills: currentInfo.skills.filter(s => s !== skill)
    };
    this.savePersonalInfo(updatedInfo);
    return updatedInfo;
  }

  // Update a skill
  updateSkill(oldSkill: string, newSkill: string): PersonalInfo {
    const currentInfo = this.getPersonalInfo();
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
  getHusbandInfo(): HusbandInfo {
    try {
      const savedInfo = localStorage.getItem(this.HUSBAND_STORAGE_KEY);
      if (savedInfo) {
        return JSON.parse(savedInfo);
      }
      // Return default husband info if none is saved
      return {
        name: 'Cooper Gretzema',
        role: 'Backend Developer & Tech Enthusiast',
        bio: 'My husband has been an incredible support throughout my creative journey. His background in technology and passion for innovation has been instrumental in helping me stay current with the latest trends and tools in the industry. Together, we form a dynamic duo where creativity meets technical expertise.',
        avatar: '/photos/CooperHeadshot.jpg',
        skills: ['Technical Support', 'Creative Feedback', 'Business Strategy', 'Innovation Insights']
      };
    } catch (error) {
      console.error('Error loading husband info:', error);
      return {
        name: 'Cooper Gretzema',
        role: 'Backend Developer & Tech Enthusiast',
        bio: 'My husband has been an incredible support throughout my creative journey. His background in technology and passion for innovation has been instrumental in helping me stay current with the latest trends and tools in the industry. Together, we form a dynamic duo where creativity meets technical expertise.',
        avatar: '/photos/Headshot.jpg',
        skills: ['Technical Support', 'Creative Feedback', 'Business Strategy', 'Innovation Insights']
      };
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
  updateHusbandInfo(updates: Partial<HusbandInfo>): HusbandInfo {
    const currentInfo = this.getHusbandInfo();
    const updatedInfo = { ...currentInfo, ...updates };
    this.saveHusbandInfo(updatedInfo);
    return updatedInfo;
  }

  // Add a husband skill
  addHusbandSkill(skill: string): HusbandInfo {
    const currentInfo = this.getHusbandInfo();
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
  removeHusbandSkill(skill: string): HusbandInfo {
    const currentInfo = this.getHusbandInfo();
    const updatedInfo = {
      ...currentInfo,
      skills: currentInfo.skills.filter(s => s !== skill)
    };
    this.saveHusbandInfo(updatedInfo);
    return updatedInfo;
  }

  // Update a husband skill
  updateHusbandSkill(oldSkill: string, newSkill: string): HusbandInfo {
    const currentInfo = this.getHusbandInfo();
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
}

export const aboutService = new AboutService(); 