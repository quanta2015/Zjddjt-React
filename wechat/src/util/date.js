import moment  from 'moment'
import cheerio from 'cheerio'


let prefixInteger = (num, length) => {
	let len = num.toString().length 
	num = (len<2)? ('0'+num):num
   return num
  }


export let formatDate = (date) => {
  return moment(date).format("YYYY/MM/DD")
}

export let newDateTime = (date) => {
  return moment(new Date()).format("YYYYMMDDhhmmss")
}


export let newDate = () => {
  return moment(new Date()).format("YYYY/MM/DD")
}

// '2019/06/01 16:00:09'   =>  20190601
export let convertD2I = (date) => {
 return	parseInt(formatDate(date).split('/').join(''))
}

// 20190601  =>   MOMENT('2019/06/01')
export let convertI2D = (date) => {
  let _date = date + ''
  let year  = _date.substring(0,4)
  let month = prefixInteger(_date.substring(4,6), 2)
  let day   = prefixInteger(_date.substring(6,8), 2)
  return	moment(`${year}/${month}/${day}`,'YYYY/MM/DD')
}


// 20190601  =>   '2019/06/01'
export let convertI2S = (date) => {
  let _date = date + ''
  let year  = _date.substring(0,4)
  let month = prefixInteger(_date.substring(4,6), 2)
  let day   = prefixInteger(_date.substring(6,8), 2)
  return  `${year}-${month}-${day}`
}


export let html2RagDate = (html) => {
  const $ = cheerio.load(html)
  let ret = []
  ret.push($('input')[0].attribs.value)
  ret.push($('input')[1].attribs.value)
  return ret
}

/**
 * apdt to YYYY/MM/DD or YYYY/MM/DD HH/MM/SS
 * hms: 是否需要 HH/MM/SS
 */
export let formatApdt = (d, hms=true) => {
  let year  = d.toString().substr(2,2)
  let month = d.toString().substr(4,2)
  let day   = d.toString().substr(6,2)
  let hour  = d.toString().substr(8,2)
  let min   = d.toString().substr(10,2)
  let sec   = d.toString().substr(12,2)

  if (hms) {
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
  } else {
    return `${year}-${month}-${day}`
  }
}