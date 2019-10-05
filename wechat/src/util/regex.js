import * as MSG from 'constant/msg'
import * as date  from 'util/date'

const VALID_KEY = 'VALID_TOKEN'

const REG_EMAIL = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const REG_PHONE = /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/
const REG_AGE   = /^[0-9]{1,2}$/
const REG_DATE  = /^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/


//验证年龄格式（年龄只能0~99，两位数）
export let va_age = (age) => {
  return (REG_AGE.test(age))?true:false;
}


//验证是否为空
export let va_null = (data)=>{
  return (data == null || data == "")?false:true;
}


//验证手机格式  
export let va_phone = (data)=>{
  if (data !== "") {
    if (REG_PHONE.test(data)) {
      return true;
    }
  }
  return false;
}


//验证Email格式
export let va_email = (data)=>{
  if (data == null || data == "") {
      return false;
  } else {
    if (REG_EMAIL.test(data)) {
      return true;
    } else {
      return false;
    }
  }
}


//验证日期 YYYY/MM/DD
export let va_date = (data)=>{
  if (data == null || data == "") {
      return false;
  } else {
    if (REG_DATE.test(data)) {
      return true;
    } else {
      return false;
    }
  }
}


export let va_field = (type,act,level,index,e)=>{
  let ret  
  let self = e.currentTarget
  let val  = e.currentTarget.value
  let id   = e.currentTarget.id
  act.setVal(id,val,level,index)

  switch(type) {
    case MSG.TYPE_PHONE: ret = va_phone(val); break;
    case MSG.TYPE_EMAIL: ret = va_email(val); break;
    case MSG.TYPE_NULL:  ret = va_null(val);  break;
    case MSG.TYPE_DATE:  ret = va_date(val);  break;
  }

  if (ret) {
    self.parentNode.classList.remove("has-error")
    va_rm(id)
  }else{
    self.parentNode.classList.add("has-error")
    va_add(id)
  }
}

export let va_field_dsel = (id,act,level,index,mo,val)=>{
  let self = document.getElementById(id)
  let ret = val.split('/').join('')
  act.setVal(id,ret,level,index)
}

export let va_field_ssel = (id,act,level,index,val)=>{
  let self = document.getElementById(id)
  let nv = parseInt(val.split("'").join(''))
  act.setVal(id,nv,level,index)
}

export let va_field_msel = (id,act,level,index,val)=>{
  let self = document.getElementById(id)
  let ret=val.join("|")
  act.setVal(id,ret,level,index)
  if (val.length>0) {
    self.parentNode.classList.remove("has-error")
    va_rm(id)
  }else{
    self.parentNode.classList.add("has-error")
    va_add(id)
  }
}

export let va_field_rsel = (id,act,level,index,val)=>{
  let self = document.getElementById(id)

  act.setVal('date_from_0',date.formatDate(val[0]).split('/').join(''),level,index)
  act.setVal('date_to_0'  ,date.formatDate(val[1]).split('/').join(''),level,index)
}


export let va_start = ()=>{
  window.localStorage.setItem(VALID_KEY, JSON.stringify({}))
}


export let va_check = ()=>{
  let list = JSON.parse(window.localStorage.getItem(VALID_KEY))
  let ret = true

  for(var prop in list) {
    if (!list[prop]) {
      ret= false
    }
  }
  return ret
}

export let va_rm = (id)=>{
  let ret = JSON.parse(window.localStorage.getItem(VALID_KEY))
  ret[id] = true
  window.localStorage.setItem(VALID_KEY,JSON.stringify(ret))
} 

export let va_add = (id)=>{
  let ret = JSON.parse(window.localStorage.getItem(VALID_KEY))
  ret[id] = false
  window.localStorage.setItem(VALID_KEY,JSON.stringify(ret))
}

