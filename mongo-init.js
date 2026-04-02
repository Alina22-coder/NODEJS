db.createUser({
    user: 'aburlakovait_db_user',
    pwd: 'fyEJnNWvUdYqXM2L',
    roles: [
        {
            role: readWrite,
            db: 'nodejs-express'
        }
    ]
})