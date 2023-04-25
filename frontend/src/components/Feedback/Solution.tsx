import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Solution() {
  const { solution } = useContext(AppContext);
  let constraints = [];


  if (solution) {
    return (
      <>
        <h3>Solution</h3>
        <h6>Objetive</h6>
        <p>{solution[0]}</p>
        <h6>Constraints</h6>

      </>)
    
  }
  return <></>
}

export default Solution;
