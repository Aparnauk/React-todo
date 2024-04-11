import React, { useEffect, useRef, useState } from 'react'
import './Todo.css'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
// delete
import { MdAutoDelete } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";


function Todo() {

    const [todo, setTodo] = useState('')

    // store datas
    const [todos, setTodos] = useState([])

    const [editId, setEditID] = useState(0)




    // form handle
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // for button click
    const addTodo = () => {
        if (todo !== '') {
            setTodos([...todos, { list: todo, id: Date.now(), status: false }])
            console.log(todos);
            setTodo('')
        }

        if (editId) {
            const editTodo = todos.find((todo) => todo.id == editId)
            const updateTodo = todos.map(
                (to) => to.id === editTodo.id
                    ?
                    (to = { id: to.id, list: todo })
                    :
                    (to = { id: to.id, list: to.list })
            )
            
            setTodos(updateTodo)
            setEditID(0)
            setTodo('')
        }
    }

    // to access dom
    const inputRef = useRef('null')

    // for initial loading
    useEffect(() => {
        inputRef.current.focus()
    })

    // delete
    const onDelete = (id) => {
        // return statement
        setTodos(todos.filter((to) => to.id !== id))
    }

    // complete
    const onComplete = (id) => {
        let complete = todos.map((list) => {

            if (list.id === id) {
                return ({ ...list, status: !list.status })
            }
            return list

        })

        setTodos(complete)
    }

    // edit
    const onEdit = (id) => {
        const editTodo = todos.find((to) => to.id === id)
        setTodo(editTodo.list)
        setEditID(editTodo.id)
    }




    return (
        <div className='container'>
            <div className='background'>

                <h1 className='mt-5'>"<span>M</span>aster <span>Y</span>our <span>D</span>ay : Your Ultimate <span>To-Do</span> Roadmap<span>
                    <i style={{ marginLeft: '8px', marginRight: '5px' }} class="fa-solid fa-exclamation fa-beat-fade"></i></span>"</h1>



                <Row className='form mb-5 mt-5'>
                    <Col lg={5}>
                        <div className='image'>
                            <img src="https://i.pinimg.com/originals/d4/9a/cd/d49acd22d3cf60b4c32f69d3614a2207.gif" alt="" />
                        </div>
                    </Col>

                    <Col lg={7}>
                        <form onSubmit={handleSubmit}>
                            <input value={todo} ref={inputRef} type="text" placeholder='Chart your goals' onChange={(event) => setTodo(event.target.value)} />

                            <button onClick={addTodo}>
                                {editId ? 'EDIT' : <i class="fa-solid fa-plus fa-flip"></i>}
                            </button>



                            <Card className='card mt-5 mb-2'>
                                {
                                    todos.map((to) => (
                                        <Card.Body className='body'>

                                            <Card.Title id={to.status ? 'list-item' : ''}>
                                                {to.list}
                                            </Card.Title>



                                            <span style={{ marginLeft: '80%' }}>

                                                <IoMdDoneAll
                                                    className='text-success fs-5'
                                                    title='Complete'
                                                    onClick={() => onComplete(to.id)}
                                                />

                                                <MdEditNote
                                                    className='text-warning fs-5 ms-2'
                                                    title='Edit'
                                                    onClick={() => onEdit(to.id)}
                                                />

                                                <MdAutoDelete
                                                    className='text-danger fs-5 ms-2'
                                                    title='Delete'
                                                    onClick={() => onDelete(to.id)}
                                                />

                                            </span>

                                        </Card.Body>
                                    ))

                                }
                            </Card>

                        </form>
                    </Col>
                </Row>



            </div>
        </div>
    )
}

export default Todo