setTimeout(() => {
  throw new Error("oopsie woopsie");
}, 1000);

process.on("uncaughtException", (error) => {
  console.log("uncaught exception");
  console.log(error);
});

process.on("unhandledRejection", (error) => {
  console.log("unhandled rejection");
  console.log(error);
});
