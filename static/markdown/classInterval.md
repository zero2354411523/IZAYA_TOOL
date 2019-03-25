>�������һ������յ���demo�����˺ܶ�Ķ�ʱ����Ȼ����������������˼������˶�ʱ����ͬ��**��ͣ/����**��**�б�ѭ��**�Ĺ��ܡ�Ϊ�˱�����⣬�Լ�֮��ĸ��ã��ҷ�װ��һ�������ࡣ
ͬ��,��Ȼ����TS���ĳɴ�ES6Ҳ�ܺøĵġ�
```
export class interval {
  suspend: boolean // ��ָͣʾ��
  pauseDo: Function // ÿ����ͣʱ��ִ��һ�εķ���
  goonDo: Function // ÿ�μ���ʱ��ִ��һ�εķ���
  constructor() {
    this.suspend = false
    this.pauseDo = null
    this.goonDo = null
  }
  static isExist(data): boolean {
    return data !== null || typeof(data) !== 'undefined'
  }
  // ��ʼ�������ö�ʱ��
  init(method,cycle){
    let self = this
    setInterval(function () {
      if(self.suspend){
        return
      }
      method()
    },cycle)
  }
  // ��ʱ����ͣ���ɴ��������ΪpauseDo�Ĳ���
  pause(...params: any) {
    this.suspend = true // ��ͣ
    if(this.pauseDo != null) {
      this.pauseDo(...params)
    }
  }
  // ��ʱ����ͣ���ɴ��������ΪgoonDo�Ĳ���
  goon(...params: any) {
    this.suspend = false // ����
    if(this.goonDo != null) {
      this.goonDo(...params)
    }
  }
}
```
�б�ѭ����ʱ�����ࣺ
```
export class listInterval extends interval{
    count: number  // ʱ�丨��������
    constructor() {
      super()
      this.count = 0
    }
    // �б���Ԫ��������ӣ����غ�
    listAdd(list) {
      let result = 0
      for(let item of list){
        result += item
      }
      return result
    }
    // �б���Ԫ��������ӣ��ӵ�indexλ��Ϊֹ�����غ�
    addToIndex(list,index){
      let result = 0
      if (index == list.length-1){
        return result  // ����Ϊ0�����
      }
      for(let index1 in list){
        result += list[index1]
        if (index1 === index){
          return result
        }
      }
    }
    // ��������ѧ���⣬������⣬��׸����
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
      },500)  // Ĭ��0.5��ɨ��һ����ָͣʾ����ɨ����ԽСԽ��ȷ
    }
}
```
ʹ������ÿ�����һ��*���ֶ�*��ÿ���3�κ���ͣ3���ټ�����
```
    let pauseWord = '��ͣ��'
    let goonWord = '������'
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
�����ʿ����·����ԡ���[��gitee���ύIssuse��
ǰ��gitee�˽����](https://gitee.com/izeya/2019/blob/master/src/tools/interval.ts)
