export default function({
  label,
  name,
  value,
  small,
  onChange,
  className,
  ...rest
}) {
  const cssClass = 'textarea' +
                   (small ? ' is-small' : '') +
                   (className ? ' ' + className : '')

  function handleChange(e) {
    onChange(name, e.target.value)
  }

  return (
    <div className="field">
      {label && <label className="label">{label}</label>}                  
      <div className="control">
        <textarea 
          className={cssClass} 
          name={name}
          value={value}
          onChange={handleChange}
          {...rest}
        />
      </div>
    </div>
  )
}