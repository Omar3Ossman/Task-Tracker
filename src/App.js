import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState , useEffect} from 'react'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask,setShowAddTask] = useState(true)
  const [tasks,setTasks] = useState([])

  useEffect(() => {
    const fetchTasks =async () => {
      const res = await fetch ('http://localhost:5000/tasks')
      const data = await res.json()

      console.log (data)
    }
    fetchTasks()
  })
  /* const [tasks,setTasks] = useState(
    [
        {
        id: 1,
        text: 'Doctor Appointment',
        day: 'Feb 5th at 2:30 pm',
        reminder: true
    },
    {
        
        id: 2,
        text: 'Meeting at school',
        day: 'Feb 6th at 1:30 pm',
        reminder: true
    },
    {
        
        id: 3,
        text: 'Food Shopping',
        day: 'Feb 5th at 2:30 pm',
        reminder: false
    },
    ])
*/
//Add Task
const addTask =(task) => {
  const id = Math.floor (Math.random() * 10000) +1
  console.log (id)

  const newTask = {id,...task}
  setTasks([...tasks,newTask])  
}


//Delete Task
const deleteTask = (id) => {
  setTasks (tasks.filter((task => task.id !== id)))
}

  return (
    <div className="container">
      <Header onAdd = {() => setShowAddTask (!showAddTask)}
      showAdd = {showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ?
      <Tasks tasks={tasks} onDelete={deleteTask} /> : 
      'No Tasks to show'}
    </div>
  );
}

export default App;
