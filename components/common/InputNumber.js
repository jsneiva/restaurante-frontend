import NumberFormat from 'react-number-format'
import Input from './Input'

export default function({
  label,
  name,
  value,
  small,
  className,
  onChange,
  decimals,
  ...rest
}) {
  const cssClass = (small ? ' is-small' : '') +
                   (className ? ' ' + className : '')

  function handleChange(values) {
    onChange(name, values.floatValue || 0)
  }

  return (
    <div className="field">
      {label && <label className="label">{label}</label>}             
      <div className={cssClass}>
        <NumberFormat
          name={name}
          value={value === 0 ? '' : value} 
          onValueChange={handleChange}
          thousandSeparator="."
          decimalSeparator=","          
          allowEmptyFormatting
          decimalScale={decimals || 2}
          {...rest}
          className="input has-text-right"
        />
      </div>      
    </div>
  )
}