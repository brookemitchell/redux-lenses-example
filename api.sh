@ECHO OFF

curl -v -X GET "https://api.at.govt.nz/v2/locations/scheduledworks" -H "Ocp-Apim-Subscription-Key: 3c74bb46a9734db1b6577568d26448ed" --data-ascii "{body}" 

# {"httpMethod":"GET","host":"api.at.govt.nz","scheme":"https","path":"v2/locations/scheduledworks","headers":[{"name":"Host","value":"api.at.govt.nz","inputTypeValue":"text","revealed":false,"options":null,"required":true,"readonly":true,"custom":false},{"name":"Ocp-Apim-Subscription-Key","value":"3c74bb46a9734db1b6577568d26448ed","inputTypeValue":"password","revealed":false,"options":[],"required":true,"readonly":false,"custom":true,"secret":true}],"parameters":[{"name":"callback","value":"","inputType":"text","required":false,"options":[],"custom":false,"description":"<p>JSONP callback - overrides mimetype and returns JSON with padding</p>\n","typeName":"string"}],"body":""}
