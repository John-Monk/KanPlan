const Todo = require('../models/Todo.js');

module.exports = {
  getTodos: async (req, res) => {
    try {
      const allTodos = await Todo.find();
      res.render('todos.ejs', {todos: allTodos})
    } catch (error) {
      console.log(error);
    }
  },
  createTodo: async (req, res) => {
    try {
        await Todo.create({
            title: req.body.todoTitle,
            content: req.body.todoItem, 
            status: 'todo'
        })
        console.log('Todo Added')
        res.redirect('/todo')
    } catch (error) {
        console.log(error);
    }
  },
  markTodo: async (req, res) => {
    try {
        await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
            status: 'todo'
        })
    } catch (error) {
      console.log(error);
    }
  },
  markDoing: async (req, res) => {
    try {
        await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
            status: 'doing'
        })
    } catch (error) {
      console.log(error);
    }
  },
  markDone: async (req, res) => {
    try {
        await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
            status: 'done'
        })
    } catch (error) {
      console.log(error);
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile)
    try {
        await Todo.findOneAndRemove({_id:req.body.todoIdFromJSFile})
        console.log('Deleted Todo')
        res.json('Deleted')
    } catch (error) {
      console.log(error);
    }
  },
}
