
/* 设置localstorage */
function setLocalStorageMap(mapName, map, during) {
  if(arguments.length === 3){
    map.during = during
  }
  map.writeTime = Number (new Date())
  let mapStr = JSON.stringify(map)
  localStorage.setItem(mapName, mapStr)
  return 'setLocalStorageMapSuccess'
}
function setSessionStorageMap(mapName, map) {
  map.writeTime = Number (new Date())
  let mapStr = JSON.stringify(map)
  sessionStorage.setItem(mapName, mapStr)
  return 'setSessionStorageMapSuccess'
}
/* 取localStorage附带取数据时间 */
function getLocalStorageMap(mapName) {
  let mapStr = localStorage.getItem(mapName)
  let map = JSON.parse(mapStr)
  if (!map.during) {
    return map
  }
  map.readTime = Number (new Date())
  if ((map.readTime - map.writeTime) > map.during) {
    return {}
  }
  return map
}
function getSessionStorageMap(mapName) {
  let mapStr = sessionStorage.getItem(mapName)
  let map = JSON.parse(mapStr)
  return map
}
/* 取随机数整数 */
function RandomNum(Min, Max) {
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
function replaceAll(str,str1,str2) {
  let list = str.split(str1)
  return list.join(str2)
}
/* 验证汉字 */
function filterChinses(str) {
  return str.replace(/[^\u4E00-\u9FA5]/g, '')
}
export default {
  setLocalStorageMap: function (mapName, map, during) {
    return setLocalStorageMap(mapName, map, during)
  },
  getLocalStorageMap: function (mapName) {
    return getLocalStorageMap(mapName)
  },
  setSessionStorageMap: function (mapName, map) {
    return setSessionStorageMap(mapName, map)
  },
  getSessionStorageMap: function (mapName) {
    return getSessionStorageMap(mapName)
  },
  RandomNum: function (min,max){
    return RandomNum(min,max)
  },
  filterChinses: function (str) {
    return filterChinses(str)
  },
  replaceAll: function (str,str1,str2) {
    return replaceAll(str,str1,str2)
  }
}
