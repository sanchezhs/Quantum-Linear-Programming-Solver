import {useContext} from 'react'
import {AppContext} from '../../context/AppContext'
import Constraint from './Constraint'
import Form from "react-bootstrap/Form";

function ConstraintsList() {

    const { constraints } = useContext(AppContext)


  return (
    <div> 
      {constraints.length > 0 && <Form.Label>Subject to:</Form.Label>}
      {constraints.map((constraint) => (
        <Constraint key={constraint.id} constraint={constraint} />
      ))}
    </div>
  )
}

export default ConstraintsList