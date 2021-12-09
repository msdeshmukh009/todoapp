import React, { useState } from "react";

import './App.css';

// class App extends React.Component {

//   constructor(props){
//     super(props);
//     this.state = {
//       newItem:"",
//       list : [],
      
//     }
//   }

//   addItem(todoValue){
//     if(todoValue !== ""){
//       const newItem = {
//         id: Date.now(),
//         value: todoValue,
//         isDone: false,
//         custom:"span"
//       };
//       const list = [...this.state.list];
//       list.push(newItem); 

//       this.setState({
//         list,
//         newItem:""
//       });
//     }
//   }

//   deleteItem(id){
//     const list = [...this.state.list];
//     const updatedList = list.filter(item => item.id !==id);

//     this.setState({
//       list:updatedList,
//     })
//   }

//   updateInput(input){
//     this.setState({newItem:input})
//   }

//   updateStatus(id){
//     const list = [...this.state.list];
   
//     for(let i=0; i<list.length;i++){
//       if(list[i].id === id){
//         list[i].isDone=!list[i].isDone;
//         list[i].custom = list[i].isDone ? 's':'span';
//       }
//     }
    
//     this.setState({
//       list:list,
//     })
//   }
//   render(){
//     return(
//       <div className="App">
//         <h1 className="app-title">ToDo App</h1>
//         <div className="container">
        
//           <br />
//           <input 
//           type="text"
//           className="input-text"
//           placeholder="Add the task..." 
//           required
//           value={this.state.newItem}
//           onChange={(e)=>this.updateInput(e.target.value)}
//           />
          
//           <button
//           className="btn"
//           onClick={()=>{this.addItem(this.state.newItem)
          
//           }}
//           disabled={!this.state.newItem.length}
//           >
//             add toDo
//           </button>
         
//           <div className="list">
//             <ul>
//              {
//                this.state.list.map(item=>{
//                  return (
                   
//                  <li key={item.id}>
//                    <input 
//                    type="checkbox" 
//                    name="isDone" 
//                    onChange={()=>{
//                      this.updateStatus(item.id)
//                     }}
//                    />
//                    <item.custom>{item.value}</item.custom> 

//                    <button
//                     className="btn"
//                     onClick={()=>this.deleteItem(item.id)}
//                     >delete</button>
//                   </li>)
//                })
//              }
//             </ul>
//           </div>

//         </div>
//       </div>

//     )
//   }
// };

function App(){
  const [list,setList] = useState([]);
  const [task,setTask] = useState("");

  const updateList = (todoValue) =>{
    if(todoValue !== undefined && todoValue !==""){
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false,
        custom:"span"
      }
      setList([...list,newItem])
      setTask("")
    }
  };

  const deleteItem = (id) =>{
    const updatedList = list.filter(item=>item.id!==id);
    setList(updatedList);
  }

  const updateStatus = (id) =>{
    let tempList = [...list];
   
    for(let i=0; i<tempList.length;i++){
            if(tempList[i].id === id){
              tempList[i].isDone=!tempList[i].isDone;
              tempList[i].custom = tempList[i].isDone ? 's':'span'; 
            }
          }
          setList(tempList);
  }

  return(
    <div>
      <h1 className="app-title">ToDo</h1>
      <div>
      <input 
          type="text"
          className="input-text"
          placeholder="Add the task..." 
          required
          value={task}
          onChange={(e)=>setTask(e.target.value)}
      />
      <button 
      onClick={()=>updateList(task)}
      className="btn"
      >
        add toDo
      </button>
      </div>
      <ul>
        {
          list.map(item=>{
            return(
              <li key={item.id}>
                <input 
                type="checkbox"
                onChange={()=>updateStatus(item.id)}
                />
                <item.custom>{item.value}</item.custom>
                <button
                    className="btn"
                    onClick={()=>deleteItem(item.id)}
                    >delete
                </button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App;