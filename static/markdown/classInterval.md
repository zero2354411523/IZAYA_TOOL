>最近做了一个中央空调的demo，用了很多的定时器，然后我用数据驱动的思想给予了定时器等同于**暂停/继续**和**列表循环**的功能。为了便于理解，以及之后的复用，我封装了一个工具类。
同样,虽然用了TS但改成纯ES6也很好改的。
```
export class interval {
  suspend: boolean // 暂停指示器
  pauseDo: Function // 每次暂停时会执行一次的方法
  goonDo: Function // 每次继续时会执行一次的方法
  constructor() {
    this.suspend = false
    this.pauseDo = null
    this.goonDo = null
  }
  static isExist(data): boolean {
    return data !== null || typeof(data) !== 'undefined'
  }
  // 初始化，设置定时器
  init(method,cycle){
    let self = this
    setInterval(function () {
      if(self.suspend){
        return
      }
      method()
    },cycle)
  }
  // 定时器暂停，可传入参数作为pauseDo的参数
  pause(...params: any) {
    this.suspend = true // 暂停
    if(this.pauseDo != null) {
      this.pauseDo(...params)
    }
  }
  // 定时器暂停，可传入参数作为goonDo的参数
  goon(...params: any) {
    this.suspend = false // 继续
    if(this.goonDo != null) {
      this.goonDo(...params)
    }
  }
}
```
列表循环定时器子类：
```
export class listInterval extends interval{
    count: number  // 时间辅助计数器
    constructor() {
      super()
      this.count = 0
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
    init(methodList,cycleList){
      let self = this
      for(let index in cycleList){
        cycleList[index] = cycleList[index]/500
      }
      setInterval(function () {
        if(self.suspend){
          return
        }
        self.count++
        let bigCycle = self.listAdd(cycleList)
        for(let index in cycleList){
          if(self.count%bigCycle === self.addToIndex(cycleList,index)){
            methodList[index]()
          }
        }
      },500)  // 默认0.5秒扫描一次暂停指示器，扫描间隔越小越精确
    }
}
```
使用例：每秒输出一个*数字二*，每输出3次后，暂停3秒再继续，
```
    let pauseWord = '暂停了'
    let goonWord = '继续了'
    const testTimer = new interval()
    testTimer.init(function () {
      console.log(2)
    },1000)
    testTimer.pauseDo = function(a){
      console.log(a)
    }
    testTimer.goonDo = function(a){
      console.log(a)
    }

    const testListTimer = new listInterval()
    let methodList = []
    methodList.push(function () {
      testTimer.pause(pauseWord)
    })
    methodList.push(function () {
        testTimer.goon(goonWord)
    })
    testListTimer.init(methodList,[3000,3000])
  }
```
有疑问可在下方留言、或[在gitee上提交Issuse，
前往gitee了解更多](https://gitee.com/izeya/2019/blob/master/src/tools/interval.ts)
