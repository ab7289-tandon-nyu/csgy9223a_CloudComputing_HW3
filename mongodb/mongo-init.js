var dbName = "camp2016";
var dbCollectionName = "todo";

db.auth('mongodbuser', 'password');
db = db.getSiblingDB(dbName);
db.createCollection(dbCollectionName);