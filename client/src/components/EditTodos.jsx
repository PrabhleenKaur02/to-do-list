import React, { useState } from 'react'

const EditTodos = ({ todo }) => { 

    const [description, setDescription] = useState(todo.description);

    // edit todo
    const updateDescription = async(e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }) 

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
              } else {
                console.error('Error:', response.status, response.statusText);
              }
        
             window.location = "/";

        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <>
    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
  Edit
</button>

{/* <!-- The Modal --> */}
<div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
  <div className="modal-dialog">
    <div className="modal-content">

      {/* <!-- Modal Header --> */}
      <div className="modal-header">
        <h4 className="modal-title">Edit todo</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}></button>
      </div>

      {/* <!-- Modal body --> */}
      <div className="modal-body">
        <input type="text" className='form-control' value={description} 
        onChange={e => {
            setDescription(e.target.value)
        }} />
      </div>

      {/* <!-- Modal footer --> */}
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={e => updateDescription(e)}>Save</button>
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
      </div>

    </div>
  </div>
</div>
    </>
  )
}


export default EditTodos