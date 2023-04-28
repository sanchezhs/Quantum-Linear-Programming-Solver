import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Solution() {
  const { solution } = useContext(AppContext);

  console.log(solution);
  if (solution.length>0) {
    return (
      <>
        <h4>Solucion</h4>
        {   <p> {solution[0]} </p> }

        <h4>Sin restricciones</h4>
        {   <p> {solution[1]} </p> }
      </>
    );
  }
  return <></>;
}

export default Solution;
