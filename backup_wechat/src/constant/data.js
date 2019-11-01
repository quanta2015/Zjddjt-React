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



export const STAT = [ ['已终止','black'],
                      ['申请中','red' ],
                      ['已审查','blue'],
                      ['已竣工','#f50'],
                      ['已评价','#87d068'],
                      ['已展示','#108ee9'], ]


export const PROC_NAME = ['受理申请并确定申请人和实施主体',
                          '现场勘测和制定可行性方案',
                          '协议公示(业主协议、资金费用、电梯保养)',
                          '委托施工图审并备案',
                          '政府组织联合审查',
                          '施工单位实施加装作业',
                          '竣工验收和使用登记']


export const STAT_NAME = ['执行中','已完成']              





