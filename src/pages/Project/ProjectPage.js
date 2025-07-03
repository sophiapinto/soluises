import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineHome } from "react-icons/ai";
import Modal from '../../components/Modal/Modal';
import './ProjectPage.css'
import { SingleProject } from '../../components';
import { ThemeContext } from '../../contexts/ThemeContext';
import { projectsData } from '../../data/projectsData'
import { headerData } from '../../data/headerData'
import { Button } from '@material-ui/core';

function ProjectPage() {

    const [search, setSearch] = useState('')
    const { theme } = useContext(ThemeContext);
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    

    const filteredArticles = projectsData.filter((project) => {
        const content = project.projectName + project.projectDesc + project.tags
        return content.toLowerCase().includes(search.toLowerCase())
    })

    const handleOpenModal = (demo) => {
            setModalContent(demo); // Passa o demo para o modal
            setOpenModal(true);    // Abre o modal
    };

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
    setLoading(true);

    const form = event.target;
    const formData = getFormData(form);
    const data = formData.data;

    if (formData.honeypot) {
      setLoading(false);
      return false;

    }
    disableAllButtons(form);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
        setLoading(false);
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

     const downloadPDF = (driveViewLink) => {
        if (!driveViewLink) return;

        const match = driveViewLink.match(/\/d\/([a-zA-Z0-9_-]+)\//);
        const fileId = match?.[1];

        if (!fileId) return;

        const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const link = document.createElement('a');
        link.href = downloadLink;
        link.download = 'report-soluises.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const useStyles = makeStyles((t) => ({
        search : {
            color: theme.tertiary, 
            width: '40%',
            height: '2.75rem',
            outline: 'none',
            border: 'none',
            borderRadius: '20px',
            padding: '0.95rem 1rem',
            fontFamily: "'Noto Sans TC', sans-serif",
            fontWeight: 500,
            fontSize: '0.9rem',  
            backgroundColor: theme.secondary, 
            boxShadow: theme.type === 'dark' ? 'inset 3px 3px 6px #ffffff10, inset -3px -3px 6px #00000060' : 'inset 3px 3px 6px #ffffffbd, inset -3px -3px 6px #00000030',
            "&::placeholder": {
                color: theme.tertiary80, 
            },
            [t.breakpoints.down('sm')]: {
                width:'350px',
            },
        },
        home: {
            color: '#ffffff',
            position: 'absolute',
            top: 25,
            left: 25,
            padding: '7px',
            borderRadius: '50%',
            boxSizing: 'content-box',
            fontSize: '2rem',
            cursor: 'pointer',
            boxShadow: theme.type === 'dark' ? '3px 3px 6px #fffffff, -3px -3px 6px #00000050' : '3px 3px 6px #fffffff, -3px -3px 6px #ff',
            transition: 'all 0.3s ease-in-out',
            "&:hover": 
            {
                color: theme.tertiary,
                transform: 'scale(1.1)',
            },
            [t.breakpoints.down('sm')]: {
                fontSize: '1.8rem',
            },
        },
    }));

    const classes = useStyles();

    return (
        <>
        <div className="projectPage" style={{backgroundColor: theme.secondary}}>

            <div className="projectPage-header" style={{backgroundColor:theme.primary}}>
                <Link to="/">
                        <AiOutlineHome className={classes.home}/>
                </Link>
                <h1 style={{color: '#ffffff'}}>Reports</h1>
            </div>
           <div className="projectPage-container">
               <div className="projectPage-search">
                   <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquise..." className={classes.search} />
               </div>
               <div className="project-container">
                   <Grid className="project-grid" container direction="row" alignItems="center" justifyContent="center">
                        {filteredArticles.map(project => (
                            <SingleProject
                                theme={theme}
                                key={project.id}
                                id={project.id}
                                name={project.projectName}
                                desc={project.projectDesc}
                                tags={project.tags}
                                code={project.code}
                                demo={project.code}
                                image={project.image} 
                                onDemoClick={handleOpenModal}
                            />
                        ))}
                   </Grid>
               </div>

           </div>  
           <Modal isOpen={openModal} setModalOpen={setOpenModal} title="Diga quem você é para fazer download!">
                        {!success ? (
                      <form
                        method="POST"
                        data-email="comunidadesoluises@gmail.com"
                        action="https://script.google.com/macros/s/AKfycbxdyIOuDNl0tglUVgeiZsVoCqwx6KSL5PvoRY1RKOei0ysJfEQGspy2DYcroijdwjIQkw/exec"
                        className="queroser-form"
                        onSubmit={(e) => handleFormSubmit(e, setSuccess)}
                      >
                      <div className="form-row">
                          <div className="input-container">
                              <label htmlFor="name">Nome</label>
                              <input
                              required
                              placeholder="Digite seu nome como deseja ser chamado(a/e) pela comunidade"
                              type="text"
                              name="Nome"
                              id="name"
                              />
                          </div>
                          <div className="input-container">
                              <label htmlFor="telefone">Telefone</label>
                              <input
                              required
                              placeholder="Informe o número com DDD"
                              type="tel"
                              name="Telefone"
                              id="telefone"
                              pattern="\(?\d{2}\)?\s?\d{4,5}-?\d{4}"
                              title="Informe um telefone válido com DDD"
                              />
                          </div>
                          <div className="input-container">
                              <label htmlFor="cidade">Cidade/UF</label>
                              <input
                              required
                              placeholder="Ex: São Luís/MA"
                              type="text"
                              name="CidadeUF"
                              id="cidade"
                              />
                          </div>
                          <div className="input-container">
                              <label htmlFor="raca">Raça/cor</label>
                              <select required name="RacaCor" id="raca">
                              <option value="">Selecione</option>
                              <option value="Preta">Preta</option>
                              <option value="Parda">Parda</option>
                              <option value="Branca">Branca</option>
                              <option value="Amarela">Amarela</option>
                              <option value="Indígena">Indígena</option>
                              <option value="Prefiro não dizer">Prefiro não dizer</option>
                              </select>
                          </div>
                          <div className="input-container">
                              <label htmlFor="genero">Gênero</label>
                              <select required name="Genero" id="genero">
                              <option value="">Selecione</option>
                              <option value="Mulher cis">Mulher cis</option>
                              <option value="Mulher trans">Mulher trans</option>
                              <option value="Homem cis">Homem cis</option>
                              <option value="Homem trans">Homem trans</option>
                              <option value="Pessoa não-binária">Pessoa não-binária</option>
                              <option value="Outro">Outro</option>
                              <option value="Prefiro não dizer">Prefiro não dizer</option>
                              </select>
                          </div>
                          <div className="input-container">
                              <label htmlFor="profissao">Profissão ou área de atuação</label>
                              <input
                              required
                              placeholder="Ex: Engenheira de Software"
                              type="text"
                              name="ProfissaoArea"
                              id="profissao"
                              />
                          </div>
                      </div>
                
                
                        <div className="submit-btn">
                          <Button type="submit" className={classes.resumeBtn} disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar'}
                          </Button>
                        </div>
                      </form>) : 
                      (
                      <div className='queroser-grupo'>
                            <p style={{ marginBottom: '1rem' }}>Baixe o Report Agora!</p>
                              <Button
                                className={classes.resumeBtn}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>  
                                {
                                     downloadPDF(modalContent);
                                     setOpenModal(false)
                                }}
                              >
                                Baixar Report
                              </Button>
                      </div>
                     )}     
            </Modal>
             
        </div>

        
        </>
    )
}

export default ProjectPage
