import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link } from 'react-router-dom';
import { useAppContext } from "../../ContextAPI/AppContext"
import { useMemo } from 'react';


const pages = [
    { id: "dashboard", url: "/", name: "Dashboard", authRequired: true },
    { id: "addNews", url: "/add/news", name: "Add News", authRequired: true },
    { id: "bookmarks", url: "/bookmarks", name: "Bookmarks", authRequired: true },
    { id: "login", url: "/login", name: "Login", authRequired: false },
    { id: "register", url: "/register", name: "Register", authRequired: false }
];
const settings = [{ id: "profile", name: "Profile", url: "/profile" }, { id: "logout", name: "Logout", url: "/#" }]

export function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { isLoggedIn, profile } = useAppContext();
    const handleOpenNavMenu = useCallback((event) => {
        setAnchorElNav(event.currentTarget);
    }, [setAnchorElNav]);
    const handleOpenUserMenu = useCallback((event) => {
        setAnchorElUser(event.currentTarget);
    }, [setAnchorElUser]);

    const handleCloseNavMenu = useCallback(() => {
        setAnchorElNav(null);
    }, [setAnchorElNav]);

    const handleCloseUserMenu = useCallback(() => {
        setAnchorElUser(null);
    }, [setAnchorElUser]);

    const getCurrentPages = useCallback(() => {
        return pages.filter((page) => page.authRequired === isLoggedIn)
    }, [isLoggedIn])

    const currentPages = useMemo(() => getCurrentPages(), [getCurrentPages]);

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NewspaperIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        NEWS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {currentPages.map((page) => (
                                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                    <Button component={Link} variant="text" to={page.url} color="inherit">
                                        {page.name}
                                    </Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <NewspaperIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        NEWS
                    </Typography>
                    <Box
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                        style={{ justifyContent: "flex-end" }}
                    >
                        {currentPages.map((page) => (
                            <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                <Button component={Link} to={page.url} variant="text" color="inherit">
                                    {page.name}
                                </Button>
                            </MenuItem>
                        ))}
                    </Box>

                    {isLoggedIn && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar>{profile?.firstName[0]}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                                    <Button component={Link} to={setting.url} variant="text" color="inherit">
                                        {setting.name}
                                    </Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
