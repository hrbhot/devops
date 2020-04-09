db.createUser(
    {
        user: "admin",
        pwd: "devops",
        roles:[
            {
                role: "readWrite",
                db:   "devops"
            }
        ]
    }
);
