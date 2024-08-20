import { useEffect, useState } from "react";
import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoDate } from "./TodoDate";
import { TodoList } from "./TodoList";
import { getLocalStorageTodoData, setLocalStorageTodoData } from "./TodoLocalStorage";




export const Todo = () =>
{
    
    const[task,setTask]=useState(() =>getLocalStorageTodoData());
        
    const handleFormSubmit=(inputValue)=>
    {
        const{id,content,checked}=inputValue;

        // check content empty or not
        if(!content) return;

        //Check whether the data exist or not
        //if(task.includes(inputValue))return;
        const ifTodoContentMatched =task.find((currTask) => currTask.content === content);

        if(ifTodoContentMatched) return;
        setTask((prevTask)=>[...prevTask,{id:id,content:content,checked:checked}, ]);

    };

// todo date and time

// delete the single element in the to do list
const handleDeleteTodo = (value) =>{
    // console.log(task);
    // console.log(value);
    const updateTask = task.filter((Ele)=> Ele.content !== value)
    setTask(updateTask);
};

// clear all the to do list
const handleClearTodoData=() =>
{
    setTask([]);
}
 
// todo handle check functionality

const handleCheckTodo =(content) =>
{
    const updateTask =task.map((currTask)=>{
        if(currTask.content === content)
            return{...currTask,checked:!currTask.checked};
        
        else{
            return currTask;
        }
    
    });
    setTask(updateTask);
};

//ad data to the local storage
setLocalStorageTodoData(task)

    return (
        <section className="todo-container">
        <header>
            <h1> To do list</h1>
                <TodoDate/>
            </header>
            <TodoForm onAddTodo={handleFormSubmit}/>
        <section className="myUnOrdList">
            <ul>
                {
                    task.map((Ele)=>
                    {
                        return <TodoList 
                        key={Ele.id} 
                        data={Ele.content} 
                        checked = {Ele.checked}
                        onHandleDeleteTodo={handleDeleteTodo} 
                            onHandleCheckedTodo = {handleCheckTodo}

                        />
                    })
                }
            </ul>
        </section>
        <section>
            <button className="clear-btn" onClick={handleClearTodoData}> clear all</button>
        </section>
    </section>
        
    );

};