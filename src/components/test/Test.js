import React, {useState} from 'react'

export default function Test() {
    let [text, setText] = useState(null)
    const printText = ()=> {
        setText('this should appear after 1 secs')
    }

    return (
        <div>
            <button onClick={()=> setTimeout(printText, 1000)}>Put Text Below</button>
            <p>{text}</p>
        </div>
    )
}
