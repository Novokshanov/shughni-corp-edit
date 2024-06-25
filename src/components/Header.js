// import React from 'react';
import { Link } from 'react-router-dom';
import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Header(props) {
    const { isAuthenticated, onLogout } = props;
  
    return (
      <React.Fragment>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
          <Typography
            component="h3"
            variant="h5"
            color="inherit"
            align="left"
            noWrap
            sx={{ flex: 1 }}
            >
            {isAuthenticated? (
                <Link to="/editor" style={{ textDecoration: 'none', color: 'inherit' }}>
                Texts
                </Link>
            ) : (
                'Shughni Corpus Editor'
            )}
            </Typography>
            <Typography
            component="h3"
            variant="h5"
            color="inherit"
            align="left"
            noWrap
            sx={{ mr: 2 }}
            >
            <a href="https://pamiri.online" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                Dictionary
            </a>
            </Typography>
            <Typography
            component="h3"
            variant="h5"
            color="inherit"
            align="left"
            noWrap
            sx={{ mr: 2 }}
            >
            <a href="http://147.45.157.51:7342/search" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                Corpus
            </a>
            </Typography>
          {isAuthenticated? (
            <Button variant="outlined" size="small" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="outlined" size="small">
              Login
            </Button>
          )}
        </Toolbar>
      </React.Fragment>
    );
  }
  
  Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
  };
  
  export default Header;