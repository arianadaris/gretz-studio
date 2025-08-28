export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
}

class AboutService {
  private readonly STORAGE_KEY = 'aboutPageContent';

  // Get personal info
  getPersonalInfo(): PersonalInfo {
    try {
      const savedInfo = localStorage.getItem(this.STORAGE_KEY);
      if (savedInfo) {
        return JSON.parse(savedInfo);
      }
      // Return default info if none is saved
      return {
        name: 'Ariana Daris',
        role: 'Creative Director & Founder',
        bio: 'I am passionate about creating meaningful brand experiences that connect with audiences and drive results. With a fresh perspective and dedication to excellence, I bring creativity and vision to every project.',
        avatar: '/logos/Headshot.jpg',
        skills: ['Brand Strategy', 'Creative Direction', 'Visual Design', 'Brand Identity', 'Digital Design', 'Creative Strategy']
      };
    } catch (error) {
      console.error('Error loading personal info:', error);
      return {
        name: 'Ariana Daris',
        role: 'Creative Director & Founder',
        bio: 'I am passionate about creating meaningful brand experiences that connect with audiences and drive results. With a fresh perspective and dedication to excellence, I bring creativity and vision to every project.',
        avatar: '/logos/Headshot.jpg',
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
}

export const aboutService = new AboutService(); 