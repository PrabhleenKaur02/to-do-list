import React, { useEffect, useState } from 'react'

import EditTodos from './EditTodos';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    // listing todos
    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const data = await response.json();

            setTodos(data);

        } catch (error) {
            console.error(error.message);
        }
    };

    // delete function
    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message)
        }
    };


    useEffect(() => {
        getTodos();
    }, [])


  return (
    <>
    <div className='container mt-5'>
     <table className="table table-hover">
    <thead className='table-success'>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {todos.map(todo => (
        <tr key={todo.todo_id}>
            <td>
                {todo.description}
            </td>
            <td><EditTodos todo={todo} /></td>
            <td><button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
    </>
  )
}

export default ListTodos