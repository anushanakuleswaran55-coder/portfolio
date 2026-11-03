import About from './components/About'
import Contact from './components/Contact'
import Education from './components/Education'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import References from './components/References'
import ScrollProgress from './components/ScrollProgress'
import Skills from './components/Skills'
import StarField from './components/StarField'

export default function App() {
  return (
    <>
      <StarField count={50} />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <References />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
