import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import {BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill} from 'react-icons/bs'

function Home() {

    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleCheck = (id) => {
        axios.put('http://localhost:3001/update/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="container">
        <div className='home'>
            <h1>Todo List</h1>
            <Create/>
            <br />
            {
                todos.length === 0
                ?
                <div><h1>No Record</h1></div>
                :
                todos.map(todo => (
                    <div className='task'>
                        <div className='checkbox' onClick={() => handleCheck(todo._id)}>
                            {todo.done ? 
                                <BsFillCheckCircleFill className='icon'/>
                            :   <BsCircleFill className='icon'/>
                            }            
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p> 
                        </div>
                        <div>
                            <span><BsFillTrashFill className='icon'
                                onClick={() => handleDelete(todo._id)}/>
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Home