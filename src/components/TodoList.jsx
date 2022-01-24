import React, { Fragment, useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { TodoItem } from './TodoItem';

const KEY = "todolist-todos"

export function TodoList(){

    const [todos, setTodos] = useState([]);

    const taskRef = useRef();
    const taskRef2 = useRef();
    const importancia = useRef();

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
        const imp = importancia.current.checked;
        var color="";
          if (des=== '') return;
          if (imp===true) {
            color="IMPORTANCIA ALTA";
        }else{ color="POST NO CRITICO";
    }
        setTodos((prevTodos) => {
         
            const newTask = {
                id: uuid(),
                task: task,
                des:des,
                importancia:color
                
            }

            return [...prevTodos, newTask]
        })

        taskRef.current.value = null
        taskRef2.current.value = null
        importancia.current.checked= null
    }

    const cambiarEstadoTarea = (id) => {
        console.log(id)
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id)
        todo.completed = !todo.completed;
        setTodos(newTodos)
        eliminarTareasCompletadas();
        }

    const eliminarTareasCompletadas = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    return (

        <Fragment>
            <h1>Post it Simulator!</h1>
            
            <div className="input-group mt-1 mb-1">
                <input ref={taskRef} placeholder='Titulo' className="form-control mt-1 mb-3" type="text"></input>
                <input ref={taskRef2} placeholder='Descripcion' className="form-control mt-1 mb-3 m-1" type="text"></input>
               
                 <div><input ref={importancia} className="input-group-text input-group-prepend mb-3 mt-1 m-4" type="checkbox"/> Importante!</div>
                <button onClick={agregarTarea} className="btn bg-dark text-white ms-2">AGREGAR</button>
                   
            </div>

            <div className="row" color='black' >
                
                {todos.map((todo) => (
                    <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea}></TodoItem>
                ))}
            </div>

          
        </Fragment>

    );
}
