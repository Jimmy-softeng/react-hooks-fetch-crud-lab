import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[question,setQuestion]=useState([]);
  //fetches question when component is rendering
 useEffect(()=>{
  fetch("http://localhost:4000/questions")
  .then((response)=>(response.json()))
  .then((data)=>setQuestion(data))
  .catch((error)=>console.error("Error fetching questions:",error));
  
 },[]);
 //function delete function
  function handleDeleteQuestion(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE",
    })
    .then(()=>{
      setQuestion((prevQuestions)=>prevQuestions.filter((question)=>question.id !==id));
    })
    .catch((error)=>console.error("Error deleting question:", error));
  }
 //handling a new question
 function handleAddQuestion(newQuestion){
  setQuestion(function(prevQuestions){
    return [...prevQuestions,newQuestion]
  })
 }
 // Handle updating a question's correct answer
 function handleUpdateCorrectAnswer(id,correctIndex){
   fetch(`http://localhost:4000/questions/${id}`,{
    method:"PATCH",
    headers:{
      "Content-Type": "application/json",
    },
    body:JSON.stringify({correctIndex,}),
   })
   .then((response)=>response.json())
   .then((updateQuestion)=>{
    setQuestion((prevQuestions)=>prevQuestions.map((question)=>question.id===id?updateQuestion:question))
    
   })
   .catch((error)=>console.error("Error updating correct answer:", error));
 };
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : <QuestionList
      question={question} 
      onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
      onDeleteQuestion={handleDeleteQuestion}/>}
    </main>
  );
}

export default App;
