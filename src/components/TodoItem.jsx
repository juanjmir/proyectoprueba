import React from 'react'
export function TodoItem({todo, cambiarEstado}){

    const {id, task, des, importancia} = todo;

    const fnCambiarEstado = () => {
        cambiarEstado(id);
    }

    return <div id="principal" className="card bg-warning text-dark m-2" style={{width:'15rem'}}>
        <div className="card-body ">
        <div className="card-header">{task} <button className="btn bg-warning ms-2 text-dark mb-1" onClick={fnCambiarEstado}>X</button></div>
        <div className="card-body"> {des}
        <hr/>
        {importancia}
    
        </div>
        </div>
        </div>
    
}
