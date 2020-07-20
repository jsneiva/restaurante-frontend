import Link from 'next/link'


export default function Footer(props) {
  return (
    <footer className="has-background-grey-dark has-text-grey-light">

      <div className="container">

        <div className="columns pt-6 pb-6">

          <div className="column has-text-centered">
            <h4 className="subtitle has-text-weight-medium has-text-grey-lighter">Nossa localização</h4>
            <p>Rua fulano de tal, 1072 Parque Piaui<br />
              Teresina-PI CEP: 65636-176<br />
              CNPJ 12.222.222/0001-99
            </p>
          </div>

          <div className="column has-text-centered">
          <h4 className="subtitle has-text-weight-medium has-text-grey-lighter">Siga-nos</h4>
            <p className="buttons is-centered">
              <a className="button is-light is-outlined" href="/facebook">
                <span className="icon">
              <i className="fab fa-facebook-f"></i></span>
              </a>
              <a className="button is-light is-outlined" href="/instagram">
                <span className="icon">
                  <i className="fab fa-instagram"></i>
                </span>
              </a>
              <a className="button is-light is-outlined" href="/twitter">
                <span className="icon">
                  <i className="fab fa-twitter"></i>
                </span>
              </a>
              <a className="button is-light is-outlined" href="/linkedin">
                <span className="icon">
                  <i className="fab fa-linkedin"></i>
                </span>
              </a>

              <a className="button is-light is-outlined" href="/youtube">
                <span className="icon">
                  <i className="fab fa-youtube"></i>
                </span>
              </a>
            </p>
          </div>

          <div className="column has-text-centered">
            <h4 className="subtitle has-text-weight-medium has-text-grey-lighter">Fale Conosco</h4>
            <ul>
              <li className="pb-2"><i className="fas fa-phone"></i><span className="pl-2">(86) 3317-1288</span></li>
              <li className="pb-2"><i className="fab fa-whatsapp"></i><span className="pl-2">(86) 99817-1234</span></li>
              <li>
                <i className="far fa-envelope"></i>
                  <a className="has-text-grey-light pl-2" href="mailto:contato@sabordelicia.com.br">
                    contato@saboredelicia.com.br
                  </a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      <div className="container is-fluid has-background-dark st-footer-line">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <div className="columns is-gapless is-vcentered">
                <a className="column is-2 is-hidden-mobile" href="nortelink.com.br">
                  <img className="logo" src="/images/logo.svg" alt="Logo do Sabor e Delícia restaurante" />
                </a>
                <span className="column ml-2">Copyright © 2020. Todos os direitos reservados.</span>
              </div>
            </div>
            <div className="column has-text-centered">
              <Link  href="/privacypolicy"><a>Política de privacidade</a></Link>
            </div>
            <div className="column is-hidden-mobile">
              <div className="navbar has-background-dark">
                <div className="navbar-menu">

                  <div className="navbar-end">
                    <Link href="/"><a className="navbar-item has-text-grey-light">Home</a></Link>
                    <Link href="/cardapio"><a className="navbar-item has-text-grey-light">Cardápio</a></Link>
                    <Link href="/gallery"><a className="navbar-item has-text-grey-light">Galeria</a></Link>
                    <Link href="/about"><a className="navbar-item has-text-grey-light">Sobre</a></Link>
                    <Link href="/contacts"><a className="navbar-item has-text-grey-light">Contato</a></Link>              
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

{/* <footer className="st-footer">
<div className="st-footer-body">
  <div>
    <h4>Nossa localização</h4>
    <p>Rua fulano de tal, 1072 Parque Piaui<br />
       Teresina-PI CEP: 65636-176<br />
       CNPJ 12.222.222/0001-99
    </p>
  </div>
  <div>
    <h4>Siga-nos</h4>
  </div>
  <div>
    <h4>Fale conosco</h4>
    <ul>
      <li><i className="fas fa-phone"></i> (86) 3317-1288</li>
      <li><i className="fab fa-whatsapp"></i> (86) 99817-1234</li>
      <li>
        <i className="far fa-envelope"></i>
        <span> </span>
        <a href="mailto:contato@sabordelicia.com.br">
          contato@sabordelicia.com.br
        </a>
      </li>
    </ul>
  </div>
</div>
<div className="st-footer-bottom">
  Botão
</div>
</footer> */}
