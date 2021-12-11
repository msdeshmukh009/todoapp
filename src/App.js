import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './App.css';


function App(){
  const [list,setList] = useState([]);
  const [task,setTask] = useState("");
  const [message,setMessage] = useState("");
  const [description,setDescription] = useState("");
  const [formVisible,setFormVisible] = useState(false);
  

  const formDisplay = () =>{
    setFormVisible(!formVisible)
  }

  const submitBtnHandler = (e)=>{
    e.preventDefault();
    updateList(task,description);
  }

 

  const updateList = (todoValue,descriptionValue) =>{
    
    if(todoValue !== undefined && todoValue !==""){
      setMessage('')
      const newItem = {
        id: uuidv4(),
        description:descriptionValue,
        value: todoValue,
        detailsStatus:false,
        complitionStatus:'pending' 
      }
      setList([...list,newItem])
      setTask("")
      setDescription("")
    }else{
      setMessage("add something maybe :(")
    }
  };

  const deleteItem = (id) =>{
    const updatedList = list.filter(item=>item.id!==id);
    setList(updatedList);
  }

  const updateDetailsStatus = (id) =>{
    let tempList = [...list];

    for(let i=0; i<tempList.length;i++){
      if(tempList[i].id === id){
        tempList[i].detailsStatus=!tempList[i].detailsStatus; 
      }
    }
    setList(tempList);
  }

  const setComplitionStatus = (status,id) =>{
    let tempList = [...list];

    for(let i=0; i<tempList.length;i++){
      if(tempList[i].id === id){
        tempList[i].complitionStatus=status; 
      }
    }
    setList(tempList);
  }

  return(
    <div>
      <h1 className="app-title">ToDo</h1>
      <button 
      className="btn"
      onClick={()=>formDisplay()}>
        {formVisible?"-":"+"}
      </button>

      <form 
      style={{display:formVisible?'block':'none'}}
      >
        <span 
        onClick={()=>formDisplay()}
        className="close">
          x
        </span>
      <input 
          type="text"
          className="input-text"
          placeholder="Add the task..." 
          value={task}
          onChange={(e)=>setTask(e.target.value)}
      />

      <input 
      placeholder="add description..."
      className="input-text"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      type="text" />

      <button 
      onClick={(e)=>submitBtnHandler(e)}
      type="submit"
      className="btn"
      >
        add toDo
      </button>
      </form>

      <p>{message}</p>

      <ul className="list">
        {
          list.map((item,index)=>{
            return(
              <li 
              style={{
                border:'2px solid' ,
                backgroundColor:item.complitionStatus==='pending'?
                'lightpink': item.complitionStatus === 'doing'?
                'lightyellow': item.complitionStatus === 'done'?
                'lightgreen':'white'
              }}
              className="card"
              key={item.id}>
                
                <p 
                style={{textDecoration:item.complitionStatus==='done'
                ?'line-through':'',
                width:'50%',
                margin: 'auto',
                marginTop:'2rem',
                display:"inline",
                fontWeight:'bold'
                }}>
                  {item.value}
                </p>

                <div>
                <label>status:</label>
                <select onChange={(e)=>setComplitionStatus(e.target.value,item.id)}>
                  <option default value="pending">pending</option>
                  <option value="doing">doing</option>
                  <option value="done">done</option>
                  
                  
                  
                </select>
                </div>

                <button
                className="btn extend-btn"
                onClick={()=>updateDetailsStatus(item.id)}
                >
                <img 
                src={item.detailsStatus?
                'keyboard_double_arrow_up_black_24dp.svg':
                'keyboard_double_arrow_down_black_24dp.svg'} 
                alt="details"  />
                </button>
                <div>
                  <p
                  style={{
                    display:item.detailsStatus?'block':'none',
                    backgroundColor:'white'
                }}
                  >{item.description?item.description:'no description'}</p>
                </div>
                <button
                    className="btn delete"
                    onClick={()=>deleteItem(item.id)}
                    ><img src="delete_black_24dp.svg" alt="delete" />
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