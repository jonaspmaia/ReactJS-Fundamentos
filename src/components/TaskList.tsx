import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    //Se nao tiver titulo ja retorna e nao executa o resto
    if (!newTaskTitle) return

    //Criar uma nova task com id Random, titulo com texto inserido no Input e iscomplete falso
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    //Altera array tasks para tasks mais a newTask
    setTasks(tasks => [...tasks, newTask])
    //Altera o valor de newTaskTitle para nada, limpando o input
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    //Pega todas as task e as que tem o mesmo id altera-se o isComplete dela para o contrario do que ja esta, se nao tiver nenhuma com aquele id mantem tudo igual
    const mapedTask = tasks.map(tasks => tasks.id === id ? {
      ...tasks, isComplete: !tasks.isComplete
    } : tasks)

    //Adiciona o que foi alterado para o array de tasks
    setTasks(mapedTask)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //Pega todas as task e as que tiver o id diferte do id passado se mantem
    const filteredTask = tasks.filter(tasks => tasks.id !== id)

    //Adiciona o que foi alterado para o array de tasks
    setTasks(filteredTask)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}