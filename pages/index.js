import axios from '../config/axios'
import utils from '../utils/utils'
import Link from 'next/link'
import Layout from '../components/site/Layout'
import Carousel from '../components/site/Carousel'
import Reservations from '../components/site/Reservations'

export default function Home(props) {
  return (
    <Layout>
      <Carousel />
      <Welcome />
      <BestDishes />
      <Promotions list={props.listPromo} />
      <OurGallery />
      <Reservations />
    </Layout>
  )
}


function Welcome() {
  return (
    <section className="hero has-background-white st-welcome">
      <div className="hero-body" data-animate="bottom">
        <h1 className="title is-2 has-text-centered">Seja bem vindo ao Sabor & Delícia</h1>
        <hr className="st-line" />
        <div className="columns is-centered">
          <div className="column is-9">
            <p className="has-text-justified is-size-5">
              Convidamos você para uma deliciosa festa de nossos pratos requintados. Com uma ampla variedade de cozinhas do mundo à sua escolha, garantimos uma suntuosa festa no nosso restaurante! Aqui você mergulhará em uma atmosfera amigável e romântica e desfrutará de nossa alta cozinha. Com a nossa grande variedade de pratos de todo o mundo, você pode se sentir um viajante e um verdadeiro gourmet!
            </p>
          </div>
        </div>
      </div>
   </section>
  )
}


function BestDishes() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column" data-animate="left">
              <div className="column">
                <h4 className="title is-3">
                  "O melhor da gastronomia contemporânea, aliada a uma alimentação saudável e prazerosa."
                </h4>
                <p className="is-size-5">
                  A <span style={{fontWeight:"bold", fontStyle:"italic"}}>"Bisteca na parrilha"</span> é o carro-chefe da casa. Proveniente de carne de uma raça bovina especial, como todos os cortes da churrascaria, a bisteca é temperada apenas com sal grosso para destacar o sabor e qualidade da carne. Para alcançar o ponto ideal, a porção de 100 gramas leva aproximadamente 10 minutos na parrilha, que é levada ao fogo somente após o pedido do cliente.
                </p>
                <button className="button is-danger is-medium mt-5">Mais opções</button>
              </div>
            </div>
            <div className="column" data-animate="right">
              <img 
                src="https://ld-wp73.template-help.com/wordpress/prod_21791/v1/wp-content/uploads/2018/06/home-img-1.png" 
                alt="Prato principal do restaurante"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column" data-animate="left">
              <img 
                src="https://ld-wp73.template-help.com/wordpress/prod_21791/v1/wp-content/uploads/2018/06/home-img-2.png" 
                alt="Prato principal do jantar"
              />
            </div>
            <div className="column" data-animate="right">
              <h4 className="title is-3">
                "Pratos deliciosos de frutos do mar, preparados com requinte e temperos de qualidade."
              </h4>
              <p className="is-size-5">
                O <span style={{fontWeight:"bold", fontStyle:"italic"}}>"Camarão na Moranga"</span> é um prato típico da culinária litorânea brasileira, sendo servido e preparado com uma abóbora do tipo moranga, recheada com camarão e requeijão além de um tempero especial. Confira suas histórias e curiosidades, além de uma receita exclusiva criada por nossa equipe.              
              </p>
              <button className="button is-danger is-medium mt-5">Ver o cardápio</button>            
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


function Promotions({ list }) {
  
  if (! list.length) {
    return null
  }

  return (
    <section className="section" data-animate="bottom">
      <div className="container">
        <div className="mb-6">
          <h1 className="title is-2 has-text-centered">Confira nossas promoções para hoje</h1>
          <hr className="st-line" />
        </div>
        <div className="columns is-variable is-8">
          {list.slice(0, 3).map((item, index) => (
            <div key={index} className="column st-promotions">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img 
                      src={item.urlImage} 
                      alt={item.name} />
                  </figure>
                </div>
                <div className="card-content">
                  <h4 className="title is-4 mb-3">{item.name}</h4>
                  <p className="has-text-justified description">{item.description}</p>
                  <div className="level">
                    <button className="level-left button is-danger is-medium">Eu quero</button>
                    <p className="level-right is-size-3 has-text-right price">{utils.formatCurrency(item.price_promo)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>        
      </div>
    </section>
  )
}


function OurGallery() {
  return (
    <section className="section" data-animate="bottom">

      <div className="container">

        <div className="mb-6">
          <h1 className="title is-2 has-text-centered">Um ambiente perfeito ...</h1>
          <hr className="st-line" />
        </div>

        <div className="columns mt-6">
          <div className="column">
            <figure className="image is-4by2">
              <img 
                src="https://cdn.pixabay.com/photo/2015/04/20/13/30/kitchen-731351__340.jpg" 
                alt="Imagem do nosso ambiente"
              />
            </figure>
          </div>
          <div className="column">
            <figure className="image is-4by2">
              <img 
                src="https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784__340.jpg" 
                alt="Imagem do nosso ambiente"
              />
            </figure>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <figure className="image is-3by1">
              <img 
                src="https://cdn.pixabay.com/photo/2017/08/30/17/25/restaurant-2697945__340.jpg" 
                alt="Imagem do nosso ambiente"
              />
            </figure>
          </div>
        </div>        

        <div className="columns">

          <div className="column">
            <div className="columns">
              <div className="column">
                <figure className="image is-2by1">
                  <img 
                    src="https://cdn.pixabay.com/photo/2018/08/10/21/52/restaurant-3597677__340.jpg" 
                    alt="Imagem do nosso ambiente"
                  />
                </figure>
              </div>  
            </div>
            <div className="columns">
              <div className="column">
                <figure className="image is-2by1">
                  <img 
                    src="https://cdn.pixabay.com/photo/2014/04/05/11/27/buffet-315691__340.jpg" 
                    alt="Imagem do nosso ambiente"/>
                </figure>
              </div>
            </div>
          </div>

          <div className="column">
            <figure className="image is-1by1" style={{height: '100%'}}>
              <img 
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" 
                alt="Imagem do nosso ambiente"
                style={{objectFit: 'cover', objectPosition: 'bottom'}}/>
            </figure>
          </div>

        </div>

        <div className="columns is-centered mt-5">
          <Link href="/gallery"><a className="button is-danger is-large">Quero ver mais ...</a></Link>
        </div>

      </div>

    </section>
  )
}


export async function getServerSideProps(ctx) {
  let listPromo = []
  try {
    const resp = await axios.get('/menu/products?is_promo=true')    
    listPromo = resp.data
  } catch (error) {
    console.log('Falha na busca dos itens em promoção')
  }
  return {
    props: { listPromo }
  }
}