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
  const isFile = type && /file/i.test(type)
  const _value = mask ? applyMask(value, mask) : value
  const cssClass = classNames(
    'control',
    iconLeft && 'has-icons-left',
    (isPassword || isFile || iconRight) && 'has-icons-right',
    className
  )
  const cssClassPwd = isPassword ? classNames('far fa-eye' + (show ? '' : '-slash')) : null
  const _type = isFile ? 'text' : isPassword ? (show ? 'text' : 'password') : type

  function handleChange(e) {
    const { name, value } = e.target
    onChange(name, value)
  }

  function onClickPassword(e) {
    setShow(!show)
  }

  function onClickFile(e) {

  }

  return (
    <div className="field">

      {label && <label className="label">{label}</label>}                  

      <div className={cssClass}>

        <input
          className="input"
          type={_type}
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
            <i className={cssClassPwd}></i>
          </span>
        }

        {isFile && 
          <span className="icon is-small is-right click" onClick={onClickFile}>
            <i className="fas fa-folder-open"></i>
          </span>
        }

      </div>

    </div>
  )

})
