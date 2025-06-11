import React, { useContext } from 'react';

import './About.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { aboutData } from '../../data/aboutData'



function About() {

    const { theme } = useContext(ThemeContext);
    return (
        <div className="about" id="about" style={{backgroundColor: '#1E2230'}}>
            <div className="line-styling">
              <div className="style-circle" style={{backgroundColor: '#3EA681'}}></div>
              <div className="style-circle" style={{backgroundColor: '#3EA681'}}></div>
              <div className="style-line" style={{backgroundColor: '#3EA681'}}></div>
            </div>
            <div className="about-body">
                <div className="about-description">
                    <h2 style={{color: '#FFFFFF'}}>{aboutData.title}</h2>
                    <p style={{color:'#FFFFFF'}}>{aboutData.description1}<br/><br/>{aboutData.description2}</p>
                </div>
{/*
                <div className="about-img">
                    <img 
                        src={aboutData.image === 1 ? theme.aboutimg1 : theme.aboutimg2}  
                        alt="" 
                    />
                </div>


*/}
    </div>
        </div>

    )
}

export default About
