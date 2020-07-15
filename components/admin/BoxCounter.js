
export default function({ icon, title, counter, bgColor }) {
  return (
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
  )
}