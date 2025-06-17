const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("admin connecting ....");
  admin.connect();
  console.log("admin connection success ...");

  await admin.createTopics({
    topics: [{ topic: "rider_updates", numPartitions: 2 }],
  });

  console.log("topic created  success for rider updates");

  console.log("disconnecting admin ...");
  admin.disconnect();
}

init();
