
function createEmployeeRecords(data) {
    return data.map(function (row) {
      return createEmployeeRecord(row)
    })
  }
  
  function createEmployeeRecord(row) {
    return {
      firstName: row[0],
      familyName: row[1],
      title: row[2],
      payPerHour: row[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    })
    return employeeRecord
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    })
    return employeeRecord
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(function (e) {
      return e.date === date
    })
    const timeOutEvent = employeeRecord.timeOutEvents.find(function (e) {
      return e.date === date
    })
    return (timeOutEvent.hour - timeInEvent.hour) / 100
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    const wagesEarned = hoursWorked * employeeRecord.payPerHour
    return wagesEarned
  }
  
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(function (e) {
      return e.date
    })
    const allWages = datesWorked.reduce(function (totalWages, date) {
      return totalWages + wagesEarnedOnDate(employeeRecord, date)
    }, 0)
    return allWages
  }
  
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce(function (total, employeeRecord) {
      return total + allWagesFor(employeeRecord)
    }, 0)
    return totalPayroll
  }
  