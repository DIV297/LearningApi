const express = require('express')
const router = express.Router()
const Favteacher = require('../models/FavTeacher')
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const TUser = require('../models/TeacherUser');
const { MongoClient } = require("mongodb");

/*********************************
add teacher in Favourite List. 
here you have to provide id of user in place of :user
 *********************************/
router.put('/addfavteacher/:user',
 [
    body('name', 'enter valid name.Name should have atleast 3 characters').isLength({ min: 3 }),
    body('subject', 'Enter valid subject').exists()
], fetchuser, async (request, response) => {
    try {
        const { name, subject } = request.body;
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        //checking is teacher present in database that user want to add in fav list
        const checkfav = await TUser.findOne({ name: request.body.name, subject: request.body.subject })
        if (!checkfav) {
            //not present
            return response.status(400).json({ error: 'No such teacher exists' })
        }
        // teacher present. Now we have to check is teacher present in user fav list 
        const infavdatabase = await Favteacher.findOne({ name: request.body.name, subject: request.body.subject, user: request.params.user })
        if (infavdatabase) {
            // teacher already present in fav list
            return response.status(400).json({ error: 'Teacher already in Favourite List' });
        }
        const fav = new Favteacher({
            name, subject, user: request.user.id
        })
        const saveFav = await fav.save()
        response.json(saveFav)
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
})


/************************************************
removing teacher from fav list
here you have to provide id of user in place of :user 
*******************************************/
router.delete('/removefavteacher/:user', fetchuser, async (request, response) => {
    try {
        const { name, subject } = request.body;
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const infavdatabase = await Favteacher.findOne({ name: request.body.name, subject: request.body.subject, user: request.params.user })
        if (!infavdatabase) {
            // teacher is not in fav list
            return response.status(400).json({ error: 'No Such Teacher in Favourite List' });
        }
        //Removing from fav list
        await infavdatabase.remove()
        response.status(400).json({ "Done": 'Teacher Removed from Favourite List' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send('Internal Server Error');
    }
})


/*************************************
finding most favourite teacher using aggregation
 ************************************/
router.get('/mostfavteacher',async (request,response)=>{
    //aggregation code
    const agg = [
        {
          '$group': {
            '_id': {
              'name': '$name', 
              'subject': '$subject'
            }, 
            'Totalfav': {
              '$sum': 1
            }
          }
        }, {
          '$setWindowFields': {
            'partitionBy': '$name', 
            'sortBy': {
              'Totalfav': -1
            }, 
            'output': {
              'Rank': {
                '$documentNumber': {}
              }
            }
          }
        }
      ];
          const uri="mongodb://localhost:27017/learningapp"
          const client=new MongoClient(uri)
          await client.connect();
      const coll = client.db('learningapp').collection('favteachers');
      const cursor = coll.aggregate(agg);
      const result = await cursor.toArray();
      await client.close();
    response.send(result);
})
module.exports = router 