import Link from 'next/link'

export default function(props) {
  return (
    <div id="notfound">
      <h1>:(</h1>
      <div>
        <h2>Ops!!! - Página não encontrada!</h2>
        <p>A página que você está procurando não existe ou está temporariamente indisponível.</p>
        <Link href="/"><a className="button is-link">Voltar para o site</a></Link>
      </div>          
  	</div>
  )
}