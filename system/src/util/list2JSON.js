import * as DT    from './date'
import { formatStat,formatProcName,formatProcStat } from './stat'

export default function list2JSON(list) {
  list.forEach((item,index)=>{
    let ret = []
    
    item.apdt = DT.formatApdt(item.apdt,true);
    [item.stat_name, item.stat_color] = formatStat(item.stat)
  })
}
