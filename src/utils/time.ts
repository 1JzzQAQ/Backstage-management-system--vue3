export const getTime = () => {
    let message:string = ''
    //通过内置构造函数Date
    const hours = new Date().getHours()
    if (hours <= 9) {
      message = '早上'
    } else if (hours <= 14) {
      message = '上午'
    }else if (hours<=18){
      message = '下午'
    }else{
      message = '晚上'
    }
    return message
  }