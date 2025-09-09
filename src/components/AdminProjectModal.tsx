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
import CloudUpload from '@mui/icons-material/CloudUpload';
import Delete from '@mui/icons-material/Delete';
import OutlinedInput from '@mui/material/OutlinedInput';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../lib/supabase';

interface AdminProjectModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AdminProjectModal: React.FC<AdminProjectModalProps> = ({
  open,
  project,
  onClose,
  onSave
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    category: '',
    description: '',
    image: '',
    tags: [],
    featured: false,
    year: new Date().getFullYear().toString(),
            view_url: ''
  });
  const [customTagInput, setCustomTagInput] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const [categories, setCategories] = useState<Array<{ value: string; label: string }>>([]);
  const [availableTags, setAvailableTags] = useState<Array<{ value: string; label: string; color: string }>>([]);
  const [tagColors, setTagColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await portfolioService.getCategoriesWithInfo();
        setCategories(categoriesData.map(cat => ({
          value: cat.name,
          label: cat.label
        })));

        const tagsData = await portfolioService.getTagsWithInfo();
        setAvailableTags(tagsData.map(tag => ({
          value: tag.name,
          label: tag.name,
          color: tag.color
        })));
        
        // Load tag colors for display
        const colorsMap: { [key: string]: string } = {};
        tagsData.forEach(tag => {
          colorsMap[tag.name] = tag.color;
        });
        setTagColors(colorsMap);
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };

    loadData();
  }, []);

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
        view_url: project.view_url || ''
      });
      setImagePreview(project.image);
    } else {
      setFormData({
        title: '',
        category: '',
        description: '',
        image: '',
        tags: [],
        featured: false,
        year: new Date().getFullYear().toString(),
        view_url: ''
      });
      setImagePreview('');
    }
    setErrors({});
    setCustomTagInput('');
    setSelectedFile(null);
    setUploadError('');
    setIsUploading(false);
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
    if (!formData.image.trim() && !selectedFile) {
      newErrors.image = 'Project image is required';
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file
      const validation = portfolioService.validateImageFile(file);
      if (!validation.valid) {
        setUploadError(validation.error || 'Invalid file');
        return;
      }

      setSelectedFile(file);
      setUploadError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear any existing image URL error
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: ''
        }));
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview('');
    setUploadError('');
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      let imageUrl = formData.image;

      // Handle image upload if a new file is selected
      if (selectedFile) {
        const uploadedUrl = await portfolioService.uploadImage(selectedFile);
        if (!uploadedUrl) {
          setUploadError('Failed to upload image. Please try again.');
          setIsUploading(false);
          return;
        }
        imageUrl = uploadedUrl;

        // If updating an existing project with a different image, delete the old one
        if (project && project.image && project.image !== uploadedUrl && project.image.includes('supabase')) {
          await portfolioService.deleteImage(project.image);
        }
      }

      const projectData: Project = {
        id: project?.id || Date.now(),
        ...formData,
        image: imageUrl,
        created_at: project?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      onSave(projectData);
    } catch (error) {
      console.error('Error saving project:', error);
      setUploadError('Failed to save project. Please try again.');
    } finally {
      setIsUploading(false);
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
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'admin.main' }}>
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

          {/* Image Upload Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Project Image
            </Typography>
            
            {uploadError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {uploadError}
              </Alert>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <Card sx={{ mb: 2, maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={imagePreview}
                  alt="Project preview"
                  sx={{ objectFit: 'contain' }}
                />
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                  <IconButton 
                    onClick={handleRemoveImage}
                    color="error"
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            )}

            {/* Upload Button */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                component="label"
                variant={imagePreview ? "outlined" : "contained"}
                startIcon={<CloudUpload />}
                disabled={isUploading}
              >
                {imagePreview ? 'Change Image' : 'Upload Image'}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </Button>
              
              {isUploading && (
                <Box sx={{ width: 200 }}>
                  <LinearProgress />
                </Box>
              )}
            </Box>

            {/* Alternative URL Input */}
            <Typography variant="caption" sx={{ display: 'block', mt: 2, mb: 1, color: 'text.secondary' }}>
              Or enter an image URL:
            </Typography>
            <TextField
              fullWidth
              label="Image URL (optional)"
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              error={!!errors.image}
              helperText={errors.image || 'Enter the path to the project image (e.g., /logos/PrimaryLogo.svg)'}
              size="small"
            />
          </Box>

          <TextField
            fullWidth
            label="View URL (optional)"
                    value={formData.view_url}
        onChange={(e) => handleInputChange('view_url', e.target.value)}
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
                <MenuItem sx={{ p: 0, borderBottom: `1px solid ${theme.palette.borders.light}` }}>
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
                            border: `1px solid ${theme.palette.borders.light}`
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
                                                                                                               bgcolor: tagColors[tag] || theme.palette.tagColors.blue,
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
            <Button variant="outlined" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              type="submit" 
              disabled={isUploading}
              startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : undefined}
            >
              {isUploading ? 'Saving...' : (project ? 'Update Project' : 'Add Project')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminProjectModal; 