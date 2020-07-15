import React, { useState, forwardRef } from 'react'
import classNames from 'classnames'
import { applyMask } from '../../utils/masks'

export default forwardRef(({
  type, 
  label, 
  value, 
  mask,
  className,
  onChange,
  iconLeft,
  iconRight,
  onClickIconLeft,
  onClickIconRight,
  ...rest 
}, ref) => {

  const [show, setShow] = useState(false)
  const isPassword = type && /password/i.test(type)
  const _value = mask ? applyMask(value, mask) : value
  const clsInput = classNames(
    'control',
    iconLeft && 'has-icons-left',
    (isPassword || iconRight) && 'has-icons-right',
    className
  )
  const clsPassword = isPassword ? classNames('far fa-eye' + (show ? '' : '-slash')) : null

  function handleChange(e) {
    const { name, value } = e.target
    onChange(name, value)
  }

  function onClickPassword(e) {
    setShow(!show)
  }

  return (
    <div className="field">

      {label && <label className="label">{label}</label>}                  

      <div className={clsInput}>

        <input
          className="input"
          type={isPassword ? (show ? 'text' : 'password') : type}
          value={_value}
          onChange={handleChange}
          ref={ref}
          {...rest}
        />

        {iconLeft &&
          <span className="icon is-small is-left">
            <i className={iconLeft}></i>
          </span>
        }

        {iconRight && 
          <span className="icon is-small is-right">
            <i className={iconRight}></i>
          </span>
        }
        
        {isPassword && 
          <span className="icon is-small is-right click" onClick={onClickPassword}>
            <i className={clsPassword}></i>
          </span>
        }

      </div>

    </div>
  )

})
