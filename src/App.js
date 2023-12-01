import { useEffect, useState } from 'react';
import './App.css';
import { Container } from './components/Container';
import { TaskCreator } from './components/TaskCreator';
import { TaskTable } from './components/TaskTable';
import VisibilityControl from './components/VisibilityControl';

function App() {
  const [tasksItems, setTasksItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  function createNewTask(taskName) {
    if (!tasksItems.find(task => task.name === taskName)) {
      setTasksItems([...tasksItems, { name: taskName, done: false }]);
    }
  };

  const cleanTasks = () => {
    setTasksItems(tasksItems.filter(task => !task.done));
    setShowCompleted(false);
  };

  const toggleTask = task => {
    setTasksItems(
      tasksItems.map(t => (t.name === task.name) ? { ...t, done: !t.done } : t)
    );
  };

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data) {
      setTasksItems(JSON.parse(data));
    }
  }, []); //este useEffect se ejecuta apenas la app cargue

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksItems)); //guarda un item en localstorage en forma de string o JSON que es igual para este caso
  }, [tasksItems]); //este useEffect se ejecuta cada vez q cambia la variable q va dentro de []

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={tasksItems} toggleTask={toggleTask} />
        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />

        {showCompleted && (
          <TaskTable tasks={tasksItems} toggleTask={toggleTask} showCompleted={showCompleted} />
        )}
      </Container>
    </main>
  );
}

export default App;
