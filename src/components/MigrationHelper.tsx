import React, { useState } from 'react';
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { portfolioService } from '../services/portfolioService';

const MigrationHelper: React.FC = () => {
  const theme = useTheme();
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string>('');
  const [showMigration, setShowMigration] = useState(false);

  const handleMigration = async () => {
    setIsMigrating(true);
    setMigrationStatus('Starting migration...');

    try {
      // Check if there are projects in localStorage
      const storageKey = 'portfolioProjects';
      const savedProjects = localStorage.getItem(storageKey);
      
      if (savedProjects) {
        setMigrationStatus('Migrating projects from localStorage...');
        await portfolioService.migrateFromLocalStorage();
        setMigrationStatus('Migration completed successfully!');
      } else {
        setMigrationStatus('No projects found in localStorage to migrate.');
      }

      // Initialize default projects if none exist
      setMigrationStatus('Initializing default projects...');
      await portfolioService.initializeDefaultProjects();
      setMigrationStatus('Database initialization completed!');
      
    } catch (error) {
      console.error('Migration error:', error);
      setMigrationStatus(`Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsMigrating(false);
    }
  };

  const checkLocalStorage = () => {
    const storageKey = 'portfolioProjects';
    const savedProjects = localStorage.getItem(storageKey);
    return savedProjects ? JSON.parse(savedProjects).length : 0;
  };

  const localStorageProjectCount = checkLocalStorage();

  if (localStorageProjectCount === 0 && !showMigration) {
    return null; // Don't show if no migration is needed
  }

  return (
            <Box sx={{ p: 2, mb: 2, border: `1px solid ${theme.palette.borders.light}`, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Database Migration Helper
      </Typography>
      
      {localStorageProjectCount > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Found {localStorageProjectCount} project(s) in localStorage that can be migrated to Supabase.
        </Alert>
      )}

      {migrationStatus && (
        <Alert 
          severity={migrationStatus.includes('failed') ? 'error' : 'success'} 
          sx={{ mb: 2 }}
        >
          {migrationStatus}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          onClick={handleMigration}
          disabled={isMigrating}
          startIcon={isMigrating ? <CircularProgress size={20} /> : null}
        >
          {isMigrating ? 'Migrating...' : 'Migrate to Supabase'}
        </Button>
        
        {localStorageProjectCount === 0 && (
          <Button
            variant="outlined"
            onClick={() => setShowMigration(!showMigration)}
          >
            {showMigration ? 'Hide' : 'Show'} Migration Helper
          </Button>
        )}
      </Box>

      {showMigration && (
        <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.backgrounds.card, borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            This helper will migrate your existing portfolio projects from localStorage to Supabase 
            and initialize the database with default categories and tags. Run this once after 
            setting up your Supabase credentials.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MigrationHelper;
