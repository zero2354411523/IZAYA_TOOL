export class tools {
  /* tools of calculation */
  /* get a random integer not bigger than Max and not smaller than Min */
  static RandomNum(Min: number, Max: number) {
    let Range = Max - Min
    let Rand = Math.random()
    let result = 0
    if (Math.round(Rand * Range) === 0) {
      result = Min + 1
    } else if (Math.round(Rand * Max) === Max) {
      result = Max - 1
    } else {
      result = Min + Math.round(Rand * Range) - 1
    }
    return result
  }

  /* tools of string */
  /* replace all str1 to str2 in content */
  static replaceAll(context: string, oldStr: string, targetStr: string) {
    let reg = new RegExp(oldStr, 'g')
    return context.replace(reg ,targetStr)
  }
  /* delete Chinese from str */
  static filterChinese(str: string) {
    return str.replace(/[^\u4E00-\u9FA5]/g, '')
  }
  /* delete space from str */
  static filterSpace(str: string) {
    return str.replace(/\s+/g, '')
  }
  /* delete enter from str */
  static filterEnter(str: string) {
    return str.replace(/\r/g, '').replace(/\n/g, '')
  }
  /* delete tab from str */
  static filterTab(str: string) {
    return str.replace(/\t/g, '').replace(/\v/g, '')
  }
  /* check if the email format is correct */
  static isEmail(str: string) {
    return str.match(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/) !== null
  }
  /* check if the mobile format is correct */
  static isMobile(str: string) {
    return str.match(/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}/) !== null
  }
  static isIdCard(str: string) {
    return str.match(/[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}/) !==null || str.match(/[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)/) !== null
  }
  static isDateStr(str: string) {
    return str.match(/(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)/) !== null
  }
}
