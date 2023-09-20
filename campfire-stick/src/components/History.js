import './Todo.css';
import React, { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'


import { db } from '../services/firebase.config'

const Todo = () => {
  const [todos, setTodo] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const collectionRef = collection(db, 'todo');

  
  useEffect(() => {
    const getTodo = async () => {
      const q = query(collectionRef, orderBy('timestamp'))
      await getDocs(q).then((todo) => {
        let todoData = todo.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        let i = 0;
        //return the current active story
        const pastStories = [];
        const lastElements = [];
        for (const todo of todoData)
        {
          if(i === 10)
          {
            i = 0;
            pastStories.push([...lastElements]);
            lastElements.splice(0);
          }
          i++;
          lastElements.push(todo)        
        }
        if(lastElements.length === 10)
        {
            pastStories.push([...lastElements]);
        }
        
        setLoadingPage(false);
        setTodo(pastStories);
      }).catch((err) => {
        console.log(err);
      })
    }
      getTodo();    
  }, [])



  return (
    <>
    <div className='bg'>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <header className="header marg-up-down">
                <h1 className='rye-font redwood-color'>History</h1>
                <p>A List Of All The Completed Stories Told</p>
            </header>
                {/* display text if no todos */}
                {(todos.length <= 0 && !loadingPage) && (
                  <div className="card">
                    <div className="card-body">
                      <div className="todo-list">
                        <div className="todo-item start-story">
                          <span>
                            &nbsp;There are no saved stories yet. Go to the story page and when it gets to 10 messages it will be saved here<br/>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {todos.map((todoArray, index) => (
                <div className="card" key={index}>
                    <div className="story-title"> Story {index+1} </div>
                    <div className="card-body">
                    {todoArray.map((todoItem, itemIndex) => (
                        <div className="todo-list" key={itemIndex}>
                        <div className="todo-item">
                            <span>
                            &nbsp;{todoItem.todo}<br />
                            </span>
                            <i className="float-end-history">
                            - {todoItem.username}, {new Date(todoItem.timestamp * 1000).toLocaleString()}
                            </i>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Todo