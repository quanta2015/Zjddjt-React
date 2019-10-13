export default function formatStat(state) {
  let ret

  switch(parseInt(state)) {
    case -1: ret = ['已终止','black']; break;
    case 0:  ret = ['申请中','blue' ]; break;
    case 1:  ret = ['已审查','red'  ]; break;
  }

  return ret
}
