"use strict";

const URL = "https://localhost:7094"

async function requestAll() {
    var response;
    await fetch(`${URL}/api/todo`)
    .then((result) => response = result)
    .catch((err) => console.error(err));

    var jsonData;
    await response.json()
    .then((result) => {
        jsonData = result;
    })
    .catch((err) => console.error(err));

    return jsonData;
}

async function requestAdd(todo) {
    await fetch(`${URL}/api/todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({toDoName: todo})
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });
}

async function requestUpdate(id, toDo) {
    await fetch(`${URL}/api/todo/${id}`, {
        method: 'PUT',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({toDoName: toDo})
    })
    .then(response => console.log(response))
    .catch(error => {
        console.error(`Error: ${error}`);
    });
}

async function requestDelete(id) {
    await fetch(`https://localhost:7094/api/todo/${id}`, {
        method: 'DELETE',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Bad status code.")
    })
    .catch(error => {
        console.error(`Failed to make request: ${error}`);
    });
}

export default {
    requestAll,
    requestAdd,
    requestUpdate,
    requestDelete
}