module.exports = app => {
  const route = require("./../controllers/loraiotController");

  app.post("/api/iot/receiver", route.store);
  app.get("/api/iot-received", route.list);

};
