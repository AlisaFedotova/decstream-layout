//type = info, alert, error, etc.
function showAlert(type, text) {
  let alert = buildAlert(type, text);
  let body = document.body;
  body.appendChild(alert);
  console.log(alert);
}

function buildAlert(type, text){
  let alertContainer = document.createElement('div')
  alertContainer.className = 'alert alert-' + type + ' fade show';
  alertContainer.role = 'alert'
  alertContainer.id = type + 'Alert';
  let alertMess = document.createElement('span');
  alertMess.innerText = text;
  alertContainer.appendChild(alertMess);
  let alertClose = document.createElement('button');
  alertClose.className = 'close';
  alertClose.type = 'button';
  alertClose.innerText = '×';
  alertContainer.appendChild(alertClose);
  return alertContainer;
}
