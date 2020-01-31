require('dotenv').config({ silent: true });
const { PORT = 3000 } = process.env;
const server = require('./build/server');

server.listen(PORT, () => {
  console.log(`ENDPOINT: http://localhost:${PORT}`); // eslint-disable-line
  console.log(`ENVIROMENT: ${process.env.UP_STAGE}`); // eslint-disable-line
});
