import { useState } from 'react'

type Constraint = {
    id: number;
    value: string;
}




function createConstraint(constraints: Constraint[], setConstraints: React.Dispatch<React.SetStateAction<Constraint[]>>) {
    setConstraints([
      ...constraints,
      {
        id:
          constraints.length > 0
            ? constraints[constraints.length - 1].id + 1
            : 1,
        value: "",
      },
    ]);
  }
  
  function deleteConstraint(index: number, constraints: Constraint[], setConstraints: React.Dispatch<React.SetStateAction<Constraint[]>>) {
    setConstraints((prevConstraints) =>
        prevConstraints.filter((constraint) => constraint.id !== index)
    );
  }
  
export function Logic() {
    const [constraints, setConstraints] = useState<Constraint[]>([]);
    return (
        <div>Logic</div>
    )
}

  