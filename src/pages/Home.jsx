// Home.jsx
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { logout,token,userData } = useAuth();
  console.log(userData)
  const navigate = useNavigate();

  const [productName, setProductName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handlePurchase = async () => {
    try {
      // Validate if productName and price are not empty
      if (!productName || !price) {
        toast.error("Please fill in all fields");
        return;
      }

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      console.log(token)
      const response = await axios.post(
        "https://loyality-app-backend.vercel.app/api/transaction/make-transaction",
        {
          item_name: productName,
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization:token, // Replace 'yourAuthToken' with the actual token
          },
        }
      );

      toast.success(`Product purchased successfully! Order ID: ${response.data.orderId}`);
    } catch (error) {
        console.log(error)
      console.error('Error purchasing product:', error);
      toast.error('Error purchasing product. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ShoppingBagIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome! {userData?.user?.full_name}
          </Typography>
          <Typography component="h1" variant="h5">
            Make Purchase
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="productName"
              label="Product Name"
              name="productName"
              autoComplete="productName"
              autoFocus
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handlePurchase}
            >
              Purchase
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
