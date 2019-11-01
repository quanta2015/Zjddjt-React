import * as DT    from './date'
import { formatStat,formatProcName,formatProcStat } from './stat'

export default function list2JSON(list,type) {
  list.forEach((item,index)=>{
    let ret = []
    
    if (type==='plan') {
      if ((item.name_list!==null)||(item.url_list!==null)) {
        let nameList = item.name_list.split(',')
        let urlList  = item.url_list.split(',')
        nameList.forEach((obj,i)=>{
          ret.push({ name: obj, url: urlList[i] })
        })
      }
      item.files = ret
    }

    if (type==='sche') {
      if ((item.dt_list!==null)||(item.ct_list!==null)||(item.stat_list!==null)) {
        let dtList = item.dt_list.split(',')
        let ctList = item.ct_list.split(',')
        let statList = item.stat_list.split(',')
        dtList.forEach((obj,i)=>{
          ctList[i]   = formatProcName(ctList[i])
          statList[i] = formatProcStat(statList[i])
          ret.push({ dt:DT.formatApdt(obj,true), ct:ctList[i], stat:statList[i]  })
        })
      }
      item.proc = ret
    }


    item.apdt = DT.formatApdt(item.apdt,true);
    [item.stat_name, item.stat_color] = formatStat(item.stat)
  })
}
