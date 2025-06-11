import React, { useContext, useState } from 'react';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
//import axios from 'axios';
//import isEmail from 'validator/lib/isEmail';
import { makeStyles } from '@material-ui/core/styles';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineSend, AiOutlineCheckCircle } from 'react-icons/ai';
import { FiAtSign } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { ThemeContext } from '../../contexts/ThemeContext';

import { contactsData } from '../../data/contactsData';
import './Contacts.css';
//import { NoEncryption } from '@material-ui/icons';

function Contacts() {
    const [open, setOpen] = useState(false);

    /*
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    */

    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    const { theme } = useContext(ThemeContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const useStyles = makeStyles((t) => ({
        input: {
            border: `4px solid ${theme.primary80}`,
            backgroundColor: `${theme.secondary}`,
            color: `${theme.tertiary}`,
            fontFamily: 'var(--primaryFont)',
            fontWeight: 500,
            transition: 'border 0.2s ease-in-out',
            '&:focus': {
                border: `4px solid ${theme.primary600}`,
            },
        },
        message: {
            border: `4px solid ${theme.primary80}`,
            backgroundColor: `${theme.secondary}`,
            color: `${theme.tertiary}`,
            fontFamily: 'var(--primaryFont)',
            fontWeight: 500,
            transition: 'border 0.2s ease-in-out',
            '&:focus': {
                border: `4px solid ${theme.primary600}`,
            },
        },
        label: {
            backgroundColor: `${theme.secondary}`,
            color: `${theme.primary}`,
            fontFamily: 'var(--primaryFont)',
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '0 5px',
            transform: 'translate(25px,50%)',
            display: 'inline-flex',
        },
        socialIcon: {
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '21px',
            backgroundColor: theme.primary,
            color: theme.secondary,
            transition: '250ms ease-in-out',
            '&:hover': {
                transform: 'scale(1.1)',
                color: theme.secondary,
                backgroundColor: theme.tertiary,
            },
        },
        detailsIcon: {
            backgroundColor: theme.primary,
            color: theme.secondary,
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
                color: theme.secondary,
                backgroundColor: theme.tertiary,
            },
        },
        submitBtn: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            transition: '250ms ease-in-out',
            '&:hover': {
                transform: 'scale(1.08)',
                color: theme.secondary,
                backgroundColor: theme.tertiary,
            },
        },
    }));

    const classes = useStyles();

    /*
    
        const handleContactForm = (e) => {
            e.preventDefault();
    
            if (name && email && message) {
                if (isEmail(email)) {
                    const responseData = {
                        name: name,
                        email: email,
                        message: message,
                    };
    
                    axios.post(contactsData.sheetAPI, responseData).then((res) => {
                        console.log('success');
                        setSuccess(true);
                        setErrMsg('');
    
                        setName('');
                        setEmail('');
                        setMessage('');
                        setOpen(false);
                    });
                } else {
                    setErrMsg('E-mail inválido!');
                    setOpen(true);
                }
            } else {
                setErrMsg('Insira todos os campos!');
                setOpen(true);
            }
        };
        
    */

  
        // get all data in form and return object

        function getFormData(form) {
          var elements = form.elements;
          var honeypot;
      
          var fields = Object.keys(elements).filter(function(k) {
            if (elements[k].name === "honeypot") {
              honeypot = elements[k].value;
              return false;
            }
            return true;
          }).map(function(k) {
            if(elements[k].name !== undefined) {
              return elements[k].name;
            // special case for Edge's html collection
            }else if(elements[k].length > 0){
              return elements[k].item(0).name;
            }
          }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
          });
      
          var formData = {};
          fields.forEach(function(name){
            var element = elements[name];
            
            // singular form elements just have one value
            formData[name] = element.value;
      
            // when our element has multiple items, get their values
            if (element.length) {
              var data = [];
              for (var i = 0; i < element.length; i++) {
                var item = element.item(i);
                if (item.checked || item.selected) {
                  data.push(item.value);
                }
              }
              formData[name] = data.join(', ');
            }
          });
      
          // add form-specific values into the data
          formData.formDataNameOrder = JSON.stringify(fields);
          formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
          formData.formGoogleSendEmail
            = form.dataset.email || ""; // no email by default
      
          return {data: formData, honeypot: honeypot};
        }
      
        function handleFormSubmit(event) {  // handles form submit without any jquery
          event.preventDefault();           // we are submitting via xhr below
          var form = event.target;
          var formData = getFormData(form);
          var data = formData.data;
      
          // If a honeypot field is filled, assume it was done so by a spam bot.
          if (formData.honeypot) {
            return false;
          }
      
          disableAllButtons(form);
          var url = form.action;
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          // xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                form.reset();
                var formElements = form.querySelector(".form-elements")
                if (formElements) {
                  formElements.style.display = "none"; // hide form
                }
                var thankYouMessage = form.querySelector(".thankyou_message");
                if (thankYouMessage) {
                  thankYouMessage.style.display = "block";
                }
              }
          };
          // url encode form data for sending as post data
          var encoded = Object.keys(data).map(function(k) {
              return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
          }).join('&');
          xhr.send(encoded);
        }
        
        function loaded() {
          // bind to the submit event of our form
          var forms = document.querySelectorAll("form.contact__form");
          for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
          }
        };
        document.addEventListener("DOMContentLoaded", loaded, false);
      
        function disableAllButtons(form) {
          var buttons = form.querySelectorAll("button");
          for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
          }
        }

    return (
        <div
            className='contacts'
            id='contacts'
            style={{ backgroundColor: theme.secondary }}
        >
            <div className='contacts--container'>
                <h1 style={{ color: theme.primary }}>Contatos</h1>
                <div className='contacts-body'>
                    
                    <div className='contacts-details'>
                        <a
                            href={`mailto:${contactsData.email}`}
                            className='personal-details'
                        >
                            <div className={classes.detailsIcon}>
                                <FiAtSign />
                            </div>
                            <p style={{ color: theme.tertiary }}>
                                {contactsData.email}
                            </p>
                        </a>
                        <a
                            href={`tel:${contactsData.instagram}`}
                            className='personal-details'
                        >
                            <div className={classes.detailsIcon}>
                                <FaInstagram aria-label='Instagram' />
                            </div>
                            <p style={{ color: theme.tertiary }}>
                                {contactsData.instagram}
                            </p>
                        </a>
                        <div className='personal-details'>
                            <div className={classes.detailsIcon}>
                                <HiOutlineLocationMarker />
                            </div>
                            <p style={{ color: theme.tertiary }}>
                                {contactsData.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <img
                src={theme.contactsimg}
                alt='contacts'
                className='contacts--img'
            />
        </div>
    );
}

export default Contacts;
