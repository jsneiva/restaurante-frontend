
export default function({ label, checked, onChange, small, ...rest }) {
  const cssClass = 'ml-1' + (small ? ' is-size-7' : '')

  function handleChange(e) {
    const { name, checked } = e.target
    onChange(name, checked)
  }

  return (
    <label className="checkbox" style={{ display: 'flex', alignItems: 'center' }}>
      <input 
        type="checkbox" 
        checked={checked}
        onChange={handleChange}
        {...rest} 
      />
      <span className={cssClass}>{label}</span>
    </label>    
  )

}
