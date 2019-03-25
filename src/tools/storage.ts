/*
* @name String
*       the key of storage
*
* @data Object
*       the data what you want to save
*
* @writeTime Number
*       a timestamp of when you write
*
* @period Number
*       a timestamp how long the data exist
*
* */
class storageData {
  name: string
  data: object
  writeTime: number
  period: number
  constructor(name, data, timestamp) {
    this.name = name
    this.data = data
    this.writeTime = Number(new Date())
    this.period = timestamp
  }

  static isNotExist(data): boolean {
    return data === null || typeof(data) === 'undefined'
  }
}

export class localData extends storageData{
  constructor(name, map, timestamp) {
    super(name, map, timestamp)
  }
  save(): void {
    let saveData = this.data
    saveData['writeTime'] = this.writeTime
    saveData['period'] = this.period
    let dataStr = JSON.stringify(saveData)
    localStorage.setItem(this.name, dataStr)
  }
  static get(name): object {
    let dataJSON = localStorage.getItem(name)
    /* End directly when the target does not exist */
    if(this.isNotExist(dataJSON)) {
      return null
    }
    let data = JSON.parse(dataJSON)
    /* When the existence period of the data is undefined, it is considered as permanent */
    if(this.isNotExist(data.period)) {
      return data
    }
    /* Release data if the data declaration period ends */
    if(this.isOutPeriod(data)) {
      localStorage.removeItem('data')
      data = null
    }
    return data
  }
  static isOutPeriod(data): boolean {
    let readTime = Number (new Date())
    if ((readTime - data.writeTime) > data.period) {
      return true
    }
    return false
  }
}

export class sessionData extends storageData{
  constructor(name, data, timestamp) {
    super(name, data, timestamp)
  }
  save(): void {
    let saveData = this.data
    saveData['period'] = this.period
    saveData['writeTime'] = this.writeTime
    let dataStr = JSON.stringify(saveData)
    sessionStorage.setItem(this.name, dataStr)
  }
  static get(name): object {
    let dataJSON = sessionStorage.getItem(name)
    if(this.isNotExist(dataJSON)) {
      return null
    }
    let data = JSON.parse(dataJSON)
    if(this.isNotExist(data.period)) {
      return data
    }
    if(this.isOutPeriod(data)) {
      return null
    }
    return data
  }
  static isOutPeriod(data): boolean {
    let readTime = Number (new Date())
    if ((readTime - data.writeTime) > data.period) {
      sessionStorage.removeItem('data')
      return true
    }
    return false
  }
}
