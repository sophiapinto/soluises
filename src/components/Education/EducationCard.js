import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';

import { ThemeContext } from '../../contexts/ThemeContext';
import './Education.css';

function EducationCard({ id, institution, course }) {
    const { theme } = useContext(ThemeContext);

    const useStyles = makeStyles(() => ({
        educationCard: {
            backgroundColor: '#FFFFFF',
            transition: 'background-color 200ms ease-in-out',
            "&:hover": {
                backgroundColor: theme.primary50,
            },
        },
    }));

    const classes = useStyles();

    return (
        <Fade bottom>
            <div key={id} className={`education-card ${classes.educationCard}`}>
                <div className="education-details">
                    <h1>{institution}</h1>
                </div>
                <div className="education-details">
                    <h5>{course}</h5>
                </div>
            </div>
        </Fade>
    );
}

export default EducationCard;