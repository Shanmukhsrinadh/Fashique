import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Allproducts } from '../Data/Allproducts';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import HeaderAndSidebar from '../Componentsind/Navigation';
import useMediaQuery from '@mui/material/useMediaQuery'; // Hook for responsive behavior

function ProductDetail() {
  const [activeSection, setActiveSection] = React.useState('Products');
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const { id } = useParams();
  const product = Allproducts.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detect small screens

  // Sync cart with localStorage
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleSectionChange = (section) => setActiveSection(section);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      return updatedCart;
    });
    setSnackbarOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      return updatedCart;
    });
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  // Filter similar products
  const similarProducts = Allproducts.filter(
    (p) => p.subCategory === product.subCategory && p.id !== product.id
  );

  // Render similar products
  const renderSimilarProducts = () => {
    return (
      <Box sx={{ mt: 6, padding: '20px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#212121', mb: 3 }}>
          Similar Products
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 3,
          }}
        >
          {similarProducts.map((item) => (
            <Box
              key={item.id}
              onClick={() => {
                navigate(`/product/${item.id}`); // Navigate to new product
                window.scrollTo(0, 0); // Scroll to top
              }}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                cursor: 'pointer',
              }}
            >
              <img
                src={item.url}
                alt={item.title}
                style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
              />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  Price: ₹{item.discountedPrice}
                </Typography>
              </Box>
              <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#00796b',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#004d40' },
                    width: '100%',
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click navigation
                    handleAddToCart(item);
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const renderCart = () => {
    return (
      <>
        <Box sx={{ padding: '20px', minHeight: '' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#212121', mb: 3 }}>
            Your Cart
          </Typography>

          {cart.length === 0 ? (
            <Typography variant="h6" sx={{ color: '#999' }}>
              Your cart is empty!
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: 3,
                mt: 2,
                color: '#777',
              }}
            >
              {cart.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' },
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
                  />
                  <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777', mb: 2 }}>
                    Price: ₹{item.discountedPrice}
                  </Typography>
                  <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove from Cart
                    </button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              {cart.some((item) => item.id === product.id)
                ? 'Added to the cart successfully!'
                : 'Removed from cart successfully!'}
            </Alert>
          </Snackbar>
        </Box>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '15px',
            width: '93vw',
            padding: '20px',
          }}
        >
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => handleSectionChange('Products')}
          >
            Continue Shopping
          </button>
          <button className="btn btn-dark btn-sm">
            Confirm Purchase
          </button>
        </div>
      </>
    );
  };

  const renderProductDetails = () => {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            gap: '40px',
            padding: '20px',
          }}
        >
          <Box sx={{ flex: 1, maxWidth: isSmallScreen ? '100%' : '500px' }}>
            <img
              src={product.url}
              alt={product.title}
              style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
            />
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#212121' }}>
              {product.title}
            </Typography>

            <div className="product-details" style={{ display: 'flex', gap: '80px' }}>
              <div className="details-label" style={{ color: 'black', fontWeight: 'bold' }}>
                <p>Brand:</p>
                <p>Price:</p>
                <p>Discount:</p>
                <p>Warranty:</p>
                <p>Actual Price:</p>
                <p>Discounted Price:</p>
                <p>Size:</p>
                <p>In Stock:</p>
                <p>Material:</p>
                <p>Colors:</p>
                <p>Rating:</p>
                <p>Review Count:</p>
              </div>
              <div className="details-value">
                <p>{product.brand}</p>
                <p>₹{product.price}</p>
                <p>{product.discount}%</p>
                <p>{product.warranty}</p>
                <p>₹{product.actualPrice}</p>
                <p>₹{product.discountedPrice}</p>
                <p>{product.size?.join(', ')}</p>
                <p>{product.inStock}</p>
                <p>{product.material}</p>
                <p>{product.colors?.join(', ')}</p>
                <p>{product.rating}</p>
                <p>{product.reviewCount}</p>
              </div>
            </div>

            {cart.some((item) => item.id === product.id) ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#ff4444',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#cc0000' },
                  width: '200px',
                  mt: 2,
                }}
                onClick={() => handleRemoveFromCart(product.id)}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#00796b',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#004d40' },
                  width: '200px',
                }}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            )}

            <Button
              variant="outlined"
              sx={{
                borderColor: '#00796b',
                color: '#00796b',
                '&:hover': { borderColor: '#004d40', color: '#777' },
                width: '200px',
              }}
              onClick={() => navigate('/dashboard')}
            >
              Back to Products
            </Button>
          </Box>
        </Box>

        {/* Render Similar Products Section */}
        {renderSimilarProducts()}
      </>
    );
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <HeaderAndSidebar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleSectionChange={handleSectionChange}
      />
      <Box sx={{ flexGrow: 1, marginTop: '80px' }}>
        {activeSection === 'Orders' ? renderCart() : renderProductDetails()}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {cart.some((item) => item.id === product.id)
              ? 'Added to the cart successfully!'
              : 'Removed from cart successfully!'}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default ProductDetail;