import './Todo.css';
import React, { useState, useEffect } from 'react'
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, orderBy, query } from 'firebase/firestore'
import { db } from '../services/firebase.config'

const Todo = () => {

  const [createTodo, setCreateTodo] = useState("")
  const [userName, setUserName] = useState("")
  const [todos, setTodo] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [error, setError] = useState('');
  const collectionRef = collection(db, 'todo');

  
  useEffect(() => {
    const getTodo = async () => {
      const q = query(collectionRef, orderBy('timestamp'))
      await getDocs(q).then((todo) => {
        let todoData = todo.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        let i = 0;
        //return the current active story
        const lastElements = [];
        for (todo of todoData)
        {
          if(i === 10)
          {
            i = 0;
            lastElements.splice(0);
          }
          i++;
          lastElements.push(todo);
        }
        setLoadingPage(false);
        if(lastElements.length !== 10)
        {
          setTodo(lastElements);
        }
      }).catch((err) => {
        console.log(err);
      })
    }
      getTodo();    
  }, [])



  //Add Todo Handler
  const submitTodo = async (e) => {
    e.preventDefault();
    if(userName.replace(/\s/g, '').length < 3 || createTodo.replace(/\s/g, '').length < 3)
    {
      console.log('err');
     setError('Your name and story must be at least 3 characters long');
    }
    else
    {
      setError('');
      const badWords = require('./BadWords.js');
      const regex = new RegExp(badWords.join('|'), 'gi');
      const filteredString = createTodo.replace(regex, (match) => '*'.repeat(match.length));
      const filteredUserName = userName.replace(regex, (match) => '*'.repeat(match.length));
      try {
        await addDoc(collectionRef, {
          todo: filteredString,
          username: filteredUserName,
          timestamp: serverTimestamp()
        })
        console.log(todos.length);
        if(todos.length === 9)
        {
          window.location.assign("#/history")
          window.location.reload();
        }
        else
          window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
        <header className="header marg-up-down">
                <h1 className='rye-font redwood-color'>The Current Story</h1>
                <p>Add To The Current Story Being Told</p>
            </header>
            <div className="card-body center-button">
              <button
                data-bs-toggle="modal"
                data-bs-target="#addModal"
                type="button"
                className="btn button">Add To Story
              </button>
            </div>

              {/* display text if no todos */}
              {(todos.length <= 0 && !loadingPage) && (
                <div className="card">
                  <div className="card-body">
                    <div className="todo-list">
                      <div className="todo-item start-story">
                        <span>
                          &nbsp;There are no messages in this story yet.  Why don't you start things off for us?<br/>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {todos.map(({ todo, id, username, timestamp }) =>
                <div className="card">
                  <div className="card-body">
                    <div className="todo-list" key={id}>
                      <div className="todo-item">
                        <span>
                          &nbsp;{todo}<br/>
                        </span>
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