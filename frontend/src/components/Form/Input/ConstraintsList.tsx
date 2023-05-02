import {useContext} from 'react'
import {AppContext} from '../../../context/AppContext'
import { Constraint } from './index'
import Form from "react-bootstrap/Form";

export function ConstraintsList() {

    const { constraints } = useContext(AppContext)


  return (
    <div > 
      {constraints.length > 0 && <Form.Label>Subject to:</Form.Label>}
      {constraints.map((constraint) => (
        <Constraint key={constraint.id} constraint={constraint} />
      ))}
    </div>
  )
}
