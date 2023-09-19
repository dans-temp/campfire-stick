import './Todo.css';
import React, { useState, useEffect } from 'react'
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, orderBy, query } from 'firebase/firestore'


import { db } from '../services/firebase.config'

const Todo = () => {

  const [createTodo, setCreateTodo] = useState("")
  const [userName, setUserName] = useState("")
  const [todos, setTodo] = useState([]);
  const [error, setError] = useState('');
  const collectionRef = collection(db, 'todo');

  
  useEffect(() => {
    const getTodo = async () => {
      const q = query(collectionRef, orderBy('timestamp'))
      await getDocs(q).then((todo) => {
        let todoData = todo.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setTodo(todoData)
      }).catch((err) => {
        console.log(err);
      })
    }
      getTodo();    
  }, [])



  //Add Todo Handler
  const submitTodo = async (e) => {
    e.preventDefault();

    if(userName.length < 3 || createTodo < 3)
    {
     setError('Your name and story must be at least 3 characters long');
    }
    else
    {
      setError('');
      try {
        await addDoc(collectionRef, {
          todo: createTodo,
          username: userName,
          timestamp: serverTimestamp()
        })
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  }



  //Delete Handler
  const deleteTodo = async (id) => {
    try {

      if (window.confirm("Are you sure you want to delete this Task!")) {
        const documentRef = doc(db, "todo", id);
        await deleteDoc(documentRef)
        window.location.reload()
      }

    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
    <div className='bg'>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
 
              <div className="card-body center-button">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                  type="button"
                  className="btn button">Add To Story
                </button>
              </div>

                {todos.map(({ todo, id, username, timestamp }) =>
                  <div className="card card-white">
                    <div className="card-body">
                      <div className="todo-list" key={id}>
                        <div className="todo-item">
                          <span>
                            &nbsp;{todo}<br />
                            
                          </span>
                          <button
                            type="button"
                            className="btn btn-danger float-end"
                            onClick={() => deleteTodo(id)}
                          >Delete</button>
                          <i className="float-end">- {username}, {new Date(timestamp.seconds * 1000).toLocaleString()}</i>
                        </div>
                      </div>
                  </div>
              </div>
                )}

              <div className="card-body center-button">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                  type="button"
                  className="btn button">Add To Story
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>

      {/* Modal */}
      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form className="d-flex" onSubmit={submitTodo}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">Add To Story</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    placeholder="Enter your name"
                    onChange={(e) => setUserName(e.target.value)}
                    maxLength={16}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="todoInput" className="form-label">Add To Story</label>
                  <textarea
                    className="form-control"
                    id="todoInput"
                    placeholder="256 characters max"
                    onChange={(e) => setCreateTodo(e.target.value)}
                    rows="4"
                    maxLength={256}
                  ></textarea>
                </div>
              </div>
              <p className="error">{error}</p>
              <div className="modal-footer">
                <button className="btn button">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Todo