import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import Settings from '@mui/icons-material/Settings';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Person from '@mui/icons-material/Person';
import Save from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { aboutService, PersonalInfo, TeamInfo, TeamMember as AboutTeamMember } from '../../services/aboutService';
import { teamService } from '../../services/teamService';
import type { TeamMember } from '../../lib/supabase';
import { useThemeContext } from '../../contexts/ThemeContext';

interface Category {
  id: string;
  name: string;
  color: string;
  label: string;
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

const AdminSettings: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
        const [newCategory, setNewCategory] = useState({ name: '', label: '', color: '#4A90E2' });
  const [newTag, setNewTag] = useState({ name: '', color: '#4A90E2' });
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  
  // About Page state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const savedInfo = aboutService.getPersonalInfo();
    if (savedInfo) return savedInfo;
    
    // Return default data if none is saved
    return {
      name: 'Ariana Gretzema',
      role: 'Creative Director & Founder',
      bio: 'I am passionate about creating meaningful brand experiences that connect with audiences and drive results. With a fresh perspective and dedication to excellence, I bring creativity and vision to every project.',
      avatar: '/photos/AriHeadshot.jpg',
      skills: ['Brand Strategy', 'Creative Direction', 'Visual Design', 'Brand Identity', 'Digital Design', 'Creative Strategy']
    };
  });
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState('');
  const [aboutExpanded, setAboutExpanded] = useState(false);
  
  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [arianaInfo, setArianaInfo] = useState<TeamMember | null>(null);
  const [cooperInfo, setCooperInfo] = useState<TeamMember | null>(null);
  const [editingArianaSkill, setEditingArianaSkill] = useState<string | null>(null);
  const [newArianaSkill, setNewArianaSkill] = useState('');
  const [editingCooperSkill, setEditingCooperSkill] = useState<string | null>(null);
  const [newCooperSkill, setNewCooperSkill] = useState('');
  const [arianaExpanded, setArianaExpanded] = useState(false);
  const [cooperExpanded, setCooperExpanded] = useState(false);
  
  // Save state management
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Track original data for comparison
  const [originalArianaInfo, setOriginalArianaInfo] = useState<TeamMember | null>(null);
  const [originalCooperInfo, setOriginalCooperInfo] = useState<TeamMember | null>(null);
  const [originalPersonalInfo, setOriginalPersonalInfo] = useState<PersonalInfo | null>(null);

  
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();

  // Pre-set tag colors based on theme
  const tagColors = [
    { value: theme.palette.tagColors.blue, label: 'Blue', color: theme.palette.tagColors.blue },
    { value: theme.palette.tagColors.green, label: 'Green', color: theme.palette.tagColors.green },
    { value: theme.palette.tagColors.teal, label: 'Teal', color: theme.palette.tagColors.teal },
    { value: theme.palette.tagColors.skyBlue, label: 'Sky Blue', color: theme.palette.tagColors.skyBlue },
    { value: theme.palette.tagColors.lilac, label: 'Lilac', color: theme.palette.tagColors.lilac }
  ];

  useEffect(() => {
    // Load team members from database
    const loadTeamMembers = async () => {
      try {
        await teamService.initializeDefaultTeamMembers();
        const members = await teamService.getTeamMembers();
        setTeamMembers(members);
        
        // Set individual member info
        const ariana = members.find(m => m.id === 'ariana');
        const cooper = members.find(m => m.id === 'cooper');
        
        if (ariana) {
          setArianaInfo(ariana);
          setOriginalArianaInfo(JSON.parse(JSON.stringify(ariana))); // Deep copy
        }
        if (cooper) {
          setCooperInfo(cooper);
          setOriginalCooperInfo(JSON.parse(JSON.stringify(cooper))); // Deep copy
        }
      } catch (error) {
        console.error('Error loading team members:', error);
      }
    };

    // Load categories from localStorage if they exist
    const savedCategories = localStorage.getItem('portfolioCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }

    // Load tags from localStorage if they exist
    const savedTags = localStorage.getItem('portfolioTags');
    if (savedTags) {
      setTags(JSON.parse(savedTags));
    }

    loadTeamMembers();
    
    // Set original personal info
    setOriginalPersonalInfo(JSON.parse(JSON.stringify(personalInfo)));
  }, []);

  const saveCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
    localStorage.setItem('portfolioCategories', JSON.stringify(updatedCategories));
  };

  const saveTags = (updatedTags: Tag[]) => {
    setTags(updatedTags);
    localStorage.setItem('portfolioTags', JSON.stringify(updatedTags));
  };

  // Check if there are unsaved changes
  const checkForUnsavedChanges = () => {
    const arianaChanged = originalArianaInfo && arianaInfo && 
      JSON.stringify(originalArianaInfo) !== JSON.stringify(arianaInfo);
    const cooperChanged = originalCooperInfo && cooperInfo && 
      JSON.stringify(originalCooperInfo) !== JSON.stringify(cooperInfo);
    const personalChanged = originalPersonalInfo && 
      JSON.stringify(originalPersonalInfo) !== JSON.stringify(personalInfo);
    
    const hasChanges = Boolean(arianaChanged || cooperChanged || personalChanged);
    setHasUnsavedChanges(hasChanges);
    return hasChanges;
  };

  // Effect to check for changes whenever relevant state updates
  useEffect(() => {
    checkForUnsavedChanges();
  }, [arianaInfo, cooperInfo, personalInfo, originalArianaInfo, originalCooperInfo, originalPersonalInfo]);

  // Add beforeunload event listener to warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Batch save all changes
  const handleSaveAllChanges = async () => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      const promises = [];
      
      // Save Ariana's info if changed
      if (originalArianaInfo && arianaInfo && 
          JSON.stringify(originalArianaInfo) !== JSON.stringify(arianaInfo)) {
        promises.push(teamService.updateTeamMember(arianaInfo.id, arianaInfo));
      }
      
      // Save Cooper's info if changed
      if (originalCooperInfo && cooperInfo && 
          JSON.stringify(originalCooperInfo) !== JSON.stringify(cooperInfo)) {
        promises.push(teamService.updateTeamMember(cooperInfo.id, cooperInfo));
      }
      
      // Save personal info if changed (localStorage - synchronous)
      if (originalPersonalInfo && 
          JSON.stringify(originalPersonalInfo) !== JSON.stringify(personalInfo)) {
        aboutService.savePersonalInfo(personalInfo);
      }
      
      // Wait for all database operations to complete
      if (promises.length > 0) {
        await Promise.all(promises);
      }
      
      // Update original data to match current data
      if (arianaInfo) setOriginalArianaInfo(JSON.parse(JSON.stringify(arianaInfo)));
      if (cooperInfo) setOriginalCooperInfo(JSON.parse(JSON.stringify(cooperInfo)));
      setOriginalPersonalInfo(JSON.parse(JSON.stringify(personalInfo)));
      
      // Update team members state
      setTeamMembers(prev => prev.map(m => {
        if (m.id === 'ariana' && arianaInfo) return arianaInfo;
        if (m.id === 'cooper' && cooperInfo) return cooperInfo;
        return m;
      }));
      
      setHasUnsavedChanges(false);
      setSaveSuccess(true);
      
    } catch (error) {
      console.error('Error saving changes:', error);
      setSaveError('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.label) {
      const categoryId = newCategory.label.toLowerCase().replace(/\s+/g, '-');
      const category: Category = {
        id: categoryId,
        name: categoryId,
        label: newCategory.label,
        color: newCategory.color
      };
      
      const updatedCategories = [...categories, category];
      saveCategories(updatedCategories);
      setNewCategory({ name: '', label: '', color: theme.palette.tagColors.blue });
      setIsAdding(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({
      name: '',
      label: category.label,
      color: category.color
    });
    setIsAdding(true);
  };

  const handleUpdateCategory = () => {
    if (editingCategory && newCategory.label) {
      const categoryId = newCategory.label.toLowerCase().replace(/\s+/g, '-');
      const updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id 
          ? {
              ...cat,
              name: categoryId,
              label: newCategory.label,
              color: newCategory.color
            }
          : cat
      );
      saveCategories(updatedCategories);
      setEditingCategory(null);
      setNewCategory({ name: '', label: '', color: theme.palette.tagColors.blue });
      setIsAdding(false);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This will affect all projects using this category.')) {
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      saveCategories(updatedCategories);
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setNewCategory({ name: '', label: '', color: theme.palette.tagColors.blue });
    setIsAdding(false);
  };

  // Tag management functions
  const handleAddTag = () => {
    if (newTag.name) {
      const tag: Tag = {
        id: newTag.name.toLowerCase().replace(/\s+/g, '-'),
        name: newTag.name,
        color: newTag.color
      };
      
      const updatedTags = [...tags, tag];
      saveTags(updatedTags);
      setNewTag({ name: '', color: theme.palette.tagColors.blue });
      setIsAddingTag(false);
    }
  };

  const handleEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setNewTag({
      name: tag.name,
      color: tag.color
    });
    setIsAddingTag(true);
  };

  const handleUpdateTag = () => {
    if (editingTag && newTag.name) {
      const updatedTags = tags.map(tag => 
        tag.id === editingTag.id 
          ? {
              ...tag,
              name: newTag.name,
              color: newTag.color
            }
          : tag
      );
      saveTags(updatedTags);
      setEditingTag(null);
      setNewTag({ name: '', color: theme.palette.tagColors.blue });
      setIsAddingTag(false);
    }
  };

  const handleDeleteTag = (tagId: string) => {
    if (window.confirm('Are you sure you want to delete this tag? This will affect all projects using this tag.')) {
      const updatedTags = tags.filter(tag => tag.id !== tagId);
      saveTags(updatedTags);
    }
  };

  const handleCancelTag = () => {
    setEditingTag(null);
    setNewTag({ name: '', color: '#4A90E2' });
    setIsAddingTag(false);
  };

  const handleCategoryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editingCategory) {
        handleUpdateCategory();
      } else {
        handleAddCategory();
      }
    }
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editingTag) {
        handleUpdateTag();
      } else {
        handleAddTag();
      }
    }
  };

  const handleCategoriesChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setCategoriesExpanded(isExpanded);
  };

  const handleTagsChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setTagsExpanded(isExpanded);
  };

  // About Page management functions
  const handlePersonalInfoUpdate = (field: keyof PersonalInfo, value: string | string[]) => {
    const updatedInfo = { ...personalInfo, [field]: value };
    setPersonalInfo(updatedInfo);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...personalInfo.skills, newSkill.trim()];
      setPersonalInfo({ ...personalInfo, skills: updatedSkills });
      setNewSkill('');
    }
  };

  const handleEditSkill = (skill: string) => {
    setEditingSkill(skill);
    setNewSkill(skill);
  };

  const handleUpdateSkill = () => {
    if (editingSkill && newSkill.trim()) {
      const updatedSkills = personalInfo.skills.map(s => s === editingSkill ? newSkill.trim() : s);
      setPersonalInfo({ ...personalInfo, skills: updatedSkills });
      setEditingSkill(null);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (skill: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      const updatedSkills = personalInfo.skills.filter(s => s !== skill);
      setPersonalInfo({ ...personalInfo, skills: updatedSkills });
    }
  };

  const handleCancelSkill = () => {
    setEditingSkill(null);
    setNewSkill('');
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editingSkill) {
        handleUpdateSkill();
      } else {
        handleAddSkill();
      }
    }
  };

  const handleAboutChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setAboutExpanded(isExpanded);
  };

  // Team member information management functions
  const handleArianaInfoUpdate = (field: keyof TeamMember, value: string | string[]) => {
    if (!arianaInfo) return;
    
    const updatedInfo = { ...arianaInfo, [field]: value };
    setArianaInfo(updatedInfo);
  };

  const handleCooperInfoUpdate = (field: keyof TeamMember, value: string | string[]) => {
    if (!cooperInfo) return;
    
    const updatedInfo = { ...cooperInfo, [field]: value };
    setCooperInfo(updatedInfo);
  };

  // Ariana skills management
  const handleAddArianaSkill = () => {
    if (!arianaInfo || !newArianaSkill.trim()) return;
    
    const updatedSkills = [...arianaInfo.skills, newArianaSkill.trim()];
    setArianaInfo({ ...arianaInfo, skills: updatedSkills });
    setNewArianaSkill('');
  };

  const handleEditArianaSkill = (skill: string) => {
    setEditingArianaSkill(skill);
    setNewArianaSkill(skill);
  };

  const handleUpdateArianaSkill = () => {
    if (!arianaInfo || !editingArianaSkill || !newArianaSkill.trim()) return;
    
    const updatedSkills = arianaInfo.skills.map(s => s === editingArianaSkill ? newArianaSkill.trim() : s);
    setArianaInfo({ ...arianaInfo, skills: updatedSkills });
    setEditingArianaSkill(null);
    setNewArianaSkill('');
  };

  const handleDeleteArianaSkill = (skill: string) => {
    if (!arianaInfo || !window.confirm('Are you sure you want to delete this skill?')) return;
    
    const updatedSkills = arianaInfo.skills.filter(s => s !== skill);
    setArianaInfo({ ...arianaInfo, skills: updatedSkills });
  };

  const handleCancelArianaSkill = () => {
    setEditingArianaSkill(null);
    setNewArianaSkill('');
  };

  const handleArianaSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editingArianaSkill) {
        handleUpdateArianaSkill();
      } else {
        handleAddArianaSkill();
      }
    }
  };

  // Cooper skills management
  const handleAddCooperSkill = () => {
    if (!cooperInfo || !newCooperSkill.trim()) return;
    
    const updatedSkills = [...cooperInfo.skills, newCooperSkill.trim()];
    setCooperInfo({ ...cooperInfo, skills: updatedSkills });
    setNewCooperSkill('');
  };

  const handleEditCooperSkill = (skill: string) => {
    setEditingCooperSkill(skill);
    setNewCooperSkill(skill);
  };

  const handleUpdateCooperSkill = () => {
    if (!cooperInfo || !editingCooperSkill || !newCooperSkill.trim()) return;
    
    const updatedSkills = cooperInfo.skills.map(s => s === editingCooperSkill ? newCooperSkill.trim() : s);
    setCooperInfo({ ...cooperInfo, skills: updatedSkills });
    setEditingCooperSkill(null);
    setNewCooperSkill('');
  };

  const handleDeleteCooperSkill = (skill: string) => {
    if (!cooperInfo || !window.confirm('Are you sure you want to delete this skill?')) return;
    
    const updatedSkills = cooperInfo.skills.filter(s => s !== skill);
    setCooperInfo({ ...cooperInfo, skills: updatedSkills });
  };

  const handleCancelCooperSkill = () => {
    setEditingCooperSkill(null);
    setNewCooperSkill('');
  };

  const handleCooperSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editingCooperSkill) {
        handleUpdateCooperSkill();
      } else {
        handleAddCooperSkill();
      }
    }
  };

  const handleArianaChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setArianaExpanded(isExpanded);
  };

  const handleCooperChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setCooperExpanded(isExpanded);
  };

  return (
          <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.backgrounds.admin }}>
      {/* Admin App Bar */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: isDarkMode ? theme.palette.backgrounds.admin : 'white', 
          color: 'text.primary', 
          boxShadow: 1 
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img 
              src="/logos/PrimaryLogo.svg" 
              alt="Gretz Studio" 
              style={{ 
                height: '40px', 
                width: 'auto',
                maxWidth: '150px',
                filter: isDarkMode ? 'brightness(0) invert(1)' : 'none'
              }} 
            />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, fontFamily: 'BearNose, Georgia, serif', color: 'admin.main' }}>
            Settings
            {hasUnsavedChanges && (
              <Chip 
                label="Unsaved Changes" 
                size="small" 
                color="warning" 
                sx={{ ml: 2, fontSize: '0.75rem' }}
              />
            )}
          </Typography>
          
          {/* Save Changes Button */}
          <Button
            variant="contained"
            startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <Save />}
            onClick={handleSaveAllChanges}
            disabled={!hasUnsavedChanges || isSaving}
            sx={{ 
              mr: 2,
              bgcolor: hasUnsavedChanges ? 'primary.main' : 'grey.400',
              '&:hover': {
                bgcolor: hasUnsavedChanges ? 'primary.dark' : 'grey.500'
              }
            }}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          
          <IconButton onClick={() => navigate('/admin/dashboard')} color="inherit">
            <ArrowBack />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* About Page Management */}
          <Grid item xs={12}>
            <Accordion 
              expanded={arianaExpanded} 
              onChange={handleArianaChange('ariana')}
              sx={{ 
                bgcolor: isDarkMode ? theme.palette.backgrounds.card : 'white', 
                borderRadius: 2,
                '&:before': { display: 'none' },
                border: `1px solid ${theme.palette.borders.light}`,
                background: isDarkMode ? theme.palette.gradients.card : 'white',
                boxShadow: isDarkMode ? `0 10px 30px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Person sx={{ color: 'secondary.main' }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600, fontFamily: 'BearNose, Georgia, serif', color: 'admin.main' }}>
                    Ariana's Information
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                                     <Grid item xs={12} md={6}>
                     <TextField
                       fullWidth
                       label="Name"
                       value={arianaInfo?.name || ''}
                       onChange={(e) => handleArianaInfoUpdate('name', e.target.value)}
                       sx={{ mb: 2 }}
                     />
                     <TextField
                       fullWidth
                       label="Role/Title"
                       value={arianaInfo?.role || ''}
                       onChange={(e) => handleArianaInfoUpdate('role', e.target.value)}
                       sx={{ mb: 2 }}
                     />
                     <TextField
                       fullWidth
                       label="Avatar Image URL"
                       value={arianaInfo?.avatar || ''}
                       onChange={(e) => handleArianaInfoUpdate('avatar', e.target.value)}
                       placeholder="/photos/Headshot.jpg"
                       sx={{ mb: 2 }}
                     />
                   </Grid>
                   <Grid item xs={12} md={6}>
                     <TextField
                       fullWidth
                       multiline
                       rows={4}
                       label="Bio/Description"
                       value={arianaInfo?.bio || ''}
                       onChange={(e) => handleArianaInfoUpdate('bio', e.target.value)}
                       sx={{ mb: 2 }}
                     />
                   </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'admin.main' }}>
                      Specializations/Skills
                    </Typography>
                    
                                         {/* Add new skill */}
                     <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                       <TextField
                         fullWidth
                         label="Add new skill"
                         value={newArianaSkill}
                         onChange={(e) => setNewArianaSkill(e.target.value)}
                         onKeyPress={handleArianaSkillKeyPress}
                         placeholder="e.g., Brand Strategy"
                       />
                       <Button 
                         variant="contained" 
                         onClick={editingArianaSkill ? handleUpdateArianaSkill : handleAddArianaSkill}
                         disabled={!newArianaSkill.trim()}
                       >
                         {editingArianaSkill ? 'Update' : 'Add'}
                       </Button>
                       {editingArianaSkill && (
                         <Button variant="outlined" onClick={handleCancelArianaSkill}>
                           Cancel
                         </Button>
                       )}
                     </Box>

                     {/* Skills list */}
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                       {arianaInfo?.skills?.map((skill, index) => (
                         <Chip
                           key={index}
                           label={skill}
                           onDelete={() => handleDeleteArianaSkill(skill)}
                           onClick={() => handleEditArianaSkill(skill)}
                           sx={{ 
                             bgcolor: `${theme.palette.secondary.main}1A`, 
                             color: 'secondary.main',
                             fontWeight: 500,
                             cursor: 'pointer'
                           }}
                         />
                       )) || []}
                     </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Cooper Information Management */}
          <Grid item xs={12}>
            <Accordion 
              expanded={cooperExpanded} 
              onChange={handleCooperChange('cooper')}
              sx={{ 
                bgcolor: isDarkMode ? theme.palette.backgrounds.card : 'white', 
                borderRadius: 2,
                '&:before': { display: 'none' },
                border: `1px solid ${theme.palette.borders.light}`,
                background: isDarkMode ? theme.palette.gradients.card : 'white',
                boxShadow: isDarkMode ? `0 10px 30px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Person sx={{ color: 'secondary.main' }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600, fontFamily: 'BearNose, Georgia, serif', color: 'admin.main' }}>
                    Cooper's Information
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={cooperInfo?.name || ''}
                      onChange={(e) => handleCooperInfoUpdate('name', e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Role/Title"
                      value={cooperInfo?.role || ''}
                      onChange={(e) => handleCooperInfoUpdate('role', e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Avatar Image URL"
                      value={cooperInfo?.avatar || ''}
                      onChange={(e) => handleCooperInfoUpdate('avatar', e.target.value)}
                      placeholder="/photos/CooperHeadshot.jpg"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Bio/Description"
                      value={cooperInfo?.bio || ''}
                      onChange={(e) => handleCooperInfoUpdate('bio', e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'admin.main' }}>
                      Specializations/Skills
                    </Typography>
                    
                    {/* Add new skill */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Add new skill"
                        value={newCooperSkill}
                        onChange={(e) => setNewCooperSkill(e.target.value)}
                        onKeyPress={handleCooperSkillKeyPress}
                        placeholder="e.g., Creative Direction"
                      />
                      <Button 
                        variant="contained" 
                        onClick={editingCooperSkill ? handleUpdateCooperSkill : handleAddCooperSkill}
                        disabled={!newCooperSkill.trim()}
                      >
                        {editingCooperSkill ? 'Update' : 'Add'}
                      </Button>
                      {editingCooperSkill && (
                        <Button variant="outlined" onClick={handleCancelCooperSkill}>
                          Cancel
                        </Button>
                      )}
                    </Box>

                    {/* Skills list */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {cooperInfo?.skills?.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          onDelete={() => handleDeleteCooperSkill(skill)}
                          onClick={() => handleEditCooperSkill(skill)}
                          sx={{ 
                            bgcolor: `${theme.palette.primary.main}1A`, 
                            color: 'primary.main',
                            fontWeight: 500,
                            cursor: 'pointer'
                          }}
                        />
                      )) || []}
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>



          {/* Categories Management */}
          <Grid item xs={12} md={6}>
            <Accordion 
              expanded={categoriesExpanded} 
              onChange={handleCategoriesChange('categories')}
              sx={{ 
                bgcolor: isDarkMode ? theme.palette.backgrounds.card : 'white', 
                borderRadius: 2,
                '&:before': { display: 'none' },
                border: `1px solid ${theme.palette.borders.light}`,
                background: isDarkMode ? theme.palette.gradients.card : 'white',
                boxShadow: isDarkMode ? `0 10px 30px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }
                }}
              >
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, fontFamily: 'BearNose, Georgia, serif', color: 'admin.main' }}>
                  Portfolio Categories
                </Typography>
                {!isAdding && (
                  <Button 
                    variant="contained" 
                    startIcon={<Add />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAdding(true);
                    }}
                    sx={{ mr: 2 }}
                  >
                    Add Category
                  </Button>
                )}
              </AccordionSummary>
              <AccordionDetails>
                {/* Add/Edit Category Form */}
                {isAdding && (
                  <Card sx={{ 
                    mb: 3, 
                    bgcolor: isDarkMode ? theme.palette.backgrounds.veryLight : 'grey.50', 
                    border: `1px solid ${theme.palette.borders.light}`,
                    background: isDarkMode ? theme.palette.gradients.card : 'grey.50',
                    boxShadow: isDarkMode ? `0 5px 20px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: 'admin.main' }}>
                        {editingCategory ? 'Edit Category' : 'Add New Category'}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                                                     <TextField
                             fullWidth
                             label="Category Name"
                             value={newCategory.label}
                             onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
                             onKeyPress={handleCategoryKeyPress}
                             placeholder="e.g., Branding, Digital, Print"
                           />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel>Color</InputLabel>
                            <Select
                              value={newCategory.color}
                              label="Color"
                              onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value as string })}
                            >
                              {tagColors.map((colorOption) => (
                                <MenuItem key={colorOption.value} value={colorOption.value}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box 
                                      sx={{ 
                                        width: 20, 
                                        height: 20, 
                                        borderRadius: '50%', 
                                        bgcolor: colorOption.color,
                                        border: `1px solid ${theme.palette.borders.light}`
                                      }} 
                                    />
                                    {colorOption.label}
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button 
                              variant="contained" 
                              onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                              disabled={!newCategory.label}
                            >
                              {editingCategory ? 'Update' : 'Add'} Category
                            </Button>
                            <Button variant="outlined" onClick={handleCancel}>
                              Cancel
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                )}

                {/* Categories List */}
                <List>
                  {categories.map((category) => (
                    <ListItem 
                      key={category.id}
                      sx={{ 
                        border: `1px solid ${theme.palette.borders.light}`, 
                        borderRadius: 1, 
                        mb: 1,
                        bgcolor: isDarkMode ? theme.palette.backgrounds.veryLight : 'white',
                        background: isDarkMode ? theme.palette.gradients.card : 'white',
                        boxShadow: isDarkMode ? `0 2px 8px ${theme.palette.secondary.main}1A` : 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: isDarkMode ? `0 4px 12px ${theme.palette.secondary.main}26` : 'none',
                          transform: isDarkMode ? 'translateY(-1px)' : 'none'
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          bgcolor: category.color,
                          mr: 2
                        }} 
                      />
                      <ListItemText
                        primary={category.label}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          onClick={() => handleEditCategory(category)}
                          sx={{ mr: 1 }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          edge="end" 
                          onClick={() => handleDeleteCategory(category.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>

                {categories.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" sx={{ color: 'admin.main', mb: 2 }}>
                      No categories yet
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<Add />}
                      onClick={() => setIsAdding(true)}
                    >
                      Add Your First Category
                    </Button>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Tags Management */}
          <Grid item xs={12} md={6}>
            <Accordion 
              expanded={tagsExpanded} 
              onChange={handleTagsChange('tags')}
              sx={{ 
                bgcolor: isDarkMode ? theme.palette.backgrounds.card : 'white', 
                borderRadius: 2,
                '&:before': { display: 'none' },
                border: `1px solid ${theme.palette.borders.light}`,
                background: isDarkMode ? theme.palette.gradients.card : 'white',
                boxShadow: isDarkMode ? `0 10px 30px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }
                }}
              >
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, fontFamily: 'BearNose, Georgia, serif', color: 'admin.main' }}>
                  Portfolio Tags
                </Typography>
                {!isAddingTag && (
                  <Button 
                    variant="contained" 
                    startIcon={<Add />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddingTag(true);
                    }}
                    sx={{ mr: 2 }}
                  >
                    Add Tag
                  </Button>
                )}
              </AccordionSummary>
              <AccordionDetails>
                {/* Add/Edit Tag Form */}
                {isAddingTag && (
                  <Card sx={{ 
                    mb: 3, 
                    bgcolor: isDarkMode ? theme.palette.backgrounds.veryLight : 'grey.50', 
                    border: `1px solid ${theme.palette.borders.light}`,
                    background: isDarkMode ? theme.palette.gradients.card : 'grey.50',
                    boxShadow: isDarkMode ? `0 5px 20px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: 'admin.main' }}>
                        {editingTag ? 'Edit Tag' : 'Add New Tag'}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                                                     <TextField
                             fullWidth
                             label="Tag Name"
                             value={newTag.name}
                             onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                             onKeyPress={handleTagKeyPress}
                             placeholder="e.g., Logo Design, Web Design"
                           />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <FormControl fullWidth>
                            <InputLabel>Color</InputLabel>
                            <Select
                              value={newTag.color}
                              label="Color"
                              onChange={(e) => setNewTag({ ...newTag, color: e.target.value as string })}
                            >
                              {tagColors.map((colorOption) => (
                                <MenuItem key={colorOption.value} value={colorOption.value}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box 
                                      sx={{ 
                                        width: 20, 
                                        height: 20, 
                                        borderRadius: '50%', 
                                        bgcolor: colorOption.color,
                                        border: `1px solid ${theme.palette.borders.light}`
                                      }} 
                                    />
                                    {colorOption.label}
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button 
                              variant="contained" 
                              onClick={editingTag ? handleUpdateTag : handleAddTag}
                              disabled={!newTag.name}
                            >
                              {editingTag ? 'Update' : 'Add'} Tag
                            </Button>
                            <Button variant="outlined" onClick={handleCancelTag}>
                              Cancel
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                )}

                {/* Tags List */}
                <List>
                  {tags.map((tag) => (
                    <ListItem 
                      key={tag.id}
                      sx={{ 
                        border: `1px solid ${theme.palette.borders.light}`, 
                        borderRadius: 1, 
                        mb: 1,
                        bgcolor: isDarkMode ? theme.palette.backgrounds.veryLight : 'white',
                        background: isDarkMode ? theme.palette.gradients.card : 'white',
                        boxShadow: isDarkMode ? `0 2px 8px ${theme.palette.secondary.main}1A` : 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: isDarkMode ? `0 4px 12px ${theme.palette.secondary.main}26` : 'none',
                          transform: isDarkMode ? 'translateY(-1px)' : 'none'
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          bgcolor: tag.color,
                          mr: 2
                        }} 
                      />
                      <ListItemText
                        primary={tag.name}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          onClick={() => handleEditTag(tag)}
                          sx={{ mr: 1 }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          edge="end" 
                          onClick={() => handleDeleteTag(tag.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>

                {tags.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" sx={{ color: 'admin.main', mb: 2 }}>
                      No tags yet
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<Add />}
                      onClick={() => setIsAddingTag(true)}
                    >
                      Add Your First Tag
                    </Button>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>

      {/* Success/Error Notifications */}
      <Snackbar 
        open={saveSuccess} 
        autoHideDuration={4000} 
        onClose={() => setSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSaveSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Changes saved successfully!
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!saveError} 
        autoHideDuration={6000} 
        onClose={() => setSaveError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSaveError(null)} severity="error" sx={{ width: '100%' }}>
          {saveError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminSettings; 