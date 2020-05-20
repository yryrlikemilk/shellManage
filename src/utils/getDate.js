export const pickerOptions = {
  shortcuts: [{
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * (start.getHours()) - (start.getMinutes()) * 60 * 1000 - start.getSeconds() * 1000)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近7天',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近30天',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }]
}
export const disPickerOptions = {
  disabledDate: function(value) {
    return value < new Date()
  }
}
