var mode = process.env.REACT_APP_MY_VAR
var API_SERVER = ''

if (mode === 'development') {
  API_SERVER = 'http://127.0.0.1:1080'
}

if (mode === 'production') {
  API_SERVER = 'http://133.167.73.231:1080'
}

export { API_SERVER }