import React, { useEffect, useState } from "react";
import '../../styles/ListSection.css'

export const ListSection = ({ todoList, setTodoList, list, setList }) => {
    console.log(todoList);

    const API_URL = 'https://playground.4geeks.com/todo'
    const USER = 'MGBello'
    const getList = async () => {
        const response = await fetch(`${API_URL}/users/${USER}`)
        if (!response.ok) {
            console.log(response);
            createUser()
            return
        }
        const data = await response.json()
        setTodoList(data.todos)
    }
    const createUser = async () => {
        const response = await fetch(`${API_URL}/users/${USER}`, {
            method: "POST"
        })
        if (response.ok) {
            getList()
        }

    }
    const createItemList = async () => {
        const response = await fetch(`${API_URL}/todos/${USER}`, {
            method: "POST",
            body: JSON.stringify({
                "label": list,
                "is_done": false
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        if (response.ok) {
            getList()
        }
    }
    const updateItem = async (id, newValue, status) => {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                'label': newValue,
                'is_done': status
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        if (response.ok) {
            getList()
        }
    }
    const deleteItem = async (id) => {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE"
        })
        if (response.ok) {
            getList()
        }

    }
    useEffect(() => {
        getList()
    }, [])


    const [isEdit, setIsEdit] = useState(null)
    
    const handlerClick = () => {
        if (list.trim() == "") {
            alert('You cannot leave the text input blank.')
            return
        }
        createItemList()
        setList("")
        setIsEdit(null)
    }
    const handlerKeyUp = (e) => {
        if (e.key === 'Enter') {
            handlerClick();
        }
    };
    const handlerEdit = (newValue, id) => {
        const updateList = [...todoList]
        updateList[id] = { ...updateList[id], label: newValue };
        setTodoList(updateList)
    }
    const handlerCheck = (value, id) => {
        if (value) {
            setIsCheck(true)
        }
    }

    return (
        <main className="main d-flex flex-column align-items-center justify-content-center">
            <div className="input-group input-task m-3 w-100 justify-content-center">
                <span className="input-group-text input-task-text" id="inputGroup-sizing-default">Task</span>
                <input type="text" name='list'
                    className="form-control input-task-input"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={list}
                    onChange={handlerChange} onKeyUp={handlerKeyUp} />
                <button className="btn button-task" onClick={handlerClick} onKeyUp={handlerKeyUp}>Add</button>
            </div>
            <div className="totalTasks">{todoList.filter(item => item.is_done !== true).length == 0 ? 'No tasks have been added yet' : `You have ${todoList.filter(item => item.is_done !== true).length} tasks due today`}</div>
            {
                todoList.map((item, index) => (
                    <React.Fragment>
                        {
                            item.is_done == false ? (
                                <div className="d-flex align-items-center justify-content-between w-100  tasks" key={index}>
                                    <div className="check">
                                        <button
                                            className={`btn button-check ${item.is_done ? 'text-success' : 'text-secondary'}`}
                                            onClick={() => updateItem(item.id, item.label, !item.is_done)}
                                        >
                                            <i className="fa-solid fa-check "></i>
                                        </button>
                                    </div>
                                    {isEdit === index ? (<input className="form-control d-inline"
                                        value={item.label}
                                        onChange={(e) => handlerEdit(e.target.value, index)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                updateItem(item.id, item.label, item.is_done)
                                                setIsEdit(null);
                                            }
                                        }}
                                        autoFocus
                                    />) : (
                                        <p className={`p-0 m-0 mx-3 fs-5 flex-grow-1 ${item.is_done ? 'text-decoration-line-through text-muted' : ''}`}>
                                            {item.label}
                                        </p>
                                    )}
                                    <div>
                                        <button className="btn edit fs-6" onClick={() => setIsEdit(index)}>
                                            <i className="fa-solid fa-pencil text-success"></i>
                                        </button>
                                        <button className="btn delete fs-6" onClick={() => deleteItem(item.id)}>
                                            <i className="fa-solid fa-trash text-danger"></i>
                                        </button>
                                    </div>

                                </div>
                            ) : null
                        }

                    </React.Fragment>

                ))
            }
        </main >
    );
};
