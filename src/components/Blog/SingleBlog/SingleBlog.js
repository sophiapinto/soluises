import React from 'react'
import Fade from 'react-reveal/Fade';

import placeholder from '../../../assets/png/placeholder.png'
import './SingleBlog.css'
import { Button } from '@material-ui/core';

function SingleBlog({ theme, title, desc, date, image, id }) {
    return (
        <Fade bottom>
            <a className="singleBlog" key={id} style={{backgroundColor: '#D63826'}}>
                <div className="singleBlog--image" style={{backgroundColor: theme.secondary}}>
                    <img src={image ? image : placeholder} alt={title} />
                </div>
                <div className="singleBlog--body">
                    <p style={{color: '#ffffff'}}>{date}</p>
                    <h3 style={{color: '#ffffff'}}>{title}</h3>
                    <h6 style={{color: '#ffffff'}}>{desc}</h6>
                </div>
            </a>
        </Fade>
    )
}

export default SingleBlog
