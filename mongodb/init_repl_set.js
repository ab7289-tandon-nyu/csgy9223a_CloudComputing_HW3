function checkStatus(rs) {
    try {
        return rs.status().ok == 1 ? 0 : 1;
    } catch (ex) { }

    config = {
        _id: "rs0",
        members: [
            {
                _id: 0,
                host: "mongo-0.mongo-service-headless.default.svc.cluster.local:27017"
            },
            {
                _id: 1,
                host: "mongo-1.mongo-service-headless.default.svc.cluster.local:27017"
            },
            {
                _id: 2,
                host: "mongo-2.mongo-service-headless.default.svc.cluster.local:27017"
            }
        ]
    }
    var error = rs.initiate(config)
    // if (error) {
    //     return error;
    // } else {
    //     return 0;
    // }
    return 0;
    // return rs.status().ok == 1 ? 0 : 1;
}

checkStatus(rs);