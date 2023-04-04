print('Start ##########################################################################################')
var dbName = process.env.MONGO_INITDB_DATABASE;
print("Database name: " + dbName) + "-------------------------------------------------------------------";
var dbCollectionName = "todo";

// on init, create our database
db = db.getSiblingDB(dbName);
// then create our collection
db.createCollection(dbCollectionName);

print('End ##########################################################################################')