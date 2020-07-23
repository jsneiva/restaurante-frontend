import React, { useState } from 'react'

import DatePicker, { setDefaultLocale } from 'react-datepicker'
import masks from '../../utils/masks'

export default function({ 
  label,
  name, 
  value,
  onChange, 
  className,
  ...rest 
}) {
  const [open, setOpen] = useState(false)
  const cssClass = 'input' + (className ? ' ' + className : '')

  function handleClick(e) {
    setOpen(!open)
  }

  function hideCalendar() {
    setOpen(false)
  }

  function handleChange(date) {
    onChange(name, date)
  }

  function handleChangeRaw(e) {
    if (e.target.value)
      e.target.value = masks.date(e.target.value)
  }

  return (
    <div className="field">

      {label && <label className="label">{label}</label>}    

      <div className="control has-icons-right">
      
        <DatePicker 
          className={cssClass}
          dateFormat="P"
          open={open}
          selected={value}
          { ...rest } 
          onChange={handleChange}
          onSelect={hideCalendar}
          onFocus={hideCalendar}
          onBlur={hideCalendar}
          onClickOutside={hideCalendar}
          onChangeRaw={handleChangeRaw}
          shouldCloseOnSelect={false}   // precisa disto aqui pra evitar selecao de dois dias no calendario
        />

        <span className="icon is-right click" onClick={handleClick}>
          <i className="far fa-calendar-alt"></i>
        </span>
      </div>

    </div>
  )
}
