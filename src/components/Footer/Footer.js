import React, { useContext } from 'react'
import './Footer.css'
import { ThemeContext } from '../../contexts/ThemeContext'


function Footer() {
    
    const { theme }  = useContext(ThemeContext)

    return (
        <div className="footer" style={{backgroundColor: theme.secondary}}>
            <p style={{color: theme.tertiary}}>
                Desevolvido por  
                <span style={{color: theme.primary, margin: '0 0.5rem -1rem 0.5rem', fontSize:'19px', backgroundColor:'#D63826'}}>
                    Squad de Tecnologia da SOLuises
                </span>
                © Copyright 2025.
            </p>
        </div>
    )
}

export default Footer

