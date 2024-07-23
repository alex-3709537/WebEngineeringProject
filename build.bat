git clone https://github.com/alex-3709537/WebEngineeringProject.git
cd WebEngineeringProject
cd src

echo "Creating database credentials..."
echo module.exports = { > config/databaseMySql.js
echo      host     : 'webhost.lordofcookie.de', >> config/databaseMySql.js
echo      user     : 'admin', >> config/databaseMySql.js
echo      password : 'WfO73LCg3hEDcqbUJAAY', >> config/databaseMySql.js
echo      database : 'webEngineeringProject' >> config/databaseMySql.js
echo } >> config/databaseMySql.js


echo "Starting server..."
start cmd /k "npm install --verbose && node index.js && cls && echo ^"Started server.^""
echo "Attempting to connect to website in 10s..."
timeout /t 10
start "" http://localhost:8080/blog/login




