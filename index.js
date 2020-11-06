const fs = require("fs");

const enumTimeUnit = {
  "minutes": 60000,
  "hours": 3600000
}

const timeUnit = process.argv[2];
if(!enumTimeUnit[timeUnit]) {
  console.error("Invalid time unit");
  process.exit();
}

const json = JSON.parse(fs.readFileSync("messages.json"));

const data = [];

const firstTime = new Date(json[json.length - 1].timestamp).getTime();
const lastTime = new Date(json[0].timestamp).getTime();

// prepare the data array
for(let i = firstTime; i < lastTime; i += enumTimeUnit[timeUnit]) data.push(0);

// calculate actual data
json.forEach(it => {
  const time = firstTime - new Date(it.timestamp).getTime();
  const minute = ((time % enumTimeUnit[timeUnit]) - time) / enumTimeUnit[timeUnit];
  
  data[minute]++;
});

const result = {
  unit: "messages",
  timeUnit: timeUnit,
  data: data
};

fs.writeFileSync("graph-data.json", JSON.stringify(result, null, 2));
