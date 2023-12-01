import React, { useState } from 'react';

export const TaskCreator = ({ createNewTask }) => {
    const [newTaskName, setNewTaskName] = useState('');

    //e es para recibir el evento del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); //esta linea es para que no se refresque la pag despues de enviar
        createNewTask(newTaskName)
        setNewTaskName('');
    };

    return (
        <form onSubmit={handleSubmit} className='my-2 row' >
            <div className='col-9'>
                <input
                    type='text'
                    value={newTaskName}
                    placeholder='Enter a new task'
                    onChange={(e) => setNewTaskName(e.target.value)}
                    className='form-control'
                />
            </div>
            <div className='col-3'>
                <button className='btn btn-primary btn-sm' >Save Task</button>
            </div>
        </form>
    )
}