import { Navbar, Footer, Landing, About, Testimonials, Education, Contacts, Projects, Blog, QueroSerMembro, Skills } from '../../components'

function Main() {
    return (
        <div>
            <Navbar />        
            <Landing />
            <About />
            <Testimonials />
            <Education /> {/*IMPACTO*/}
            <Skills /> {/*Galeria*/}
            <Blog /> {/*AÇÕES*/}
            <Projects /> {/*REPORTS*/}
            <QueroSerMembro  />
            <Contacts />
            <Footer />
        </div>
    )
}

export default Main
