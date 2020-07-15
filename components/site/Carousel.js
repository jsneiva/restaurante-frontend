import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'

const slideItems = [
  {
    image: 'https://ld-wp73.template-help.com/wordpress/prod_21791/v1/wp-content/uploads/2018/06/slide-02.png',
    title: 'Não coma menos. Apenas coma de verdade.', 
    button: 'Faça seu pedido',
    link: '/'
  }, {
    image: 'https://ld-wp73.template-help.com/wordpress/prod_21791/v1/wp-content/uploads/2018/06/slide-03.png',
    title: 'Saboreie nossos pratos sem sair de casa.', 
    button: 'Veja nosso cardápio',
    link: '/menu'
  }, {
    image: 'https://ld-wp73.template-help.com/wordpress/prod_21791/v1/wp-content/uploads/2018/06/slide-04.png',
    title: 'As melhores refeições, você encontra aqui.', 
    button: 'Faça sua reserva',
    link: '/#reservas'
  }, {
    image: 'https://ld-wp73.template-help.com/wordpress/prod_21791/v1/wp-content/uploads/2018/06/slide-05.png',
    title: 'Bateu aquela fome? A gente resolve.', 
    button: 'Peça já!',
    link: '/'
  },
]

export default function(props) {

  function renderItem(item, { isSelected }) {
    const itemSlide = slideItems[+item.key]
    return (
      <div className="st-slider-container">
        {item}
        {isSelected &&
          <div className="st-slider-body animate__animated animate__fadeInUp">
            <h1>{itemSlide.title}</h1>
            <Link href={itemSlide.link}><a className="button is-primary is-large is-size-7-mobile mt-4">{itemSlide.button}</a></Link>
          </div>
        }
      </div>
    )
  }

  return (
    <Carousel 
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      stopOnHover={false}
      interval={6000}
      renderItem={renderItem}
    >
      {slideItems.map((item, index) => <img key={index} src={item.image} alt=""/>)}
    </Carousel>
  )
}

