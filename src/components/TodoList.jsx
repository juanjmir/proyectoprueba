import React, { Fragment, useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { TodoItem } from './TodoItem';

const KEY = "todolist-todos"


export function TodoList(){

    const [todos, setTodos] = useState([]);

    const taskRef = useRef();
    const taskRef2 = useRef();


    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos){
            setTodos(storedTodos);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos])

    const agregarTarea = () => {
        console.log("AGREGANDO TAREA");
        const task = taskRef.current.value;
        const des = taskRef2.current.value;

        if (task === '') return;

        setTodos((prevTodos) => {
            const newTask = {
                id: uuid(),
                task: task,
                des:des,
                completed: false
            }

            return [...prevTodos, newTask]
        })

        taskRef.current.value = null
        taskRef2.current.value = null
    }

    const ResumenTareas = () => {
        const cant = cantidadTareas()
        if (cant === 0){
            return (
                <div className="alert alert-success mt-3">
                    Felicitaciones no tienes tareas pendientes! :)
                </div>
            )
        }

        if (cant === 1){
            return (
                <div className="alert alert-info mt-3">
                    Te queda solamente una tarea pendiente!
                </div>
            )
        }

        return (
            <div className="alert alert-info mt-3">
                Te quedan {cant} tareas pendientes!
            </div>
        )
    }

    const cantidadTareas = () => {
        return todos.filter((todo) => !todo.completed).length;
    }

    const cambiarEstadoTarea = (id) => {
        console.log(id)
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id)
        todo.completed = !todo.completed;
        setTodos(newTodos)
    }

    const eliminarTareasCompletadas = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    return (

        <Fragment>
            <h1>Listado de Tareas</h1>

            <div className="input-group mt-4 mb-4">
                <input ref={taskRef} placeholder='Titulo' className="form-control" type="text"></input>
                <input ref={taskRef2} placeholder='Descripcion' className="form-control" type="text"></input>
                <input placeholder='Importante' type="checkbox"></input>
                <button onClick={agregarTarea} className="btn btn-success ms-2"><i className="bi bi-plus-circle"></i></button>
                <button onClick={eliminarTareasCompletadas} className="btn btn-danger ms-2"><i className="bi bi-trash"></i></button>
            </div>

            <ul className="list-group">
                {todos.map((todo) => (
                    <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea}></TodoItem>
                ))}
            </ul>

            <ResumenTareas />
        </Fragment>

    );
}
