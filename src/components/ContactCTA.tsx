import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack,
  Fade
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface ContactCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonPath?: string;
  secondaryButtonText?: string;
  secondaryButtonPath?: string;
  showArrowIcon?: boolean;
  variant?: 'default' | 'card' | 'simple';
  scrollY?: number;
}

const ContactCTA: React.FC<ContactCTAProps> = ({
  title = "Ready to Start Your Project?",
  description = "Let's collaborate to bring your creative vision to life. Get in touch with us today to discuss your project.",
  primaryButtonText = "Start a Project",
  primaryButtonPath = "/contact",
  secondaryButtonText = "View Portfolio",
  secondaryButtonPath = "/portfolio",
  showArrowIcon = true,
  variant = "default",
  scrollY = 0
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handlePrimaryClick = () => {
    navigate(primaryButtonPath);
  };

  const handleSecondaryClick = () => {
    navigate(secondaryButtonPath);
  };

  const renderContent = () => (
    <>
      <Fade in={scrollY > 600} timeout={800}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            mb: 4, 
            fontWeight: 600, 
            color: variant === 'card' ? '#2D3748' : 'text.primary',
            fontFamily: variant === 'card' ? '"Georgia", serif' : 'inherit'
          }}
        >
          {title}
        </Typography>
      </Fade>
      <Fade in={scrollY > 650} timeout={1000}>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 6, 
            fontSize: variant === 'card' ? '1.3rem' : '1.1rem', 
            color: variant === 'card' ? '#4A5568' : 'text.secondary',
            lineHeight: 1.6,
            fontFamily: variant === 'card' ? '"Georgia", serif' : 'inherit'
          }}
        >
          {description}
        </Typography>
      </Fade>
      <Fade in={scrollY > 700} timeout={1200}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            endIcon={showArrowIcon ? <ArrowForward /> : undefined}
            onClick={handlePrimaryClick}
            sx={{ 
              bgcolor: theme.palette.secondary.main, 
              color: theme.palette.secondary.contrastText,
              px: variant === 'card' ? 5 : 4,
              py: 1.5,
              borderRadius: '25px',
              fontWeight: 600,
              boxShadow: `0 10px 25px ${theme.palette.secondary.main}4D`,
              '&:hover': { 
                bgcolor: theme.palette.secondary.dark,
                transform: 'translateY(-3px)',
                boxShadow: `0 15px 35px ${theme.palette.secondary.main}66`
              },
              transition: 'all 0.3s ease'
            }}
          >
            {primaryButtonText}
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={handleSecondaryClick}
            sx={{ 
              borderColor: theme.palette.secondary.main, 
              color: theme.palette.secondary.main,
              px: variant === 'card' ? 5 : 4,
              py: 1.5,
              borderRadius: '25px',
              borderWidth: '2px',
              fontWeight: 600,
              '&:hover': { 
                borderColor: theme.palette.secondary.dark, 
                bgcolor: `${theme.palette.secondary.main}0D`,
                transform: 'translateY(-3px)',
                boxShadow: `0 10px 25px ${theme.palette.secondary.main}33`
              },
              transition: 'all 0.3s ease'
            }}
          >
            {secondaryButtonText}
          </Button>
        </Stack>
      </Fade>
    </>
  );

  if (variant === 'card') {
    return (
      <Container maxWidth="md" sx={{ py: 14, textAlign: 'center' }}>
        <Box sx={{ 
          p: 6, 
          borderRadius: '25px',
          background: 'linear-gradient(135deg, #FFF8F8 0%, #F8F9FF 100%)',
          border: `2px solid ${theme.palette.secondary.main}1A`,
          boxShadow: `0 20px 40px ${theme.palette.secondary.main}1A`
        }}>
          {renderContent()}
        </Box>
      </Container>
    );
  }

  if (variant === 'simple') {
    return (
      <Container maxWidth="md" sx={{ py: 14, textAlign: 'center' }}>
        {renderContent()}
      </Container>
    );
  }

  // Default variant
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 12 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        {renderContent()}
      </Container>
    </Box>
  );
};

export default ContactCTA; 