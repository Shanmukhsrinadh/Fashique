import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme, useMediaQuery } from '@mui/material';
import HeaderAndSidebar from '../Componentsind/Navigation';
import MainContent from '../Componentsind/Content';

export default function MiniDrawer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens
  const [open, setOpen] = React.useState(false); // Drawer is closed by default on all screens
  const [cart, setCart] = React.useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [activeSection, setActiveSection] = React.useState('Products');

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleSectionChange = (section) => setActiveSection(section);

  // Automatically close the drawer on mobile when a section is selected
  React.useEffect(() => {
    if (isMobile && open) {
      setOpen(false);
    }
  }, [activeSection, isMobile, open]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <HeaderAndSidebar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleSectionChange={handleSectionChange}
        isMobile={isMobile} // Pass isMobile prop to adjust drawer behavior
      />
      <MainContent
        activeSection={activeSection}
        cart={cart}
        setCart={setCart}
        handleSectionChange={handleSectionChange}
        isMobile={isMobile} // Pass isMobile prop to adjust content layout
      />
    </Box>
  );
}