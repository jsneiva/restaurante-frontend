export default function({ 
  type, 
  theme, 
  outlined, 
  rounded,
  inverted,
  icon, 
  small,
  className, 
  children,
  loading, 
  ...rest 
}) {
  const style = 'button' + 
                (theme ?  ' is-' + theme : '') +
                (outlined ? ' is-outlined' : '') +
                (rounded ? ' is-rounded' : '') +                
                (inverted ? ' is-inverted' : '') +                                
                (small ? ' is-small' : '') +
                (loading ? ' is-loading' : '') +
                (className ? ' ' + className : '')
  return (
    <button 
      type={type || 'button'}
      className={style}
      {...rest}
    >
      {icon && 
        <span className="icon">
          <i className={icon}></i>
        </span>
      }
      {children && <span>{children}</span>}
    </button>
  )
}