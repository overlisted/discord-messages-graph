const fs = require("fs");

const json = JSON.parse(fs.readFileSync("messages.json"));

const data = [];

const firstTime = new Date(json[json.length - 1].timestamp).getTime();
const lastTime = new Date(json[0].timestamp).getTime();

// prepare the data array
for(let i = firstTime; i < lastTime; i += 60000) data.push(0);

// calculate actual data
json.forEach(it => {
  const time = firstTime - new Date(it.timestamp).getTime();
  const minute = ((time % 60000) - time) / 60000;
  
  data[minute]++;
});

const result = {
  unit: "messages",
  timeUnit: "minutes",
  data: data
};

fs.writeFileSync("graph-data.json", JSON.stringify(result, null, 2));
