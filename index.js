
const createEmployeeRecord = (array) => {
  return {
    firstName : array[0],
    familyName : array[1],
    title : array[2],
    payPerHour : array[3],
    timeInEvents : [],
    timeOutEvents : []
  }
}

const createEmployeeRecords = (recordsArray) => {
  return recordsArray.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function (record, dateStamp){
  const [date, hour] = dateStamp.split(' ')
  // console.log("date:", date)
  // console.log("hour:", hour)

  const inEvent = {
    type: "TimeIn", 
    hour: parseInt(hour, 10),
    date: date
  }

  record.timeInEvents.push(inEvent)
  return record
}

const createTimeOutEvent = function (record, dateStamp){
  const [date, hour] = dateStamp.split(' ')

  const outEvent = {
    type: "TimeOut", 
    hour: parseInt(hour, 10),
    date: date
  }

  record.timeOutEvents.push(outEvent)
  return record
}

const hoursWorkedOnDate = function (record, targetDate){
    const inEvent = record.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = record.timeOutEvents.find(outEvent => outEvent.date === targetDate)

    return (outEvent.hour - inEvent.hour) / 100 

}

const wagesEarnedOnDate = function(record, targetDate){
  return hoursWorkedOnDate(record, targetDate) * record.payPerHour
}


// gotten via a walk-thru, dont fully understand though esp regarding context methods
// like .bind and .call
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function(e) {
    return e.date
  })
  const payable = eligibleDates.reduce(function(memo,d){
    return memo + wagesEarnedOnDate(this, d)
  }.bind(this), 0)
  return payable
}

const findEmployeeByFirstName = function(srcArray, firstName){
  return srcArray.find(rec => rec.firstName === firstName)
}

const calculatePayroll = function (recsArray){
  return recsArray.reduce((total, rec) => {
    return total + allWagesFor.call(rec)
  }, 0)
}