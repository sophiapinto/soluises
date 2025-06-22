import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaInstagram } from 'react-icons/fa';
import { FiAtSign } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { ThemeContext } from '../../contexts/ThemeContext';
import { contactsData } from '../../data/contactsData';
import './Contacts.css';

function Contacts() {
    const { theme } = useContext(ThemeContext);

    const useStyles = makeStyles(() => ({
        detailsIcon: {
            backgroundColor: '#D63826',
            color: '#FFFFFF',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '23px',
            transition: '250ms ease-in-out',
            flexShrink: 0,
            '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: theme.tertiary,
            },
        }
    }));

    const classes = useStyles();

    return (
        <div className='contacts' id='contacts' style={{ backgroundColor: theme.secondary }}>
            <div className='contacts--container'>
                <h1 style={{ color: '#FFFFFF' }}>Contato</h1>
                <div className='contacts-body'>
                    <div className='contacts-details'>
                        <a href={`mailto:${contactsData.email}`} className='personal-details'>
                            <div className={classes.detailsIcon}><FiAtSign /></div>
                            <p style={{ color: theme.tertiary }}>{contactsData.email}</p>
                        </a>
                        <a href={contactsData.instagram} target="_blank" rel="noopener noreferrer" className='personal-details'>
                            <div className={classes.detailsIcon}><FaInstagram /></div>
                            <p style={{ color: theme.tertiary }}>{contactsData.instagram}</p>
                        </a>
                        <div className='personal-details'>
                            <div className={classes.detailsIcon}><HiOutlineLocationMarker /></div>
                            <p style={{ color: theme.tertiary }}>{contactsData.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;