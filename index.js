const config = require('./config');
const app = require('./server');


app.server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    });