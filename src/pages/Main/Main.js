import React from 'react'
import { Helmet } from 'react-helmet'

import { Navbar, Footer, Landing, About, Skills, Education, Blog, Experience, Contacts, Projects, Services } from '../../components'
import { headerData } from '../../data/headerData'

function Main() {
    return (
        <div>
            <Helmet>
                <title>{headerData.name} - Portfólio</title>
            </Helmet>

            <Navbar />        
            <Landing />
            <About />
            <Skills />
            <Projects />
            <Services />
            <Blog />
            <Education />
            <Experience />
            {
                /*
                <Testimonials />
                <Blog />
                <Achievement />
                */
            }
            <Contacts />
            <Footer />
        </div>
    )
}

export default Main
