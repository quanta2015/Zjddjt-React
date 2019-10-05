function enableGetVariableName(fn) {
  return eval('(' + fn.toString().replace(/return enableGetVariableName\([^\)]+\)\.apply\(this, arguments\)/g, '').replace(/\b(?:getParamName)\s*\(([a-zA-Z_$][\w_$]*)\)/g, function(u, v) {
    return "'" + v + "'"
  }) + ')')
}


export default function log(s) {
  console.log(s)
}
