import { useState, useEffect, forwardRef } from 'react'

export default forwardRef(({ 
  label, 
  name, 
  className, 
  small, 
  ...rest 
}, ref) => {
  const cssClass = 'file has-name is-left is-fullwidth' + 
                   (small ? ' is-small' : '') +
                   (className ? ' ' + className : '')                   
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    ref.current.onchange = () => {
      const files = ref.current.files
      setFileName(files.length ? files[0].name : '')
    }
    return () => ref.current.onchange = null
  }, [])


  return (
    <div className="field">
      {label && <label className="label">{label}</label>}                  
      <div className={cssClass}>
        <label className="file-label">
          <input 
            type="file" 
            name={name}          
            className="file-input" 
            {...rest} 
            ref={ref}                          
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              Selecionar...
            </span>
          </span>
          <span className="input file-name">
            {fileName || 'Nenhum arquivo selecionado.'}
          </span>
        </label>
      </div>    
    </div>
  )
})