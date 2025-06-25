import React, { useContext, useState} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './Landing.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { headerData } from '../../data/headerData';
import Modal from '../Modal/Modal';
import './FormsQueroserMembro.css';
import { AiOutlineSend, AiOutlineCheckCircle } from 'react-icons/ai';

function Landing() {
    const { theme, drawerOpen } = useContext(ThemeContext);
    const [success, setSuccess] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    

    const useStyles = makeStyles((t) => ({
        resumeBtn: {
            color: '#ffffff',
            backgroundColor: '#D63826',
            borderRadius: '30px',
            textTransform: 'inherit',
            textDecoration: 'none',
            width: '200px', // button princiapl vermelho antes era 150 px
            fontSize: '1rem',
            fontWeight: '500',
            height: '50px',
            fontFamily: 'var(--primaryFont)',
            border: `3px solid #D63826`,
            transition: '100ms ease-out',
            '&:hover': {
                backgroundColor: theme.tertiary,
                color: theme.secondary,
                border: `3px solid ${theme.tertiary}`,
            },
            [t.breakpoints.down('sm')]: {
                width: '200px',
            },
        },
    }));

    
    function getFormData(form) {
    const elements = form.elements;
    let honeypot;

    const fields = Object.keys(elements)
        .filter((k) => {
        if (elements[k].name === 'honeypot') {
            honeypot = elements[k].value;
            return false;
        }
        return true;
        })
        .map((k) => {
        if (elements[k].name !== undefined) return elements[k].name;
        if (elements[k].length > 0) return elements[k].item(0).name;
        })
        .filter((item, pos, self) => self.indexOf(item) === pos && item);

    const formData = {};
    fields.forEach((name) => {
        const element = elements[name];
        formData[name] = element.value;

        if (element.length) {
        const data = [];
        for (let i = 0; i < element.length; i++) {
            const item = element.item(i);
            if (item.checked || item.selected) {
            data.push(item.value);
            }
        }
        formData[name] = data.join(', ');
        }
    });

    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || 'responses';
    formData.formGoogleSendEmail = form.dataset.email || '';

    return { data: formData, honeypot: honeypot };
    }

    function handleFormSubmit(event, setSuccess) {
    event.preventDefault();
    const form = event.target;
    const formData = getFormData(form);
    const data = formData.data;

    if (formData.honeypot) return false;

    disableAllButtons(form);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset();
        const thankYouMessage = form.querySelector('.thankyou_message');
        if (thankYouMessage) thankYouMessage.style.display = 'block';
        setSuccess(true);
        }
    };

    const encoded = Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');
    xhr.send(encoded);
    }

    function disableAllButtons(form) {
    const buttons = form.querySelectorAll('button');
    buttons.forEach((btn) => (btn.disabled = true));
    }


    const classes = useStyles();

    return (
        /* Landing */
        <div className='landing'>
            <div className='landing--container'>
                <div
                    className='landing--container-left'
                    style={{ backgroundColor: '#ffffff' }}
                >
                </div>
                <img
                    src={headerData.image}
                    alt=''
                    className='landing--img'
                    style={{
                        opacity: `${drawerOpen ? '0' : '1'}`,
                        borderColor: theme.secondary,
                    }}
                />
                <div
                    className='landing--container-right'
                    style={{ backgroundColor: theme.secondary }}
                >
                    <div
                        className='lcr--content'
                        style={{ color: theme.tertiary }}
                    >

                        <h1>{headerData.name}</h1>
                        <p>{headerData.desciption}</p>

                        <div className='lcr-buttonContainer'>
                                <a
                                    //href= '#contact'
                                    //download='ebook'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <Button onClick={() => setOpenModal(true)} className={classes.resumeBtn}>
                                        Quero ser membro
                                    </Button>
                                    
                                </a>

                        </div>
                    </div>
                </div>
            </div>

            {/* ----- Modal Form ----*/}
            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} title={'Quero ser Membro'}>
                      <form
                    method="POST"
                    data-email="sarahsophiapinto@gmail.com"
                    action="https://script.google.com/macros/s/AKfycbzuqPogDl8RMvYcp1lYY78bXky6jO75Ei0Btn1NxPjC3JAcpLD5VxVop8pdadtBm1YAmA/exec"
                    className="queroser-form"
                    onSubmit={(e) => handleFormSubmit(e, setSuccess)}
                  >
                    <div className="input-container">
                      <label htmlFor="name">Nome</label>
                      <input
                        required
                        placeholder="Digite seu nome"
                        type="text"
                        name="Name"
                        id="name"
                      />
                    </div>
            
                    <div className="input-container">
                      <label htmlFor="phone">Telefone</label>
                      <input
                        required
                        placeholder="(00) 00000-0000"
                        type="tel"
                        name="Phone"
                        id="phone"
                      />
                    </div>
            
                    <div className="input-container">
                      <label htmlFor="email">E-mail</label>
                      <input
                        required
                        placeholder="Digite seu e-mail"
                        type="email"
                        name="Email"
                        id="email"
                      />
                    </div>
            
                    <div className="input-container checkbox-group">
                      <input
                        type="checkbox"
                        required
                        name="AcceptedTerms"
                        id="terms"
                      />
                      <span>
                        Declaro que li e aceito os{' '}
                        <a href="https://drive.google.com/file/d/16HaHKI2rYa_fepWI3aQqAzwskbLdVaI3/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                          termos de conduta
                        </a>
                      </span>
                    </div>
            
                    <div className="thankyou_message" style={{ display: 'none' }}>
                      <p>Obrigada por se inscrever! Em breve entraremos em contato.</p>
                    </div>
            
                    <div className="submit-btn">
                      <button type="submit" onClick={() => setOpenModal(true)}>
                        <p>{!success ? 'Enviar' : 'Enviado'}</p>
                        {!success ? (
                          <AiOutlineSend className="send-icon" />
                        ) : (
                          <AiOutlineCheckCircle className="success-icon" />
                        )}
                      </button>
                    </div>
                  </form>
                      
                </Modal>
        </div>
    );
}

export default Landing;
