
export let strToNameList = (data,list) => {

  let d = data.split('|')
  let ret  = []

  d.map(d_item=>{

    list.map(l_item=>{
      if (parseInt(d_item) === parseInt(l_item.val) ) {
        ret.push(l_item.txt)
      }
    })
  })

  return ret;
}


export let strToName = (data,list) => {
  let ret 
  list.map(item=>{
    if (parseInt(data) === parseInt(item.val) ) {
      ret = item.txt
    }
  })
  return ret;
}


export let valid = (data) => {
  return ((typeof(data) != 'undefined')&&(data !== ''))?true:false;
}

