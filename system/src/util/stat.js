const STAT=[ ['已终止','black'],
             ['申请中','red' ],
             ['已审查','blue'],
             ['已竣工','orange'], ];


export function formatStat(state) {
  return STAT[state+1]
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
