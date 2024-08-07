import React, { useEffect, useState } from 'react';
import { Avatar, Menu, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No token found");

        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser({
          name: response.data.name,
          email: response.data.email
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        navigate('/login'); // Redirect to login if there is a problem (optional)
      }
    };

    fetchUser();
  }, [navigate]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
      <Avatar onClick={handleClick} sx={{ cursor: 'pointer' }}>U</Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user ? (
          <>
            <MenuItem onClick={handleClose}>{user.name}</MenuItem>
            <MenuItem onClick={handleClose}>{user.email}</MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleClose}>Loading...</MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
