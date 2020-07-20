import Layout from '../components/site/Layout'

const images = [
  {
    url: 'https://cdn.pixabay.com/photo/2016/10/22/20/34/wine-1761613__340.jpg',
    cols: 4,
  }, {
    url: 'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952__340.jpg',
    cols: 4,
  }, {
    url: 'https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975__340.jpg',
    cols: 4,
  }, {
    url: 'https://cdn.pixabay.com/photo/2015/08/24/15/00/wine-905098__340.jpg',
    cols: 6,
  }, {
    url: 'https://cdn.pixabay.com/photo/2015/02/24/11/54/vienna-647328__340.jpg',
    cols: 6,
  }, {
    url: 'https://cdn.pixabay.com/photo/2020/01/10/19/42/autumn-4756128__340.jpg',
    cols: 2,
  }, {
    url: 'https://cdn.pixabay.com/photo/2015/02/24/11/54/vienna-647328__340.jpg',
    cols: 5,
  }, {
    url: 'https://cdn.pixabay.com/photo/2015/02/24/11/54/vienna-647328__340.jpg',
    cols: 5,
  }, {
    url: 'https://cdn.pixabay.com/photo/2020/01/17/16/42/food-4773380__340.jpg',
    cols: 3,
  }, {
    url: 'https://cdn.pixabay.com/photo/2020/04/17/12/49/barista-5055060__340.jpg',
    cols: 3,
  }, {
    url: 'https://cdn.pixabay.com/photo/2016/11/29/03/37/chairs-1867099__340.jpg',
    cols: 3,
  }, {
    url: 'https://cdn.pixabay.com/photo/2012/12/20/10/13/table-71380__340.jpg',
    cols: 3,
  }, {
    url: 'https://cdn.pixabay.com/photo/2016/07/03/02/49/sushi-1494195__340.jpg',
    cols: 9,
    cover: true
  }, {
    url: 'https://cdn.pixabay.com/photo/2017/02/22/23/21/asian-food-2090947__340.jpg',
    cols: 3,
  }


]

export default function Galllery() {
  return (
    <Layout>
      <section className="section st-gallery" data-animate="bottom">

        <div className="container">

          <div className="mb-6">
            <h1 className="is-size-2 has-text-centered">Um lugar perfeito e aconchegante ...</h1>
            <hr className="st-line" />
          </div>

          <div className="columns is-multiline">

            {images.map((image, idx) => {
              const style = {
                objectFit: 'cover',
                maxHeight: '210px'
              }
              return (
                <div key={idx} className={`column is-${image.cols}`}>
                  <figure className="image">
                    <img src={image.url} alt="Imagem de nossa galeria" style={style}/>
                  </figure>
                </div>)
            })}

          </div>

        </div>
      </section>
    </Layout>
  )
}