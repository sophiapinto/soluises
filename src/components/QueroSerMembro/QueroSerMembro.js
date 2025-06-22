import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaInstagram } from 'react-icons/fa';
import { FiAtSign } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { ThemeContext } from '../../contexts/ThemeContext';
import { contactsData } from '../../data/contactsData';
import './QueroSerMembro.css';

function QueroSerMembro() {
    const [success, setSuccess] = useState(false);
    const { theme } = useContext(ThemeContext);

    const useStyles = makeStyles(() => ({
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
        },
        submitBtn: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            transition: '250ms ease-in-out',
            '&:hover': {
                transform: 'scale(1.08)',
                backgroundColor: theme.tertiary,
            },
        },
    }));

    const classes = useStyles();

    // ========= FUNÇÕES DE ENVIO =========

    function getFormData(form) {
        const elements = form.elements;
        let honeypot;

        const fields = Object.keys(elements).filter((k) => {
            if (elements[k].name === "honeypot") {
                honeypot = elements[k].value;
                return false;
            }
            return true;
        }).map((k) => {
            if (elements[k].name !== undefined) return elements[k].name;
            else if (elements[k].length > 0) return elements[k].item(0).name;
        }).filter((item, pos, self) => self.indexOf(item) === pos && item);

        const formData = {};
        fields.forEach((name) => {
            const element = elements[name];
            formData[name] = element.value;

            if (element.length) {
                const data = [];
                for (let i = 0; i < element.length; i++) {
                    const item = element.item(i);
                    if (item.checked || item.selected) data.push(item.value);
                }
                formData[name] = data.join(', ');
            }
        });

        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses";
        formData.formGoogleSendEmail = form.dataset.email || "";

        return { data: formData, honeypot };
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = getFormData(form);
        const data = formData.data;

        if (formData.honeypot) return false;

        disableAllButtons(form);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', form.action);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                form.reset();
                const thankYouMessage = form.querySelector(".thankyou_message");
                if (thankYouMessage) thankYouMessage.style.display = "block";
                setSuccess(true);
            }
        };
        const encoded = Object.keys(data)
            .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
            .join('&');
        xhr.send(encoded);
    }

    function disableAllButtons(form) {
        const buttons = form.querySelectorAll("button");
        buttons.forEach((btn) => btn.disabled = true);
    }

    useEffect(() => {
        const forms = document.querySelectorAll("form.contact__form");
        forms.forEach((form) => {
            form.addEventListener("submit", handleFormSubmit, false);
        });
    }, []);

    // ========== JSX ==========

    return (
        <div className='contacts' id='quero-ser-membro' style={{ backgroundColor: theme.secondary }}>
            <div className='contacts--container'>
                <h1 style={{ color: '#FFFFFF' }}>Quero Ser Membro</h1>
                <div className='contacts-body'>
                    <form
                        id="Forms-Contato"
                        method="POST"
                        data-email="sarahsophiapinto@gmail.com"
                        action="https://script.google.com/macros/s/AKfycbzuqPogDl8RMvYcp1lYY78bXky6jO75Ei0Btn1NxPjC3JAcpLD5VxVop8pdadtBm1YAmA/exec"
                        className="contact__form"
                    >
                        <div className="input-container">
                            <label htmlFor="name" className={classes.label}>Nome</label>
                            <input
                                required
                                placeholder="Insira seu nome completo"
                                type="text"
                                name="Name"
                                id="name"
                                className={`form-input ${classes.input}`}
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="phone" className={classes.label}>Telefone</label>
                            <input
                                required
                                placeholder="(00) 00000-0000"
                                type="tel"
                                name="Phone"
                                id="phone"
                                className={`form-input ${classes.input}`}
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="email" className={classes.label}>E-mail</label>
                            <input
                                required
                                placeholder="Insira seu e-mail"
                                type="email"
                                name="Email"
                                id="email"
                                className={`form-input ${classes.input}`}
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="terms" className={classes.label}>Termos de Conduta</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    required
                                    name="AcceptedTerms"
                                    id="terms"
                                    style={{ width: '18px', height: '18px' }}
                                />
                                <label htmlFor="terms" style={{ color: theme.tertiary, fontSize: '0.9rem' }}>
                                    Declaro que li e aceito os <a href="/termos" target="_blank" rel="noopener noreferrer" style={{ color: theme.primary, textDecoration: 'underline' }}>termos de conduta</a>.
                                </label>
                            </div>
                        </div>

                        <div className="thankyou_message" style={{ display: 'none' }}>
                            <p>Obrigada por se inscrever! Em breve entraremos em contato.</p>
                        </div>

                        <div className="submit-btn">
                            <button type="submit" className={classes.submitBtn}>
                                <p>{!success ? 'Quero ser membro' : 'Enviado'}</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default QueroSerMembro;