
export default function MessageBox({
  message,
  title,
  success,
  error,
  warning,
  small,
  onClick,
  className
}) {
  const classMsg = 'message is-' + 
                (success ? 'success' :
                 error ? 'danger' :
                 warning ? 'warning' : 'info') + 
                 (small ? ' is-small' : '') +
                 (onClick ? ' box' : '') +
                ' px-0 py-0' +
                (className ? ' ' + className : '')
  return (
    <div className={classMsg} onClick={onClick}>
      {onClick &&
        <div className="message-header">
          <p>{title || (error ? 'Erro' : 'Atenção')}</p>
          <button className="delete" aria-label="delete" />
        </div>
      }
      <div className="message-body">
        {message}
      </div>
    </div>    
  )
}