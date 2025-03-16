import * as React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Allproducts } from '../Data/Allproducts';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ControlledCarousel() {
  const [index, setIndex] = React.useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselStyle = {
    height: '360px',
    objectFit: 'cover',
    marginTop: '50px',
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mobirise.com/extensions/commercem4/assets/images/3.jpg"
          alt="First slide"
          style={carouselStyle}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mobirise.com/extensions/commercem4/assets/images/gallery04.jpg"
          alt="Second slide"
          style={carouselStyle}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://luxurywatchesusa.com/wp-content/uploads/2021/02/buy-watches-luxury-watches-usa.jpg"
          alt="Third slide"
          style={carouselStyle}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default function MainContent({ activeSection, cart, setCart, handleSectionChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Detect tablet screens
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null); // State for selected category
  const navigate = useNavigate();

  const allproducts = Allproducts;

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? selectedCategory === 'Wearables'
      ? allproducts.filter((product) => product.subCategory === 'Watches') // Filter for Wearables (Watches)
      : allproducts.filter((product) => product.mainCategory === selectedCategory) // Filter for other categories
    : allproducts;

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleConfirmPurchase = () => {
    setOrderPlaced(true);
    setCart([]);
  };

  const handleCloseSnackbar = () => {
    setOrderPlaced(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle category selection
  };

  return (
    <Box sx={{ flexGrow: 1, padding: isMobile ? 2 : 3 }}>
      {activeSection === 'Products' && (
        <>
          <ControlledCarousel />

          {/* Category Cards */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? 1 : 3,
              mt: 4,
              mb: 4,
              flexWrap: 'wrap', // Wrap categories on smaller screens
            }}
          >
            {['Men', 'Women', 'Children', 'Footwear', 'Wearables'].map((category) => (
              <Box
                key={category}
                sx={{
                  backgroundColor: selectedCategory === category ? '#00796b' : '#f5f5f5',
                  borderRadius: '8px',
                  padding: isMobile ? '8px' : '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                  flex: isMobile ? '1 1 40%' : '0 0 auto', // Adjust flex for mobile
                  margin: isMobile ? '4px' : '0', // Add margin for mobile
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: selectedCategory === category ? '#fff' : '#212121',
                    fontSize: isMobile ? '0.9rem' : '1rem', // Adjust font size for mobile
                  }}
                >
                  {category}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3, color: 'black' }}>
            {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
          </Typography>
          {filteredProducts.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: '#777', fontSize: '1.1rem' }}>
              No products available.
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? 'repeat(auto-fill, minmax(150px, 1fr))' // Adjust for mobile
                  : isTablet
                  ? 'repeat(auto-fill, minmax(200px, 1fr))' // Adjust for tablet
                  : 'repeat(auto-fill, minmax(250px, 1fr))', // Default for desktop
                gap: isMobile ? 2 : 3,
                mt: 2,
                color: '#777',
              }}
            >
              {filteredProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' },
                    padding: isMobile ? 1 : 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <img
                    src={product.url}
                    alt={product.title}
                    style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
                  />
                  <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                    {product.brand}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777', mb: 2, fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                    <p>Price: <strong style={{ color: 'black' }}>₹{product.price}</strong></p>
                  </Typography>
                  <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      className={`btn btn-sm me-2 ${cart.some((item) => item.id === product.id) ? 'btn-success' : 'btn-dark'}`}
                      style={{ width: '48%', height: '35px', fontSize: isMobile ? '0.8rem' : '0.9rem' }}
                      onClick={() => handleAddToCart(product)}
                      disabled={cart.some((item) => item.id === product.id)}
                    >
                      {cart.some((item) => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                    <button
                      className="btn btn-outline-dark btn-sm"
                      style={{ width: '48%', height: '35px', fontSize: isMobile ? '0.8rem' : '0.9rem' }}
                      onClick={() => handleViewProduct(product)}
                    >
                      View
                    </button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}

      {activeSection === 'Orders' && (
        <>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3, color: 'black', marginTop: 5 }}>
            Cart
          </Typography>
          {cart.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: '#777', fontSize: '1.1rem', marginTop: 5 }}>
              Your cart is empty.
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: isMobile
                    ? 'repeat(auto-fill, minmax(150px, 1fr))' // Adjust for mobile
                    : isTablet
                    ? 'repeat(auto-fill, minmax(200px, 1fr))' // Adjust for tablet
                    : 'repeat(auto-fill, minmax(250px, 1fr))', // Default for desktop
                  gap: isMobile ? 2 : 3,
                  mt: 2,
                  color: '#777',
                }}
              >
                {cart.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.02)' },
                      padding: isMobile ? 1 : 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <img
                      src={product.url}
                      alt={product.title}
                      style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
                    />
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#777', mb: 2, fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                      Price: ₹{product.price}
                    </Typography>
                    <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveFromCart(product.id)}
                        style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}
                      >
                        Remove from Cart
                      </button>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => handleSectionChange('Products')}
                  style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}
                >
                  Continue Shopping
                </button>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={handleConfirmPurchase}
                  style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}
                >
                  Confirm Purchase
                </button>
              </Box>
            </>
          )}
        </>
      )}

      {/* Order Confirmation Popup */}
      <Snackbar
        open={orderPlaced}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Order placed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}