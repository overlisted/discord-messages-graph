const fs = require("fs");

const json = JSON.parse(fs.readFileSync("messages.json"));

const result = [];

const firstTime = new Date(json[json.length - 1].timestamp).getTime();
const lastTime = new Date(json[0].timestamp).getTime();

// prepare the results array
for(let i = firstTime; i < lastTime; i += 60000) result.push(0);

// calculate actual results data
json.forEach(it => {
  const time = firstTime - new Date(it.timestamp).getTime();
  const minute = ((time % 60000) - time) / 60000;
  
  result[minute]++;
});

fs.writeFileSync("graph-data.json", JSON.stringify(result, null, 2));
