const rp = require('request-promise-native')
DATA_API = 'https://thaiprogrammer-tech-events-calendar.spacet.me/calendar.json'
class ServiceCaller {
  async getData() {
    const url = DATA_API
    const opt = {
      method: 'GET',
      uri: url,
      json: true
    }
    const response = await rp(opt)

    return response
  }
}

module.exports = {
  ServiceCaller,
  serviceCaller : new ServiceCaller()
}