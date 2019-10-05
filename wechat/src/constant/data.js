export const DATE_FORMAT  = 'YYYY/MM/DD'
export const MONTH_FORMAT = 'YYYY/MM'




const SUBMENU_INFO =     [{ title:'单位简介', icon:'profile', path:'/intr' },
                          { title:'装梯流程', icon:'profile', path:'/step' },
                          { title:'实例参考', icon:'profile', path:'/exam' },
                          { title:'历史消息', icon:'profile', path:'/hist' }]
   
const SUBMENU_SERV =     [{ title:'申请加梯', icon:'profile', path:'/appy' },
                          { title:'申请方案', icon:'profile', path:'/plan' },
                          { title:'品牌指定', icon:'profile', path:'/brad' },
                          { title:'商务合作', icon:'profile', path:'/coop' }]
   
const SUBMENU_USER =     [{ title:'工程进度', icon:'profile', path:'/sche' },
                          { title:'用户心声', icon:'profile', path:'/heat' },
                          { title:'联系咨询', icon:'profile', path:'/cont' },
                          { title:'用户服务', icon:'profile', path:'/serv' }]   

export const MENU_MAIN = [{ title:'加梯概况', icon:'search', submenu: SUBMENU_INFO },
                          { title:'加梯服务', icon:'laptop', submenu: SUBMENU_SERV },
                          { title:'用户中心', icon:'laptop', submenu: SUBMENU_USER }] 








