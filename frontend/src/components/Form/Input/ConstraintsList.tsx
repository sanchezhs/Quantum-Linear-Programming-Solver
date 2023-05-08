import {useContext} from 'react'
import {AppContext} from '../../../context/AppContext'
import { Constraint } from './index'
import Form from "react-bootstrap/Form";
import { ConstraintAction, ConstraintType } from './Logic'

interface ConstraintsListProps {
  constraints: ConstraintType[];
  dispatch: React.Dispatch<ConstraintAction>;
}


export function ConstraintsList({ constraints, dispatch }: ConstraintsListProps) {

    //const { constraints } = useContext(AppContext)
    console.log(constraints)

  return (
    <div > 
      {constraints.length > 0 && <Form.Label>Subject to:</Form.Label>}
      {constraints.map((constraint) => (
        <Constraint key={constraint.id} constraints={constraints} constraint={constraint} dispatch={dispatch}/>
      ))}
    </div>
  )
}
