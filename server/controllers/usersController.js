// // controllers/usersController.js
const { writeFileSync } = require('fs');
const { join } = require('path');
// const users = require('../models/users');

const datta = require('../models/datta');
const { users } = datta;
const createUser = (req, res) => {
//   const newUser = req.body;
//   users.push(newUser);
//   res.status(201).json({ message: 'User created', user: newUser });
  
    //  const user = require('../models/data.json');
    //  const { users } = data;
    //  const { firstname, secondname, password } = req.body;
    //    // get the Id of the last facster to generate a new Id
    //  const newId = users[users.length - 1].id + 1;

    //  const newUser = { id: newId, firstname, secondname, password };

    //  user.users.push(newUser);
    //  try {
    //    writeFileSync(join(__dirname, '..', 'models', 'data.json'), JSON.stringify(data, null, 2) + '\n');
    //    res.status(201).json(newUser);
    //  }
    //  catch (err) {
    //    next(err);
    //  }
// in storage 
  //    const data = require('../models/data.json');
  // const { users } = data;
  // const {firstname , secondname, password} = req.body;
  
  // if (!firstname || !secondname || !password) {
  //   return res.status(400).json({ error: "Missing fields" });
  // }

  // const newUser = {
  //   id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
  //   firstname,
  //   secondname,
  //   password
  // };
  // users.push(newUser);

  // try {
  //   writeFileSync(
  //     join(__dirname, '..', 'models', 'data.json'),
  //     JSON.stringify(data, null, 2) + '\n'
  //   );
  //   res.status(201).json(newUser);
  // } catch (err) {
  //   next(err);
  // }

  // in meomry
    const { firstname, secondname, password } = req.body;

  if (!firstname || !secondname || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    firstname,
    secondname,
    password
  };

  users.push(newUser);

  res.status(201).json(newUser);
}
const getAllUsers = (req, res) => {
  // const { users } = require('../models/data.json');
  res.json(users);
}
module.exports = { 
   createUser,
    getAllUsers
 };
