import React, {useState,useEffect,}from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({question,onDeleteQuestion,onUpdateCorrectAnswer}) {
  const[questions,setQuestions]=useState([])
// Fetch questions from the server when the component mounts
useEffect(() => {
  fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((data) => setQuestions(data))
    .catch((error) => console.error("Error fetching questions:", error));
}, []);
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {questions.map((question)=>(<QuestionItem 
        key={question.id}
        question={question}
        onDeleteQuestion={onDeleteQuestion}
        onUpdateCorrectAnswer={onUpdateCorrectAnswer}
        />))}
      </ul>
    </section>
  );
}

export default QuestionList;
