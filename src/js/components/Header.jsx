import React from "react";
import '../../styles/Header.css';

export const Header = ({ todoList, setTodoList }) => {
    const API_URL = 'https://playground.4geeks.com/todo';
    const USER = 'MGBello';

    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getList = async () => {
        try {
            const response = await fetch(`${API_URL}/users/${USER}`);
            if (response.ok) {
                const data = await response.json();
                setTodoList(data.todos);
            }
        } catch (error) {
            console.error("Error actualizando lista:", error);
        }
    };

    const deleteItem = async (id) => {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            setTodoList(todoList.filter(item => item.id !== id));
        }
    };

    return (
        <header className="header shadow-custom align-items-center row w-100">
            <div className="date col-6 d-flex align-items-center p-3">
                <i className="fa fa-calendar fs-1 me-3"></i>
                <p className="m-0 fw-bold">{days[date.getDay()]}, {month[date.getMonth()]} {date.getDate()}</p>
            </div>

            <div className='col-6 d-flex justify-content-end p-3'>
                <button type="button" className="btn button-complete" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Complete Tasks
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-dark">Complete Tasks</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body text-start">
                                {todoList.filter(item => item.is_done === true).map((item) => (
                                    <div key={item.id} className="d-flex justify-content-between p-2 border-bottom">
                                        <span className="text-dark">{item.label}</span>
                                        <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};