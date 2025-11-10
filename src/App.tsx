import { useEffect, useState } from 'react'
import type { Task } from './types'



 export function useLocalStorage(){
  const [tasks,setTasks] =  useState<Task[]>(() => {
    const data = localStorage.getItem('tasks')
    return data ? JSON.parse(data) : [];
  });

    useEffect (()=> { localStorage.setItem('tasks', JSON.stringify(tasks))}, [tasks]);
    return { tasks,setTasks};
  }
  

function App(){
	const [input, setInput] = useState('')
	const {tasks, setTasks} = useLocalStorage();

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')

 

	function addTask (){
		const inputFree = input.trim();
		if ( inputFree === '') return;
		const newTask: Task = {
			id: Date.now(),
			text: inputFree,
			done: false
		}
		setTasks([newTask, ...tasks])
		setInput('')
	}

	const toggleTask = (id: number) => {
		setTasks(tasks.map( t => 
				t.id === id ? {...t, done: !t.done} : t
			)
		)
	}
	const removeTask = (id: number) => {
		setTasks(
			tasks.filter(task => task.id !== id)
		)
	}
  const startEditingTask = (id: number, newText: string) => {
    setEditingId(id);
    setEditingText(newText);
  }

  //Verifica el text, luego sobreescribe(edita) el task 
  const saveEditingTask = (id: number) => {
    const trimm = editingText.trim();
    if(trimm == '') return;
   setTasks(tasks.map(task => (task.id === id ? { ...task, text: trimm } : task)));
   setEditingId(null);
   setEditingText('');

  }

  //Cancelar task 
  const cancelEditingTask = () => {
    setEditingId(null);
    setEditingText('');
  }

  //Contador de task 
  const countTask = () => {
     return tasks.filter(t => !t.done).length
  }

  const countTaskComplet = () => {
    return tasks.filter(t => t.done ).length;
  }




  

	return (
		<div>
			<h1> To-Do List </h1>
 
			<br/>
			<div>
				<input
					 type="text"
					 placeholder="Nueva tarea..."
					 value={input}
					 onChange={e => setInput(e.target.value)}
				/>
				<button onClick={addTask}> Agregar Tarea </button>
			</div>
			<div>
				<ul className="lista-tareas">
					{tasks.length === 0 && (
						<li> No hay Tareas aún.</li>
					)}
          <h3>Tareas pendientes: {countTask()} | Tareas Completas: {countTaskComplet()}</h3>
					{tasks.map(task => (
						<li key={task.id} className="linea-tarea">

              {editingId === task.id ? (
                <div className="editando">
                      <input
                          type="text"
                          value={editingText}
                          onChange={e => setEditingText(e.target.value)}
                          onKeyDown={e => {
                              if (e.key === 'Enter') saveEditingTask(task.id)
                              if (e.key === 'Escape') cancelEditingTask()
                          }}
                          autoFocus
                      />

                      <button onClick={()=> saveEditingTask(task.id)}>Guardar</button>
                      <button onClick={cancelEditingTask}>Cancelar</button>
                      
                </div>



                  ) : (
                        <div className='visualizacion'>
                          
                          <span 
                              className={task.done ? 'done' : ''}
                              onClick={ () => toggleTask(task.id) }
                              title="Marcar como completada"
                              > 
                              {task.text}  
                            </span>
                          
                          <div>

                                  <button onClick={() => startEditingTask(task.id, task.text)} title="Editar Tarea">Editar </button>
                                  <button onClick={ () => removeTask(task.id)}>Eliminar</button>
                          </div>
                      </div>
              )}


						</li> 
          ))}
				</ul>
			</div>

		</div>
	)
}

export default App;