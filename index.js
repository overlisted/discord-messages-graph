const fs = require("fs");

const json = JSON.parse(fs.readFileSync("history.json"));
const subresult = [];

const startTime = new Date(json[0].timestamp).getTime();
json.forEach(it => {
  const time = startTime - new Date(it.timestamp).getTime();
  const minute = (time - (time % 60000)) / 60000;
  
  if(!subresult[minute]) subresult[minute] = 0;
  subresult[minute]++;
});

const result = [];
subresult.forEach((it, i)=> { if(it) result.push({minute: i, messages: it}) })

fs.writeFileSync("results.json", JSON.stringify(result, null, 2));
