export function changeformdata(data) {
  var formdata = new FormData()
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key]
      var isType2 = (/^\[object\s(.*)\]$/.exec(Object.prototype.toString.call(element)))[1]
      if (isType2 === 'Array' && element.length > 0) {
        element.forEach(elemen => {
          // 针对element 上传组件的数据
          if (elemen.raw) {
            formdata.append(`${key}`, elemen.raw)
          }
        })
      } else {
        if (element) {
          formdata.append(`${key}`, element)
        }
      }
    }
  }
  return formdata
}
export function allowsformdata(data) {
  var formdata = new FormData()
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key]
      var isType2 = (/^\[object\s(.*)\]$/.exec(Object.prototype.toString.call(element)))[1]
      if (isType2 === 'Array') {
        // if (element.length <= 0) {
        //   formdata.append(`${key}[0]`, '')
        // }
        element.forEach((elemen, index) => {
          for (const key1 in elemen) {
            if (elemen.hasOwnProperty(key1)) {
              const elemen1 = elemen[key1]
              formdata.append(`${key}[${index}].${key1}`, elemen1)
            }
          }
        })
      } else {
        formdata.append(`${key}`, element)
      }
    }
  }
  return formdata
}
