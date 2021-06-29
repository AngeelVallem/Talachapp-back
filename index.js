require('dotenv').config();
const server = require("./src/server");
const dbConnect = require("./src/lib/db");

dbConnect()
  .then(() => {
    console.log("DB CONNECTED");
    server.listen(8080, () => {
      console.log("server is listening");
    });
  })
  .catch((err) => console.log(err));
