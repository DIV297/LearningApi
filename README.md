# LearningApi
This api is created using Express, Node and MongoDB.

How to run api
In api folder
index.js is main file which needs to be run with command->   nodemon index.js
db.js is a database file where you can change link and add your database link


checking api - you can check api on thunderclient
differnet endpoints are->
for student->
for adding user: localhost:3005/api/Suser/addstudent
for login user: localhost:3005/api/Suser/loginstudent
for getting details like id,name : localhost:3005/api/Suser/getstudent
for adding favourite teacher : localhost:3005/api/fav/addfavteacher/:user       here in place of user provide id of user you can fetch it from localhost:3005/api/Suser/getstudent
for removing fav teacher : localhost:3005/api/fav/removefavteacher/:user
get most fav teacher : localhost:3005/api/fav/mostfavteacher/

for teacher->
for adding teacher : localhost:3005/api/Tuser/addteacher
for login teacher : localhost:3005/api/Tuser/loginteacher
for fetching all teachers : localhost:3005/api/Tuser/fetchallteacher
