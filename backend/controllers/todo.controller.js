import Todo from '../models/todo.model.js';

export const getTodo = async (req,res) =>{
    try{
        const todos = await Todo.find();
        res.json(todos);

    }catch(error){
        res.status(500).json({message: error.message})

    }
}

export const addTodo =  async (req,res) =>{
    const todo = new Todo({
        text: req.body.text
    })
    try{
        const newTodo = await todo.save();
        res.status(201).json(newTodo);

    }catch(error){
        res.status(400).json({message: error.message})

    }
}

export const updateTodo = async (req,res) =>{
    try{
        const todo = await Todo.findById(req.params.id);
        if(!todo) 
            return res.status(404).json({
           message:"Todo not found."
        });
        if(req.body.text !== undefined){
            todo.text = req.body.text;
        }
         if(req.body.completed !== undefined){
            todo.completed = req.body.completed;
        }
        const updatedTodo = await todo.save();
        res.json(updatedTodo)

    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}

export const deleteTodo = async (req,res) =>{

    try{
        const newTodo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Todo deleted."});

    }catch(error){
        res.status(500).json({message: error.message})

    }
}