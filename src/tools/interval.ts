
export class interval {
  suspend: boolean // 暂停指示器
  pauseDo: Function // 每次暂停时会执行一次的方法
  goonDo: Function // 每次继续时会执行一次的方法
  restartDo: Function  // 重置count
  count: number  // 时间辅助计数器
  constructor() {
    this.suspend = false
    this.pauseDo = null
    this.goonDo = null
    this.restartDo = null;
    this.count = 0
  }
  static isExist(data): boolean {
    return data !== null || typeof(data) !== 'undefined'
  }
  // 初始化，设置定时器
  init(method,cycle,scan){
    let self = this
    setInterval(function () {
      if(self.suspend){
        return
      }
      self.count++
      if(self.count%(cycle/scan) == 0){
        method()
      }
    },scan)
  }
  // 定时器暂停，可传入参数作为pauseDo的参数
  pause() {
    this.suspend = true // 暂停
    if(this.pauseDo != null) {
      this.pauseDo()
    }
  }
  // 定时器暂停，可传入参数作为goonDo的参数
  goon() {
    this.suspend = false // 继续
    if(this.goonDo != null) {
      this.goonDo()
    }
  }
  // 定时器重置，可传入参数作为restartDo的参数
  reset() {
    this.count = 0
    if(this.restartDo != null) {
      this.restartDo()
    }
  }
}

export class listInterval extends interval{
    constructor() {
      super()
    }
    // 列表内元素依次相加，返回和
    listAdd(list) {
      let result = 0
      for(let item of list){
        result += item
      }
      return result
    }
    // 列表内元素依次相加，加到index位置为止，返回和
    addToIndex(list,index){
      let result = 0
      if (index == list.length-1){
        return result  // 余数为0的情况
      }
      for(let index1 in list){
        result += list[index1]
        if (index1 === index){
          return result
        }
      }
    }
    // 下面是数学问题，重在理解，不赘述了
    init(methodList,cycleList,scan){
      let self = this
      for(let index in cycleList){
        cycleList[index] = cycleList[index]/scan
      }
      setInterval(function () {
        if(self.suspend){
          return
        }
        self.count++
        let bigCycle = self.listAdd(cycleList)
        for(let index in cycleList){
          if(self.count%bigCycle === self.addToIndex(cycleList,index)){
            if(methodList.length === 1){
              methodList[0]()
            }else{
              methodList[index]()
            }
          }
        }
      },scan)  // 默认0.5秒扫描一次暂停指示器，扫描间隔越小越精确
    }
}
