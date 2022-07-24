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
            display: visible ? 'block' : 'none'
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