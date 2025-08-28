import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Add from '@mui/icons-material/Add';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Project, portfolioService } from '../services/portfolioService';

interface AdminProjectModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const AdminProjectModal: React.FC<AdminProjectModalProps> = ({
  open,
  project,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    category: '',
    description: '',
    image: '',
    tags: [],
    featured: false,
    year: new Date().getFullYear().toString(),
    viewUrl: ''
  });
  const [customTagInput, setCustomTagInput] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = portfolioService.getCategoriesWithInfo().map(cat => ({
    value: cat.name,
    label: cat.label
  }));

  const availableTags = portfolioService.getTagsWithInfo().map(tag => ({
    value: tag.name,
    label: tag.name,
    color: tag.color
  }));

  const years = Array.from({ length: new Date().getFullYear() - 2018 }, (_, i) => (new Date().getFullYear() - i).toString());

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        image: project.image,
        tags: [...project.tags],
        featured: project.featured,
        year: project.year,
        viewUrl: project.viewUrl || ''
      });
    } else {
      setFormData({
        title: '',
        category: '',
        description: '',
        image: '',
        tags: [],
        featured: false,
        year: new Date().getFullYear().toString(),
        viewUrl: ''
      });
    }
    setErrors({});
    setCustomTagInput('');
  }, [project, open]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    if (!formData.year) {
      newErrors.year = 'Year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTagChange = (event: any) => {
    const {
      target: { value },
    } = event;
    
    // Add the selected tag to the existing tags array
    if (value && !formData.tags.includes(value)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, value]
      }));
    }
  };

  const handleTagInputChange = (event: any) => {
    const inputValue = event.target.value;
    setCustomTagInput(inputValue);
    
    // If the input ends with a comma or space, add it as a tag
    if (inputValue.endsWith(',') || inputValue.endsWith(' ')) {
      const newTag = inputValue.slice(0, -1).trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
        setCustomTagInput('');
      }
    }
  };

  const handleTagInputKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && customTagInput.trim()) {
      event.preventDefault();
      const newTag = customTagInput.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
        setCustomTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const projectData: Project = {
        id: project?.id || Date.now(),
        ...formData
      };
      onSave(projectData);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagInputKeyPress(e);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: 600 },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          overflow: 'auto'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            {project ? 'Edit Project' : 'Add New Project'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Project Title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors.category}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth error={!!errors.year}>
              <InputLabel>Year</InputLabel>
              <Select
                value={formData.year}
                label="Year"
                onChange={(e) => handleInputChange('year', e.target.value)}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              {errors.year && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors.year}
                </Typography>
              )}
            </FormControl>
          </Box>

          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            multiline
            rows={4}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Image URL"
            value={formData.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            error={!!errors.image}
            helperText={errors.image || 'Enter the path to the project image (e.g., /logos/PrimaryLogo.svg)'}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="View URL (optional)"
            value={formData.viewUrl}
            onChange={(e) => handleInputChange('viewUrl', e.target.value)}
            helperText="URL for the 'View' button (e.g., https://example.com)"
            placeholder="https://example.com"
            sx={{ mb: 3 }}
          />

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Tags
            </Typography>
            
            {/* Enhanced Tag Selection Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Search or add tags</InputLabel>
              <Select
                value=""
                onChange={handleTagChange}
                input={<OutlinedInput label="Search or add tags" />}
                displayEmpty
                onOpen={() => setCustomTagInput('')}
              >
                {/* Custom Tag Input at the top */}
                <MenuItem sx={{ p: 0, borderBottom: '1px solid #e0e0e0' }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type to add custom tag (press Enter or comma)"
                    value={customTagInput}
                    onChange={handleTagInputChange}
                    onKeyPress={handleTagInputKeyPress}
                    onClick={(e) => e.stopPropagation()}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        border: 'none',
                        '& fieldset': { border: 'none' }
                      }
                    }}
                  />
                </MenuItem>
                
                {/* Existing Tags */}
                {availableTags
                  .filter(tag => !formData.tags.includes(tag.value))
                  .map((tag) => (
                    <MenuItem key={tag.value} value={tag.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 16, 
                            height: 16, 
                            borderRadius: '50%', 
                            bgcolor: tag.color,
                            border: '1px solid #e0e0e0'
                          }} 
                        />
                        {tag.label}
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Selected Tags Display */}
            {formData.tags.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{
                        bgcolor: portfolioService.getTagColor(tag),
                        color: 'white',
                        '& .MuiChip-deleteIcon': {
                          color: 'white'
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
              />
            }
            label="Featured Project"
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {project ? 'Update Project' : 'Add Project'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminProjectModal; 