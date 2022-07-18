import { Link } from "react-router-dom"

export default function({
    numIncompleteTasks
}) {
    
    const renderText = () => {
        const word = numIncompleteTasks === 1 ? 'task' : 'tasks'
        return <div>{numIncompleteTasks} {word} remaining</div>
    }

    return (<div>
        {renderText()}
        <Link to="/followers">checkout</Link>
    </div>)
}