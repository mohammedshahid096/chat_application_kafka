const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("connecting producer");

  await producer.connect();

  console.log("producer connected successfully");

  rl.setPrompt(">");
  rl.prompt();

  rl.on("line", async function (line) {
    const [riderName, riderLocation] = line.split(" ");
    await producer.send({
      topic: "rider_updates",
      messages: [
        {
          partition: riderLocation === "north" ? 0 : 1,
          key: "location-update",
          value: JSON.stringify({
            name: riderName,
            location: riderLocation,
          }),
        },
      ],
    });
  });

  rl.on("close", async function () {
    await producer.disconnect();
  });
}

init();
