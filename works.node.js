const https = require('https')
const fs = require('fs')

const file = 'localWork.json'
const writable = fs.createWriteStream(file);

const aklRoadWorks = {
  hostname: "api.at.govt.nz" ,
  path: "/v2/locations/scheduledworks",
  headers: {
    "Ocp-Apim-Subscription-Key": "3c74bb46a9734db1b6577568d26448ed"
  }
}

https.get(aklRoadWorks, res => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type.\n` +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';

  res.on('data', (chunk) => rawData += chunk);

  res.on('end', () => {
    try {
      let {response} = JSON.parse(rawData);
      const formRes = response.reduce((acc, e) => Object.assign({}, acc, {[e.id]: e}), {})

      writable.write(JSON.stringify({works: formRes}), err => {
        if (err) throw new Error(err)
        console.log(`write to file ${file} complete`);
      })
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
})
