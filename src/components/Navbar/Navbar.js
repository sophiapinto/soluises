import React, { useContext, useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import Fade from 'react-reveal/Fade';
import { IoMenuSharp, IoHomeSharp } from 'react-icons/io5';
import { HiDocumentText } from 'react-icons/hi';
import { BsFillGearFill } from 'react-icons/bs';
import { MdPhone } from 'react-icons/md';
import { FaUser, FaFolderOpen } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';

import './Navbar.css';
import { ThemeContext } from '../../contexts/ThemeContext';

function Navbar() {
    const { theme, setHandleDrawer } = useContext(ThemeContext);
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        setHandleDrawer();
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setHandleDrawer();
    };

    const useStyles = makeStyles((t) => ({
        navMenu: {
            fontSize: '2.5rem',
            color: theme.tertiary,
            cursor: 'pointer',
            transform: 'translateY(-10px)',
            '&:hover': {
                color: theme.primary,
            }
        },
        MuiDrawer: {
            padding: '2rem 1rem',
            width: '16rem',
            background: theme.secondary,
            borderTopRightRadius: '40px',
            borderBottomRightRadius: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [t.breakpoints.down('sm')]: {
                width: '14rem',
            },
        },
        closebtnIcon: {
            fontSize: '2rem',
            color: theme.primary,
            position: 'absolute',
            right: 30,
            top: 30,
            cursor: 'pointer',
            '&:hover': {
                color: theme.tertiary,
            }
        },
        drawerItem: {
            borderRadius: '40px',
            border: `2px solid ${theme.primary}`,
            color: theme.primary,
            fontWeight: 700,
            fontSize: '1.1rem',
            padding: '1rem 1.5rem',
            width: '100%',
            textAlign: 'center',
            background: '#fff',
            marginBottom: '1rem',
            transition: 'all 0.3s ease',
            '&:hover': {
                background: theme.primary,
                color: theme.secondary,
            }
        },
        drawerLinks: {
            fontFamily: 'var(--primaryFont)',
            textDecoration: 'none',
        },
        drawerIcon: {
            display: 'none',
        }
    }));

    const classes = useStyles();

    return (
        <div className='navbar'>
            <div className='navbar--container'>
                <h1>PROTOTIPO SITE SOLUISES</h1>
                <IoMenuSharp
                    className={classes.navMenu}
                    onClick={handleDrawerOpen}
                    aria-label='Menu'
                />
            </div>
            <Drawer
                variant='temporary'
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleDrawerClose();
                    }
                }}
                anchor='left'
                open={open}
                classes={{ paper: classes.MuiDrawer }}
                className='drawer'
                disableScrollLock={true}
            >
                <div className='div-closebtn'>
                    <CloseIcon
                        onClick={handleDrawerClose}
                        className={classes.closebtnIcon}
                        role='button'
                        tabIndex='0'
                        aria-label='Fechar menu'
                    />
                </div>

                <div onClick={handleDrawerClose}>
                    <div className='navLink--container'>
                        <Fade left>
                            <NavLink to='/#about' smooth spy duration={2000}>
                                <div className={classes.drawerItem}>Quero conhecer</div>
                            </NavLink>
                        </Fade>
                        <Fade left>
                            <NavLink to='/#services' smooth spy duration={2000}>
                                <div className={classes.drawerItem}>Quero ser Membro</div>
                            </NavLink>
                        </Fade>
                        <Fade left>
                            <NavLink to='/#blog' smooth spy duration={2000}>
                                <div className={classes.drawerItem}>Nossas Ações</div>
                            </NavLink>
                        </Fade>
                        <Fade left>
                            <NavLink to='/#report' smooth spy duration={2000}>
                                <div className={classes.drawerItem}>Report</div>
                            </NavLink>
                        </Fade>
                        <Fade left>
                            <NavLink to='/#contacts' smooth spy duration={2000}>
                                <div className={classes.drawerItem}>Contato</div>
                            </NavLink>
                        </Fade>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default Navbar;