import { useEffect, useState } from "react";
import './Kanji.scss'

export default function({readArr, defArr, visible}) {
    
    const arrToDivs = (arr) => {
        return arr.map((i, index) => {
            return (
                <div key={index}>
                    {i}
                </div>
            )
        })
    }

    const style = () => {
        return {
            visibility: visible ? 'visible' : 'hidden'
        }
    }
    return (
        <div className="kanji-hover" style={style()}>
            <div className="kanji-hover__inner">
                {arrToDivs(readArr)}
                {arrToDivs(defArr)}
            </div>
        </div>
    )
}