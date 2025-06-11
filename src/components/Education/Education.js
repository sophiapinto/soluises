import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Education.css'
import EducationCard from './EducationCard';

import { educationData } from '../../data/educationData'

function Education() {

    const { theme } = useContext(ThemeContext);
    return (
        <div className="education" id="resume" style={{backgroundColor: '#1E2230'}}>
           
            <div className="education-body">
                <div className="education-description">
                <h1 style={{color:theme.primary}}>Impacto</h1>
                    {educationData.map(edu => (
                        <EducationCard 
                            key={edu.id}
                            id={edu.id}
                            course={edu.course}
                            metrica={edu.metrica}
                        />
                    ))}
                </div>
                <div className="education-image">
                    <img src={theme.imageImpacto} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Education
