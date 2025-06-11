import { Navbar, Footer, Landing, About, Testimonials, Education, Contacts, Projects, Blog } from '../../components'

function Main() {
    return (
        <div>
            <Navbar />        
            <Landing />
            <About />
            <Testimonials />
            <Education /> {/*IMPACTO*/}
            <Projects /> {/*AÇÕES*/}
            <Blog /> {/*REPORTS*/}
            <Contacts />
            <Footer />
        </div>
    )
}

export default Main
