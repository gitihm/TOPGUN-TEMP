module.exports = app => {
  const route = require("./../controllers/dataController");

  app.get("/api/getdata", route.getdata);
  app.get("/api/updatedata", route.updateData);
};
