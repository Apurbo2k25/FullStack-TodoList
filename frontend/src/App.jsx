import { useEffect, useState } from "react";
import axios from "axios";

//// The base URL for the hosted backend API on Render. 
// Replace this with localhost:8081 during local development if needed.
const API_URL = "https://todo-backend-bnzm.onrender.com/api/todos";

function App() {
  
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [updateText, setUpdateText] = useState(""); 
  const [searchTask, setSearchTask] = useState("");
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTodos = async () => {
    setError(null); 
    try {
      const response = await axios.get(`${API_URL}`);
      setTodos(response.data);
    } catch (err) {
      setError("Connection failed. Check if your backend server is running! ❌");
    }
  };

  useEffect(()=>{
    fetchTodos();

  },[])// that empty dependency array ensures it only runs once when the page loads//

  // Add a new task
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post(`${API_URL}`, { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo(""); 
    } catch (error) {
      setError("Failed to add task.");
    }
  };

  // Update task text
  const updateTodo = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { text: updateText });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingId(null);
    } catch (error) {
      setError("Update failed. Please try again.");
    }
  };

  // Delete task
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError("Could not delete task.");
    }
  };

  // Toggle complete
  const toggleComplete = async (todo) => {
    try {
      const response = await axios.patch(`${API_URL}/${todo._id}`, { 
        completed: !todo.completed 
      });
      setTodos(todos.map((t) => (t._id === todo._id ? response.data : t)));
    } catch (error) {
      setError("Error updating task status.");
    }
  };

  return (
    <div className="min-h-screen bg-[#3852B4] p-4 
    flex justify-center items-start sm:items-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8">
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Todo List👋</h1>
          <p className="text-sm mt-5 text-gray-500">Write & Add Your Daily Tasks Here.</p>
        </div>

       
        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Add a new task..." 
            required
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 bg-gray-300 
            rounded-xl px-4 py-3 text-sm"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2.5 
          rounded-xl font-medium hover:bg-blue-700 transition-all text-sm">
            Add
          </button>
        </form>
        
        
        <div className="relative flex items-center mb-6">
          <input 
            placeholder="Search tasks..." 
            onChange={(e) => setSearchTask(e.target.value)} 
            className="flex-1 bg-gray-300 
            rounded-xl px-4 py-3 text-sm"
          />
        </div>

      {/* That part will show the error mssg on the disply if error occured */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl
           mb-4 text-xs text-center border border-red-100">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">


          {todos.length > 0 ? 
          
          (
            todos
                //  filter todos based on search input (case insensitive search)
              .filter(t => t.text.toLowerCase().includes(searchTask.toLowerCase()))
                // map through todos and render each todo item 
              .map((todo) => (
                <div key={todo._id}
                 className="flex items-center gap-3 p-3
                 bg-white border border-gray-100 rounded-xl shadow-sm">
                  
                 
                  <button 
                    onClick={() => toggleComplete(todo)}
                     className=
                     {`h-5 w-5 rounded-full border flex items-center
                       justify-center shrink-0 transition-all

                       {/* apply different styles depending on completed status */}
                    ${
                      todo.completed ?
                      "bg-green-500 border-green-500 text-white"
                       : 
                      "border-gray-300"
                    }`}
                  >
                    
                    {todo.completed && <span className="text-[10px]">✔️</span>}
                  </button>

                  
                  {editingId === todo._id ?
                   (
                    <div className="flex flex-1 gap-2">
                      <input
                        className=
                        "flex-1 rounded-lg px-2 py-1 text-sm outline-none"
                        value={updateText}
                        onChange={(e) => setUpdateText(e.target.value)}
                      />

                      <button className="bg-green-500  rounded px-3
                       font-semibold hover:bg-green-600 "
                       onClick={() => updateTodo(todo._id)}>Save</button>
                      <button className="bg-red-500 rounded px-1.5
                       font-semibold  hover:bg-red-600"
                       onClick={() => setEditingId(null)}>Cancel</button>
                    </div>

                   ) : (

                    <div className="flex flex-1 items-center
                     justify-between min-w-0 font-semibold">

{/* span is used to display the todo text. truncate is used so that if the text is 
  very long it will not break the layout if the task is completed we show line-through
  style to indicate it is done
*/}
                      
                      <span className= 
                      {`truncate text-sm 
                        ${todo.completed ?
                       'line-through text-red-500'
                        : 
                        'text-gray-800'}
                      `}>
                      {todo.text}
                      </span>



                      <div className="flex gap-2 ml-2 shrink-0">
 {/* edit button: when clicked it switches the todo into editing mode.
      we store the id of the todo we want to edit in editingId.
      we also copy the current text into updateText so it appears inside the input box.
 */}
                        <button onClick={() => { setEditingId(todo._id); setUpdateText(todo.text); }}
                         className="p-1 hover:bg-amber-300 rounded-full text-lg">🖋️</button>
                        <button onClick={() => deleteTodo(todo._id)} 
                        className="p-1  hover:bg-amber-300 rounded-full text-lg">🗑️</button>
                      </div>
                    </div>
                  )}
                </div>
              ))

          ) : (

               <p className="text-center text-gray-500 text-xl mt-5">No tasks found 🔎</p>
              )}
        </div>
      </div>
    </div>
  );
}

export default App;