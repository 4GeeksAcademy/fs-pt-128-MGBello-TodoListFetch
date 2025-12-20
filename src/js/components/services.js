export const API_URL = 'https://playground.4geeks.com/todo'
export const USER = 'MGB'
export const getList = async () => {
    const response = await fetch(`${API_URL}/users/${USER}`)
    if (!response.ok) {
        console.log(response);
        createUser()
    }
    const data = await response.json()
    setTodoList(data.todos)
}
export const createUser = async () => {
    const response = await fetch(`${API_URL}/users/${USER}`, {
        method: "POST"
    })
    if (response.ok) {
        getList()
    }

}
export const createItemList = async () => {
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
export const updateItem = async (id, newValue, status) => {
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
export const deleteItem = async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        getList()
    }

}