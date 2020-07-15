import { useState } from 'react'

import Button from './Button'

export default function ({ onChange, onSubmit }) {
  const [value, setValue] = useState('')

  function handleChange(e) {
    setValue(e.target.value)
    if (onChange) onChange(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (onSubmit) onSubmit(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input 
            className="input" 
            type="search" 
            placeholder="Digite sua busca aqui..." 
            value={value}
            onChange={handleChange}
          />
        </p>
        <p className="control">
          <Button theme="info" icon="fas fa-search" type="submit">Buscar</Button>
        </p>
      </div>
    </form>
  )
}
