import classNames from 'classnames'
import DatePicker, { setDefaultLocale } from 'react-datepicker'
import { applyMask } from '../../utils/masks'

import ptBR from 'date-fns/locale/pt-BR'

setDefaultLocale(ptBR)

export function Input({ 
  type, 
  name, 
  value, 
  mask,
  placeholder, 
  onChange, 
  iconLeft, 
  ...rest 
}) {
  const styleControl = classNames('control', iconLeft && 'has-icon-left')
  const styleInput = classNames('input', 'is-medium', 'st-input')
  const isDate = value instanceof Date
  const _value = mask ? applyMask( isDate ? value.toLocaleDateString() : value, mask) : value

  function handleChange(e) {
    onChange(name, e.target.value)
  }

  function handleChangeDate(date) {
    onChange(name, date)
  }

  return (
    <div className="field">
      <div className={styleControl}>
        {type === 'date' ? (
          <DatePicker 
            dateFormat="P"
            className={styleInput} 
            name={name}
            selected={value}       
            placeholderText={placeholder} 
            onChange={handleChangeDate}
            autoComplete="none"
            value={_value}
            {...rest}
          />
        ) : (
          <input 
            className={styleInput} 
            type={type}
            name={name}
            value={_value}
            placeholder={placeholder}
            onChange={handleChange}
            {...rest} 
          />
        )}
        {iconLeft &&
          <span className="icon is-left">
            <i className={className(iconLeft, 'fa-xs')} />
          </span>
        }
      </div>
    </div>
  )
}


export function TextArea({ onChange, ...rest }) {

  function handleChange(e) {
    onChange(e.target.name, e.target.value)
  }

  return (
    <div className="field">
      <div className="control">
        <textarea 
          className="textarea is-medium st-input" 
          onChange={handleChange}
          {...rest} 
        />
      </div>
    </div>    
  )
}