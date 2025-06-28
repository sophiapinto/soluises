
import { makeStyles } from '@material-ui/core/styles';
import {FaDownload , FaEye  } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';


import placeholder from '../../../assets/png/placeholder.png';
import './SingleProject.css';

function SingleProject({ id, name, desc, tags, image, code, theme, demo, onDemoClick  }) {
    const useStyles = makeStyles((t) => ({
        iconBtn: {
            all: 'unset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 50,
            border: `2px solid ${theme.tertiary}`,
            color: theme.tertiary,
            transition: 'all 0.2s',
            '&:hover': {
                backgroundColor: theme.secondary,
                color: theme.primary,
                transform: 'scale(1.1)',
                border: `2px solid ${theme.secondary}`,
            },
        },
        icon: {
            fontSize: '1.1rem',
            transition: 'all 0.2s',
            '&:hover': {},
        },

        downloadButton: {
            backgroundColor: '#D63826',
            color: '#FFFFFF',
            '&:hover': {
            backgroundColor: 'rgb(30, 34, 48)',
            color: '#FFFFFF',
        }},
    }));

    const classes = useStyles();
    

     // Função para abrir modal com a URL do demo
    const handleDemoClick = (e) => {
        e.preventDefault();
        if (onDemoClick) {
            onDemoClick(demo); // sempre abre modal com demo
    }
};
    return (
        <>
          <Fade bottom>
            <div
                key={id}
                className='singleProject'
                 style={{ backgroundColor: '#D63826', borderRadius: '20px'}}
            >
                <div className='projectContent'>
                  
                    <img src={image ? image : placeholder} alt={name} />
                    <div className='project--showcaseBtn'>
                        
                         <button 
                            onClick={handleDemoClick}
                            className={classes.iconBtn}
                            aria-label="Demo"
                            title="Ver demo"
                            >
                            <FaDownload className={classes.icon} />
                        </button>              
                        
                        {/*<a
                            href={code}
                            target='_blank'
                            rel='noreferrer'
                            className={classes.iconBtn}
                            aria-labelledby={`${name
                                .replace(' ', '-')
                                .toLowerCase()} ${name
                                .replace(' ', '-')
                                .toLowerCase()}-code`}
                        >
                            <FaEye
                                id={`${name
                                    .replace(' ', '-')
                                    .toLowerCase()}-code`}
                                className={classes.icon}
                                aria-label='Code'
                            />
                        </a>*/}
                    </div>
                </div>
                <p
                    className='project--desc'
                    style={{
                        background: theme.secondary,
                        color: theme.tertiary,
                    }}
                >
                    {desc}
                </p>
                <div
                    className='project--lang'
                    style={{
                        background: theme.secondary,
                        color: theme.tertiary,
                    }}
                >
                    {tags.map((tag, id) => (
                        <span key={id}>{tag}</span>
                    ))}
                </div>
            </div>
        </Fade>
        
        </>
        
    );
}

export default SingleProject;
