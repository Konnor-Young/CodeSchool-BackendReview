const config = require('./config');
const app = require('./server');
const mongodb = require('./mongo');
config.dotenv.config();

mongodb.onConnect(()=>{
    app.server.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
        });
});
mongodb.connect(process.env.USERNAME, process.env.PASSWORD);
