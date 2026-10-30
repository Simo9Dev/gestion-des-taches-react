import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
export default function Checklist() {
  const [task, setTask] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
    const [recource, setRecource] = useState("");
  const [date_db, setDate] = useState("");
   const [date_fin, setDate_fin] = useState("");
   const [statut, setStatut] = useState("en cours");
   const [texts, setTexts] = useState("");
   

   const[edit_index,setEdit]= useState(null);
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(task));
}, [task]);
function retard(item){
  const this_day = new Date().toLocaleDateString("en-CA");
if ( item.statut !== "done"){
  return this_day > item.date_fin;
}}
function cherche(index){

}

  function addItem() {
    if (text.trim() === "") {
      return;
    }


    const newTask = { 
      text: text, 
      done: false ,
      date_db : date_db,
      date_fin : date_fin,
      recource : recource,
      statut : statut,
      texts : texts
    };
    if (edit_index === null){
      setTask([...task, newTask]);
    }else{
      const updatelist = task.map((item,index)=>{
        if(index === edit_index){
          return newTask;
        }
        return item;
      })
      setTask(updatelist);
      
    }

    

    setText("");
    setDate("");
    setDate_fin("");
    setEdit(null)
  }

  function toggleItem(indexToToggle) {
    const updatedtask = task.map((item, index) => {
      if (index === indexToToggle) {
        return { ...item, done: !item.done }; 
      }
      return item; 
    });

    setTask(updatedtask);
  }

  function deleteItem(indexToDelete) {
    const updatedtask = task.filter((item, index) => {
      return index !== indexToDelete;
    });

    setTask(updatedtask);
  }
   function modifier(indexTomodifier) {
  const item = task[indexTomodifier]
  setText(item.text);
  setDate(item.date_db);
  setDate_fin(item.date_fin);
  setRecource(item.recource);
  setEdit(indexTomodifier);
  setStatut(item.statut);
      
        
      }
  const data = [
    { name: "To Do", value: task.filter((t) => t.statut === "To Do").length },
    { name: "en cours", value: task.filter((t) => t.statut === "en cours").length },
    { name: "done", value: task.filter((t) => t.statut === "done").length },
  ];
  const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];
   return (
    <>
   
  <div className="box">
    <div className="analyse">
      <h3>Analise des taches:</h3>
     
       <p><strong>Nombre de taches: {task.length}</strong></p>
       <p><strong>Taches done: {task.filter((t) => t.statut === "done").length}</strong></p>
        <p><strong>Taches en cours: {task.filter((t) => t.statut === "en cours").length}</strong></p>
     <p><strong>Taches To do: {task.filter((t) => t.statut === "To Do").length}</strong></p>

       <p><strong>Retard taches: {task.filter(retard).length}</strong></p>
     </div>
    <div className="taches">
      <h2>Checklist</h2>

      <label For="tache">Nom de Tache :</label><input
        type="text" id="tache"
        value={text}
        onChange={(e) => setText(e.target.value)}
      /> 
        <br /><br /> <label For="tache">date debut:</label><input
        type="date"
        value={date_db}
        onChange={(e) => setDate(e.target.value)}
      />
      <br /><br /> <label For="tache">date fin:</label><input
        type="date"
        value={date_fin}
        onChange={(e) => setDate_fin(e.target.value)}
      />
        <br /><br /> <label For="tache">Recource:</label><input
        type="text"
        value={recource}
        onChange={(e) => setRecource(e.target.value)}
      />
<label For="st">STATUT :</label><select
id="st"
          onChange={(e) => setStatut(e.target.value)}
          value={statut}
          ><option value="en cours" >en cours</option>
          <option value="done"  >done</option>
          <option value="To Do"  >To do</option>
          </select>
      <br /><button onClick={addItem} class="btn1">Add</button><br />
      <label For="cherche">Cherche :</label><input type="text" value={texts} onChange={(e)=> setTexts(e.target.value)} />
         <table border ="1">
      <tr>
        <th>tache</th>
        <th>date debut</th>
        <th>date fin</th>
        <th>Recource</th>
        <th>statut</th>
        <th>Action</th>
        <th>Modifier</th>
        
        </tr>
       
   {task.map((item, index) => {
  if (!item.text.toLowerCase().includes(texts.toLowerCase())) {
    return null;
  }
  return (
    <tr key={index} style={{ backgroundColor : retard(item) ? "red" : "white" }}>
      <td>{item.text}</td>
      <td>{item.date_db}</td>
      <td>{item.date_fin}</td>
      <td>{item.recource}</td>
      <td>{item.statut}</td>
      <td><button onClick={() => deleteItem(index)}>delete</button></td>
      <td><button onClick={() => modifier(index)}>modifier</button></td>
    </tr>
  );
})}
      </table>
    </div>

        
     
    <div className="chart">
      <h2>Task piechart</h2>
     {task.length > 0 && (
          <PieChart width={350} height={300}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
    </div>
    </div>
    </>
  );
}
      


 
  
