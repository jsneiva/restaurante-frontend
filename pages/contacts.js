import Layout from '../components/site/Layout'
import Contact from '../components/site/Contact'

export default function Contacts() {
  return (
    <Layout>
      <section className="section st-contacts" data-animate="bottom">

        <div className="container">

          <div className="mb-6">
            <h1 className="is-size-2 has-text-centered">Nossos canais de atendimento</h1>
            <hr className="st-line" />
          </div>

          <div className="columns is-centered">
            <div className="column is-9 is-centered">
              <p className="has-text-justified">
                Estamos abertos a seus comentários e sua opinião sobre o restaurante Sabor & Delícia. Se você tiver alguma dúvida, sugestão ou oferta comercial, entre em contato conosco de qualquer maneira adequada. Cada hóspede pode reservar uma mesa ou fazer qualquer pergunta - nossos representantes responderão e fornecerão todas as informações necessárias.
              </p>
              <p className="mt-4">
                Estamos ansiosos para ouvir de você e vê-lo como nossos convidados!                                
              </p>
            </div>
          </div>
        </div>

      </section>

      <section id="contact-02" className="section st-contacts" data-animate="bottom">
        <div className="columns is-centered">
          <div className="column is-3">
            <div className="box">
              <p className="has-text-centered">
                <i className="fas fa-car fa-3x"></i>
              </p>
              <p className="mt-5 has-text-centered">
                Temos um estacionamento confortável, para que você possa deixar seu carro e desfrutar de suas refeições sem preocupações!                
              </p>
            </div>
          </div>
          <div className="column is-3">
            <div className="box">
              <p className="has-text-centered">
                <i className="fas fa-phone fa-3x"></i>
              </p>
              <p className="mt-5 has-text-centered">
                Estamos felizes e disponiveis para responder às suas perguntas ou fornecer informações por telefone comercial.                  
              </p>
              <p className="title is-4 mt-4 has-text-centered">
                (86) 3378-8678
              </p>
            </div>
          </div>
          <div className="column is-3">
            <div className="box">
              <p className="has-text-centered">
                <i className="fas fa-envelope fa-3x"></i>
              </p>
              <p className="mt-5 has-text-centered">
                Se desejar, envie-nos um e-mail com suas dúvidas ou sugestões. Nossa equipe irá atendê-lo prontamente e   responder as suas perguntas o mais breve possível.
              </p>
              <p className="title is-6 mt-4 has-text-centered">
                <a href="mailto:contato@saboredelicia.com.br">contato@saboredelicia.com.br</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact />

    </Layout>
  )
}
