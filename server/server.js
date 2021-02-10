const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5051;
const Todo = require('./models/todo')
const URI =
  "mongodb+srv://thatguy:aa124888@cluster0.nhyuc.mongodb.net/todos?retryWrites=true&w=majority";
const middleware = [
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
];


app.use(middleware);
try {
  mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connected");
    }
  );

} catch (error) {
  console.log('could not connect')
}




app.get("/", (req, res) => {
  Todo.find().exec().then(docs=>{
    console.log(docs);
    res.status(200).json(docs)
  }).catch(err=>{
    console.log(err)
    res.status(500).json({
      error:err
    })
  })
});
app.post('/addTodo', (req, res, next) => {
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title
  })
  todo.save().then(result => {
    console.log(result)
    res.status(201).json({
      message:"success",
      res:result
    })
  }).catch(err => {
    console.log(err)
  })
})
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
