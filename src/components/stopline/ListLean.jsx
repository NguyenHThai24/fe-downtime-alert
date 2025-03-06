/** @format */

import React, { useState } from 'react';
import { Menu, MenuItem, Button, Typography, Box } from '@mui/material';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import ConstructionIcon from '@mui/icons-material/Construction';
import { motion as Motion } from 'framer-motion';
const ListLean = ({ listLean, onSelectLean, selectedLean }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (value) {
      onSelectLean(value.trim()); // Truyền giá trị lên `AlertStopline`
    }
    setAnchorEl(null);
  };

  const sortedListLean = [...listLean]
    .map((item) => item.trim())
    .sort((a, b) => a.localeCompare(b, 'vi'));

  return (
    <div className="relative w-72 h-10 bg-[#002b5c] text-white flex mx-auto justify-center items-center rounded-b-full">
      <Button
        onClick={handleClick}
        sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          width: '400px',
        }}
      >
        Lean {selectedLean || 'Chọn Lean'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ height: '500px', textAlign: 'center' }}
      >
        {sortedListLean.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleClose(item)}
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              padding: '10px',
              '&:hover': { backgroundColor: '#f5f5f5' },
              transition: '0.2s',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ListLean;
