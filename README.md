# LearningApi
This api is created using Express, Node and MongoDB.

## How to run api
Note-Install node_modules,express,nodemon,bcrypt,express-validator,nodemon,moongose,jsonwebtoken with npm. 

In api folder
index.js is main file which needs to be run with command->   nodemon index.js

db.js is a database file where you can change link and add your database link

you need to change link of database in favteacher.js also at last where aggregation code is there.


## checking api - you can check api on thunderclient
differnet endpoints are->
### for student->
for adding user(post): localhost:3005/api/Suser/addstudent

for login user(post): localhost:3005/api/Suser/loginstudent

for getting details like id,name(post) : localhost:3005/api/Suser/getstudent

for adding favourite teacher(put) : localhost:3005/api/fav/addfavteacher/:user       here in place of user provide id of user you can fetch it from localhost:3005/api/Suser/getstudent

for removing fav teacher(del) : localhost:3005/api/fav/removefavteacher/:user

get most fav teacher(get) : localhost:3005/api/fav/mostfavteacher/

### for teacher->
for adding teacher(post) : localhost:3005/api/Tuser/addteacher

for login teacher(post) : localhost:3005/api/Tuser/loginteacher

for fetching all teachers(get) : localhost:3005/api/Tuser/fetchallteacher
