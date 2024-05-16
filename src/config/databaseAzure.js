module.exports = {
    user: 'developer', // better stored in an app setting such as process.env.DB_USER
    password: 'uYMSNA1pO1xooL4zaIbg', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'webengineeringproject.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'webEngineeringProjectDatabase', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}