import Layout from '../components/site/Layout'
import SectionMenu from '../components/site/SectionMenu'
 
export default function Menu() {
  return (
    <Layout>
      <section className="section st-menu" data-animate="bottom">

        <div className="container">

          <div className="mb-6">
            <h1 className="is-size-2 has-text-centered">Uma variedade de Sabores & Delícias ...</h1>
            <hr className="st-line" />
          </div>

          <SectionMenu />

        </div>

      </section>

    </Layout>
  )
}
