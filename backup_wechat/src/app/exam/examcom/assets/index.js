import TYPE_HDPT_13 from './type_hdpt13.jpg'
import TYPE_SPLT_12 from './type_splt12.jpg'
import TYPE_SPLT_14 from './type_splt14.jpg'

/**
 * 常见户型
 */
export const HOUSE_LAYOUT = [
  {
    name: '横单跑梯（一梯三户）',
    detail: '加装电梯后对建筑间距影响较小，另需注意电梯厅外窗与北面房间外窗的距离满足防火规范。加装电梯条件较好。',
    intr: '电梯出口位于楼层标高（易于实现无障碍设计）',
    img: TYPE_HDPT_13
  },
  {
    name: '双跑楼梯（一梯两户）',
    detail: '到达半平台后，还要走一个楼梯梯段才能进户，不能完成无障碍通行。为确保底层疏散宽度电梯井需与主体建筑脱开一定距离，对建筑间距影响较大。另需注意电梯厅外窗与北面房间外窗的距离满足防火规范。一定程度上可考虑加装电梯。',
    intr: '电梯出口位于楼梯半平台（不能实现无障碍设计）',
    img: TYPE_SPLT_12
  },
  {
    name: '双跑楼梯（一梯四户）',
    detail: '到达半平台后，还要走一个楼梯梯段才能进户，不能完成无障碍通行，不能完成无障碍通知。为确保底层疏散宽度，电梯井需与主体建筑隔开一定距离，对建筑间距影响较大。另需注意电梯厅外窗与北面房间外窗的距离满足防火规范。一定程度上克考虑加装电梯',
    intr: '电梯出口位于楼梯半平台（不能实现无障碍设计）',
    img: TYPE_SPLT_14
  }
]
