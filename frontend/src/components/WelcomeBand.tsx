import { useNavigate } from "react-router-dom"

function WelcomeBand() {
    const navigate = useNavigate()
    
    return(
        <div>
            <h1>Welcome to the Entertainment Agency Site!</h1>
            <br />
            <button onClick={() => navigate("entertainers")}>Open Entertainer List</button>
        </div>
        
    )
}

export default WelcomeBand