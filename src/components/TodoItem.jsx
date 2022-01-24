import React from 'react'

export function TodoItem({todo, cambiarEstado}){

    const {id, task, des, completed} = todo;

    const fnCambiarEstado = () => {
        cambiarEstado(id);
    }

    return <td>
        <input bcolor="blue" type="checkbox" onChange={fnCambiarEstado} checked={completed} className="form-check-input me-2"></input>
        {task}<br/>{des}</td>
}
