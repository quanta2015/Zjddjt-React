import * as DT    from './date'
import { formatStat } from './stat'

export default function list2JSON(list) {
  list.forEach((item,index)=>{
    let ret = []

    if ((item.name_list!==null)||(item.url_list!==null)) {
      let nameList = item.name_list.split(',')
      let urlList  = item.url_list.split(',')
      nameList.forEach((obj,i)=>{
        ret.push({ name: obj, url: urlList[i] })
      })
    }
    
    item.files = ret
    item.apdt = DT.formatApdt(item.apdt,true);
    [item.stat_name, item.stat_color] = formatStat(item.stat)
  })
}
