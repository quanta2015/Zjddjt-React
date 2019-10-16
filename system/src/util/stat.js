import {STAT, PROC_NAME, STAT_NAME}  from 'constant/data'


export function formatStat(state) {
  return STAT[state+1]
}


export function formatProcName(index) {
  return PROC_NAME[index-1]
}

export function formatProcStat(index) {
  return STAT_NAME[index]
}



export function getStatFilter() {
  let ret = []
  STAT.forEach((item,index)=>{
    ret.push({
      text:  item[0],
      value: item[0],
    })
  })
  return ret
}