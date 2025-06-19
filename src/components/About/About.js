import React from 'react';

import './About.css';

import { aboutData } from '../../data/aboutData'



function About() {

    return (
        <div className="about" id="about" style={{backgroundColor: '#1E2230'}}>
            <div className="line-styling">
              <div className="style-circle" style={{backgroundColor: '#3EA681'}}></div>
              <div className="style-circle" style={{backgroundColor: '#3EA681'}}></div>
              <div className="style-line" style={{backgroundColor: '#3EA681'}}></div>
            </div>
            <div className="about-body">
                <div className="about-description">
                    <h2 style={{color: '#FFFFFF', fontSize:'28px', position:'relative', alignItems:'center'}}>{aboutData.title}</h2>
                    <p style={{color:'#FFFFFF', fontSize:'14px'}}>{aboutData.description1}<br/><br/>{aboutData.description2}</p>
                </div>
            </div>
        </div>

    )
}

export default About
