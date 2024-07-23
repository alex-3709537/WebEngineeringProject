#!/bin/bash

git clone https://github.com/alex-3709537/WebEngineeringProject.git
cd WebEngineeringProject/src

echo "Creating database credentials..."
cat << EOF > ./config/databaseMySql.js
module.exports = {
    host     : 'webhost.lordofcookie.de',
    user     : 'admin',
    password : 'WfO73LCg3hEDcqbUJAAY',
    database : 'webEngineeringProject'
}
EOF

echo "Installing dependencies..."
npm install --verbose

echo "Starting webserver..."
node index.js

