import { 
  AppBar, Toolbar, Button, Switch, Typography, 
  useTheme, useMediaQuery, IconButton, Menu, 
  MenuItem, Box, Divider 
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(AppContext);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "EXCHANGE RATES (LIVE)", path: "/exchange-rates" },
    { name: "ABOUT", path: "/about" },
    { name: "ERROR PAGE", path: "/error" }
  ];

  return (
    <AppBar position="static" sx={{ 
      bgcolor: muiTheme.palette.mode === 'dark' ? muiTheme.palette.background.paper : 'primary.main',
      boxShadow: 'none'
    }}>
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Typography variant="h6" sx={{ 
          flexGrow: { xs: 1, md: 0 },
          mr: { md: 4 },
          fontWeight: 'bold'
        }}>
          Loan Calculator
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  bgcolor: muiTheme.palette.mode === 'dark' ? 
                    muiTheme.palette.background.paper : 'background.paper',
                  minWidth: 200
                }
              }}
            >
              {navItems.map((item) => (
                <MenuItem 
                  key={item.name}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      bgcolor: muiTheme.palette.mode === 'dark' ? 
                        'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  {item.name}
                </MenuItem>
              ))}
              <Divider />
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                px: 2, 
                py: 1 
              }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Dark Mode
                </Typography>
                <Switch 
                  checked={theme === "dark"} 
                  onChange={toggleTheme}
                  color="default"
                />
              </Box>
            </Menu>
          </>
        ) : (
          <>
            <Box sx={{ 
              display: 'flex', 
              flexGrow: 1,
              justifyContent: 'center',
              gap: { xs: 1, sm: 2, md: 4 }
            }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{
                    px: { sm: 1, md: 2 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      bgcolor: muiTheme.palette.mode === 'dark' ? 
                        'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            <Switch 
              checked={theme === "dark"} 
              onChange={toggleTheme}
              color="default"
              sx={{ ml: 2 }}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;