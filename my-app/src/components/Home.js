import { Link } from "react-router-dom";
function Home() {
    return (
      <div>
        <h1>This is the home page</h1>
        <Link to="activities">Activities</Link>
        <br></br>
      <Link to="goals">Goals</Link>
      </div>
    );
  }
  
  export default Home;