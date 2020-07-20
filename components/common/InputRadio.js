
export default function({ items, name, value, onChange }) {

  function handleChange(e) {
    onChange(name, e.target.value)
  }

  return (
    <div className="control">
      {items.map(item => (
        <label key={item.label} className="radio">
          <input 
            type="radio" 
            name={name} 
            value={item.value}
            checked={item.value === value}
            onChange={handleChange}
          /> {item.label}</label>
      ))}
    </div>
  )
}