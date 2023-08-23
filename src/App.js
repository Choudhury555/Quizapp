import React from "react"
import Question from "./Question"
import Menu from "./Menu"
import {nanoid} from "nanoid"
import "./App.css"

export default function App(){
    const [questions, setQuestions] = React.useState([]);
    const [count, setCount] = React.useState([]);
    const [checked,setChecked]=React.useState(false);
    const [correct,setCorrect]=React.useState(0);
    const [started,setStarted]=React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const shuffleArray =(arr) => arr.sort(()=> Math.random()-0.5)
    
    React.useEffect(()=> {
        async function getQuestion(){
            const  res=await fetch("https://opentdb.com/api.php?amount=5&category=18&encode=base64")
            const data=await res.json()
            let temp=[]
            // console.log(data)
            data.results.forEach(item => {
                temp.push(
                    {
                        id:nanoid(),
                        answeres:shuffleArray([...item.incorrect_answers,item.correct_answer]),
                        question:item.question,
                        correct:item.correct_answer,
                        selected:null,
                        anschecked:false
                    }
                )
            })
            setQuestions(temp);
        }
        getQuestion()
        
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
    }, 1000);
    },[count])
    
    
    
    function handleClickAnswer(id,answer){
        setQuestions(questions => questions.map(question => {
            return question.id===id ? {...question,selected:answer} : question
        }))
    }
    
    const questionElement=questions.map(question => {
        return (
            <Question 
                key={question.id}
                q={question}
                handleClickAnswer={handleClickAnswer}
                id={question.id}
            />
        )
    })
    
    function handleCheck(){
        let ansSelected=true;
        questions.forEach(question => {
            if(question.selected === null){
                ansSelected=false
                return
            }
        })
        
        if(ansSelected===false){//you have to answer all the question or else you can not proceed
            alert("Answer all the Question")
            return
        }
        setQuestions(questions => questions.map(question => {
            return {...question,anschecked:true}
        }))
        
        setChecked(true)
        
        let correct=0
        questions.forEach(question => {
            if(question.selected === question.correct){
                correct=correct+1
            }
        })
        setCorrect(correct)
    }
    
    function handlePlayAgain(){
        setCount(prevCount => prevCount+1)
        setChecked(false)
    }
    
    
    function start(){
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        
        setStarted(true);
    }
    
    // console.log(questions)
    return (
        <div className='content-container'>
            {
        started ?
        loading ? <div className="loading">
                <div className="spinner-container">
                    <div className="loading-spinner"></div>
                </div> 
                <p>Wait a Second</p>
            </div>
             :
            <div className="start-content-container">
                {questionElement}
                <div className="end-div">
                    {checked && <span className="score">You scored {correct}/5 correct answers</span>}
                    <button className="check" onClick={checked ? handlePlayAgain : handleCheck}>{checked ? "Play Again" : "Check Aswer"}</button>
                </div>
            </div>
            
            :
            <Menu 
                start={start}
            />
        }
        </div>
    )
}