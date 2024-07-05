import React, { useState } from 'react'

const InputTodo = () => {

  const [description, setDescription] = useState("");

  const onSubmitForm = async(e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('Error:', response.status, response.statusText);
      }

     window.location = "/";

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
    <h1 className='text-center mt-5'>Todo</h1>

   <div className='container'>
    <div className='row justify-content-center'>
      <div className='col-md-8 mt-5'>
      <form className='d-flex mt-5' onSubmit={onSubmitForm}>
        <input type="text" className='form-control me-3' value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className='btn btn-success'>Add</button>
        </form>  
      </div>      
    </div>
   </div>
   
    </>
  )
}

export default InputTodo