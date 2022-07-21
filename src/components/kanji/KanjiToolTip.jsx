import { useEffect, useState } from "react";
import './Kanji.scss'

export default function({readArr, defArr}) {
    
    const arrToDivs = (arr) => {
        return arr.map((i, index) => {
            return (
                <div key={index}>
                    {i}
                </div>
            )
        })
    }
    return (
        <div className="kanji-hover">
            {arrToDivs(readArr)}
            {arrToDivs(defArr)}
        </div>
    )
}