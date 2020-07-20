export default function({
  label,
  name,
  value,
  options,
  small,
  onChange,
  className,
  ...rest
}) {
  const cssClass = 'select is-fullwidth' +
                   (small ? ' is-small' : '') +
                   (className ? ' ' + className : '')

  function handleChange(e) {
    onChange(name, e.target.value || null)
  }

  return (
    <div className="field">
      {label && <label className="label">{label}</label>}                  
      <div className={cssClass}>
        <select
          name={name}
          value={value || ''}
          onChange={handleChange}
        >
          <option key="." value=""></option>
          {options.map(item => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}