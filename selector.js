const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)
const jsonpath = require('jsonpath')


class DataSelector {
  selectByTopic(data, key) {
    const query_str = `$..[?(@.topics.indexOf('${key}') != -1)]`
    const data_selected = jsonpath.query(data, query_str)
    return data_selected
  }

  selectByCategory(data, key) {
    const query_str = `$..[?(@.categories.indexOf('${key}') != -1)]`
    const data_selected = jsonpath.query(data, query_str)
    return data_selected
  }

  selectByYear(data, year) {
    const query_str = `$..[?(@.start.year == ${year})]`
    const data_selected = jsonpath.query(data, query_str)
    return data_selected
  }

  selectByMonth(data, year, month) {
    const query_str = `$..[?(@.start.year == ${year} && @.start.month == ${month})]`
    const data_selected = jsonpath.query(data, query_str)
    return data_selected
  }

  selectBySubTitle(data, str) {
    const query_str = `$..[?(/${str}/.test(@.title))]`
    const data_selected = jsonpath.query(data, query_str)
    return data_selected
  }

  selectById(data, id) {
    const query_str = `$..[?(@.id == '${id}')]`
    const data_selected = jsonpath.query(data, query_str)
    return data_selected
  }

  selectByLocationTitle(data, title) {
    const query_str = `$..[?(@.location.title == '${title}')]`
    const data_selected = jsonpath.query(data, query_str)
    return data_selected
  }

  selectByRangeDate(data, start, end) {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const range = moment().range(startDate, endDate)
    let data_selected = []
    for (let i in data) {
      const event = data[i]
      const event_startDate = new Date(event.start.year, event.start.month-1, event.start.date)
      const event_endDate = new Date(event.end.year, event.end.month-1, event.end.date)

      if (range.contains(event_startDate) && range.contains(event_endDate)) {
        data_selected.push(event)
      }
    }
    return data_selected
  }
}

module.exports = {
  DataSelector,
  dataSelector : new DataSelector()
}