import React from "react"

export default function Menu(props){
    // console.log(props)
    return(
        <div className="menu">
            <h1 className='page-title'>QUIZ KHELO</h1>
            <span className='page-description'>Use your Mind and Enjoy</span>
            <button className='start-button' onClick={()=>props.start()}>Start QUIZ</button>
        </div>
    )
}