"use client"


interface ButtonProps{
    clNames : string,
    onClick : Function
    content : any
}


function Button({clNames, onClick, content}:ButtonProps){
    return <button className={clNames} onClick={() => onClick()} >{content}</button>
}

export default Button;