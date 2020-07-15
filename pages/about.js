import Layout from '../components/site/Layout'
import { Carousel } from 'react-responsive-carousel'

export default function About(props) {
  return (
    <Layout>
      <BoxAbout01 />
      <BoxCounters />
      <OurTeam />
      <Testimonials />
    </Layout>
  )
}


function BoxAbout01() {
  return (
    <section className="section st-about">
      <div className="container">

        <div className="columns">
          <div className="column" data-animate="left">
            <img
              id="about-01-img"
              src="https://cdn.pixabay.com/photo/2016/11/29/03/37/chairs-1867099__340.jpg"
              alt="Prato principal do jantar"
              style={{ width: '100%' }}
            />
          </div>
          <div className="column" id="about-01" data-animate="right">
            <div>
              <h4>Um pouco sobre nós</h4>
              <p>
                Ao visitar nosso restaurante europeu, prepare-se para desfrutar de pratos verdadeiramente deliciosos e perfeitamente cozidos.
              </p>
              <p>
                O chef de renome mundial apresenta interpretações emocionantes da comida europeia em um arquiteto espacial de tirar o fôlego, Tadao Ando, ​​construído como uma pausa do caos ininterrupto da cidade de Nova York.
              </p>
            </div>
            <div>
              <h4>Porque nos escolher?</h4>
              <p>
                Congratulamo-nos com todas as pessoas a visitar o nosso restaurante! Todos podem encontrar a sua mesa perfeita e experimentar o prato incrível do nosso chef! Trabalhamos para que as pessoas tenham bom humor, criem uma atmosfera acolhedora e tornem o seu tempo incrível e divertido! Oferecer o melhor serviço é o nosso principal valor, pois as pessoas vêm até nós para descansar e estamos fornecendo sua residência perfeita.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

function BoxCounters() {
  return (
    <section className="section st-about" id="about-02" data-animate="bottom">
      <div className="container">
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="is-size-4">Visitantes</p>
              <p className="title is-2 mt-2">231.456</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="is-size-4">Reservas</p>
              <p className="title is-2 mt-2">42.345</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="is-size-4">Pedidos</p>
              <p className="title is-2 mt-2">432.456</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="is-size-4">Clientes</p>
              <p className="title is-2 mt-2">3.456</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OurTeam() {
  const team = [
    {
      image: 'https://images.unsplash.com/photo-1578738288760-05ce9be719d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      name: 'Marcia Kotlin',
      instagram: '@marciakotlin'
    }, {
      image: 'https://images.unsplash.com/photo-1577917781836-271a246aa6ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      name: 'Eric Macedo',
      instagram: '@ericmacedo'
    }, {
      image: 'https://images.unsplash.com/photo-1558021761-392d485d0676?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      name: 'Marcus Danthi',
      instagram: '@marcusdanthi'
    }, {
      image: 'https://images.unsplash.com/photo-1583130879770-ebd1cadc5d47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      name: 'Franklin Bastos',
      instagram: '@franklim'
    }
  ]

  return (
    <section className="section st-about" data-animate="bottom">

      <div className="container">

        <h1 className="is-size-2 has-text-centered">Nosso time de master-chefs</h1>
        <hr className="st-line" />

        <div className="columns is-variable is-8 mt-6">

          {team.map(person => (
            <div key={person.name} className="column">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={person.image} alt={person.name} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{person.name}</p>
                      <p className="subtitle is-6">{person.instagram}</p>
                    </div>
                  </div>
                  <div className="content">
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


function Testimonials() {
  const list = [
    {
      name: 'Gláucio Daniel',
      url: 'https://avatars1.githubusercontent.com/u/1216883?s=460&u=7db831b0e0731405a50cbce45a73d9c204f0a415&v=4',
      comment: 'O melhor restaurante de todos. Excelente ambiente aconchegante para familia. Pratos deliciosos. Comida requintada. Sem dúvida, idéia maravilhosa para um restaurante desse nivel perto da gente.'
    },     {
      name: 'João Rangel',
      url: 'https://avatars3.githubusercontent.com/u/334599?s=460&u=f3dd06b6b9186accc597e054804162a8f5ed3055&v=4',
      comment: 'Lugar pequeno, mas muuuuito agradável. Fomos bem atendidos do inicio ao fim.Um otimo lugar para se tomar um bom vinho seguido de delicioso prato.Adoramos e voltaremos mais vezes!'
    },     {
      name: 'Anthony Rafael',
      url: 'https://avatars1.githubusercontent.com/u/8269715?s=460&u=d65a5c01502ca3c056cf16f0630f4eed2a5c3437&v=4',
      comment: 'Excelente lugar! Comida maravilhosa, bom atendimento, ambiente super agradável! Recomendo as massas da Pantucci Trattoria: uma delícia! Vou voltar mais vezes e indicar aos amigos! Sucesso!'
    },    {
      name: 'Gustavo Guimarães',
      url: 'https://avatars1.githubusercontent.com/u/32143429?s=460&u=c44fcda9f8636230eee10a98e21ae8d05fdccf12&v=4',
      comment: 'Simplesmente maravilhoso este restaurante! O chef é brilhante, o atendimento é nota 1000 , os pratos são de comer de joelhos, preço justo e ambiente agradabilíssimo!'
    }
  ]

  return (
    <section className="section st-about" data-animate="bottom">
      <div className="container">
        <h1 className="is-size-2 has-text-centered">O que nossos clientes dizem</h1>
        <hr className="st-line" />
        <div className="has-text-centered">
          <i class="fa fa-quote-left fa-2x"></i>
        </div>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          showIndicators={false}
          showArrows={false}
          autoPlay={true}
          stopOnHover={false}
          interval={4000}
        >
          {list.map(item => (
            <div key={item.name} className="st-bgcolor-body">
              <p 
                className="has-text-centered has-text-gray py-5" 
                style={{ fontStyle: 'italic',
                         maxWidth: '60%',
                        margin: 'auto' }}
              >
                {item.comment}
              </p>
              <div className="has-text-centered mt-5">
                <figure className="image is-128x128 is-inline-block">
                  <img className="is-rounded" src={item.url} />
                </figure>
              </div>
              <p className="has-text-centered mt-2">
                {item.name}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}