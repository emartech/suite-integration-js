const https = require('https')

const isProduction = process.env.TARGET === 'production';
const redirectorSecret = isProduction ? process.env.REDIRECTOR_API_SECRET_PRODUCTION : process.env.REDIRECTOR_API_SECRET_STAGING;

async function rollbackWorkflow() {
  try {
    const targetRevision =  callRedirectorService()
    resolve(`Rollback was succesful, new revision is ${targetRevision}`)
  } catch (error) {
    reject(error)
  }
}

function callRedirectorService() {
  const stageRevision = isProduction ? '1463645083' : '1463645490';
  const targetURL = isProduction ? 'sijs.static.emarsys.net' : 'sijs-staging.static.emarsys.com';
  const dataJson = JSON.stringify({
    name: 'sijs',
    revision: 'latest',
    target: `${targetURL}/sijs/${stageRevision}`
  })

  const redirectorRequestOption = {
    hostname: isProduction ? 'redirector.gservice.emarsys.net' : 'redirector-staging.eservice.emarsys.com',
    path: '/api/route',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': dataJson.length,
      'x-auth': redirectorSecret
    }
  }

  return new Promise((resolve, reject) => {
    const request = https.request(redirectorRequestOption, (res) => {
      if (res.statusCode >= 200 && res.statusCode <= 299) {
        resolve()
      } else {
        reject(new Error(`Redirector Request failed. ${res.statusMessage}`))
      }
    })
    request.write(dataJson)
    request.end()
  })
}

rollbackWorkflow()
  .then((message) => {
    console.log('\x1b[32m%s\x1b[0m', message)
    process.exit()
  })
  .catch((error) => {
    console.log('\x1b[31m', error)
    process.exit(1)
  })
