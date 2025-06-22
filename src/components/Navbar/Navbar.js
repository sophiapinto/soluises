import React, { useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import Fade from 'react-reveal/Fade';
import { IoMenuSharp, IoHomeSharp } from 'react-icons/io5';
import { BsFillGearFill } from 'react-icons/bs';
import { MdPhone } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';

import './Navbar.css';

function Navbar() {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const useStyles = makeStyles((t) => ({
        navMenu: {
            fontSize: '2.5rem',
            color: '#1E2230',
            cursor: 'pointer',
            transform: 'translateY(-10px)',
            transition: 'color 0.3s',
            '&:hover': {
                color: '#1E2230',
            },
        },
        MuiDrawer: {
            padding: '0em 1.8em',
            width: '14em',
            fontFamily: 'var(--primaryFont)',
            fontSize: '24px',
            background: '#ffffff',
            overflow: 'hidden',
            borderTopRightRadius: '40px',
            borderBottomRightRadius: '40px',
            [t.breakpoints.down('sm')]: {
                width: '12em',
            },
        },
        closebtnIcon: {
            fontSize: '2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: '#1E2230',
            position: 'absolute',
            right: 40,
            top: 40,
            '&:hover': {
                color: '#1E2230',
            },
            [t.breakpoints.down('sm')]: {
                right: 20,
                top: 20,
            },
        },
        drawerItem: {
            margin: '2rem auto',
            borderRadius: '78.8418px',
            background: '#ffffff',
            color: '#1E2230',
            width: '85%',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: '0 30px',
            border: '2px solid #1E2230',
            transition: 'background-color 0.2s, color 0.2s',
            '&:hover': {
                background: '#1E2230',
                color: '#ffffff',
            },
            [t.breakpoints.down('sm')]: {
                width: '100%',
                padding: '0 25px',
                height: '55px',
            },
        },
        drawerLinks: {
            fontFamily: 'var(--primaryFont)',
            width: '50%',
            fontSize: '1.3rem',
            fontWeight: 600,
            [t.breakpoints.down('sm')]: {
                fontSize: '1.125rem',
            },
        },
        drawerIcon: {
            fontSize: '1.6rem',
            [t.breakpoints.down('sm')]: {
                fontSize: '1.385rem',
            },
        },
    }));

    const classes = useStyles();

    return (
        <div className="navbar">
            <div className="navbar--container">
                <h1>PROTOTIPO SITE SOLUISES</h1>
                <IoMenuSharp className={classes.navMenu} onClick={handleDrawerOpen} aria-label="Menu" />
            </div>

            <Drawer
                variant="temporary"
                onClose={handleDrawerClose}
                anchor="left"
                open={open}
                classes={{ paper: classes.MuiDrawer }}
                className="drawer"
                disableScrollLock={true}
            >
                <div className="div-closebtn">
                    <CloseIcon
                        onClick={handleDrawerClose}
                        className={classes.closebtnIcon}
                        role="button"
                        tabIndex="0"
                        aria-label="Fechar menu"
                    />
                </div>

                <div onClick={handleDrawerClose}>
                    <div className="navLink--container">
                        <Fade left>
                            <NavLink to="/" smooth={true} duration={2000}>
                                <div className={classes.drawerItem}>
                                    <IoHomeSharp className={classes.drawerIcon} />
                                    <span className={classes.drawerLinks}>Home</span>
                                </div>
                            </NavLink>
                        </Fade>

                        <Fade left>
                            <NavLink to="/#about" smooth={true} duration={2000}>
                                <div className={classes.drawerItem}>
                                    <FaUser className={classes.drawerIcon} />
                                    <span className={classes.drawerLinks}>Sobre</span>
                                </div>
                            </NavLink>
                        </Fade>

                        <Fade left>
                            <NavLink to="/#services" smooth={true} duration={2000}>
                                <div className={classes.drawerItem}>
                                    <BsFillGearFill className={classes.drawerIcon} />
                                    <span className={classes.drawerLinks}>Serviços</span>
                                </div>
                            </NavLink>
                        </Fade>

                        <Fade left>
                            <NavLink to="/#contacts" smooth={true} duration={2000}>
                                <div className={classes.drawerItem}>
                                    <MdPhone className={classes.drawerIcon} />
                                    <span className={classes.drawerLinks}>Contato</span>
                                </div>
                            </NavLink>
                        </Fade>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default Navbar;