import React from "react"

export default function Question(props){
    
    // console.log(props)
    let answeres=props.q.answeres
    
    function handleClick(answer){
        if(props.q.anschecked===true){
            return
        }
        props.handleClickAnswer(props.id,answer)
    }
    
    const answrelement=answeres.map(answer => {
        
        let id=null
        if(props.q.anschecked===true){
            if(answer === props.q.correct){
                id="correct"
            }
            else if(answer === props.q.selected){
                id="incorrect"
            }
            else{
                id="not_selected"
            }
        }
        
        return (
            <button id={id} className={answer===props.q.selected ? "answer selected" : "answer"} onClick={() => handleClick(answer)}>{atob(answer)}</button>
        )
    })
    
    
    
    return (
        <div className="question-container">
        <p className="question-title">{atob(props.q.question)}</p>
            {answrelement}
            <hr/>
        </div>
    )
}