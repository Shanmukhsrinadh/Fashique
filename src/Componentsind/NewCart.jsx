import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewCart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <Box sx={{ padding: isMobile ? 1 : 2 }}>
      <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cart.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            Your cart is empty.
          </Typography>
        ) : (
          cart.map((item) => (
            <ListItem key={item.id} sx={{ borderBottom: '1px solid #ddd', padding: isMobile ? '8px 0' : '16px 0' }}>
              <ListItemText
                primary={item.title}
                secondary={`₹${item.price.toFixed(2)}`}
                primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}
              />
              <Button
                variant="contained"
                color="error"
                size={isMobile ? 'small' : 'medium'}
                onClick={() => handleRemoveFromCart(item.id)}
                sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}
              >
                Remove
              </Button>
            </ListItem>
          ))
        )}
      </List>

      {cart.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant={isMobile ? 'h6' : 'h5'}>Total: ₹{totalPrice}</Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: '#00796b',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              padding: isMobile ? '6px 12px' : '8px 16px',
            }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Item removed from cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewCart;