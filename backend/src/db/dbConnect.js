const MongoClient = require('mongodb').MongoClient;

let dbConnection;

const dbConnect = async function() {
    if(dbConnection !== undefined) {
        return dbConnection;
    } else {
        try {
            const client = await MongoClient.connect(
                "mongodb://172.21.0.10:27017",
                options = {useNewUrlParser: true, auto_reconnect: true}
            );

            dbConnection = client.db("assignment");
            console.log('Connected successfully')
        } catch (error) {
            console.error('Connection failed!')
        }

        return dbConnection;
    }
};

module.exports = {
    dbConnect: dbConnect,
};
