import Link from 'next/link'

export default function({ icon, title, counter, bgColor, url }) {
  return (
    <Link href={url}>
      <a>
        <div className="adm-box-counter" style={{ backgroundColor: bgColor }}>
              <div data-icon>
                <i className={icon}></i>
              </div>
              <div data-container>
                <p data-title>{title}</p>
                <hr/>
                <p data-counter>{counter}</p>
              </div>
        </div>
      </a>
    </Link>
  )
}