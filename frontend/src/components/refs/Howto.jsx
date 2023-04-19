import {useContext} from 'react'
import { ScrollContext } from '../../context/ScrollContext'
import '../../main.css'

function Howto() {

  const { secondRef } = useContext(ScrollContext);

  return (
    <>
    <h3 ref={secondRef} >How to
      {" "}
      <small  className="text-muted">Files and syntax</small>
    </h3>
    <p>
      To submit more than five constraints, write them in a text file and
      upload it in the drag and drop zone. You can use either minimization
      or maximization, but make sure to follow the syntax provided in the
      example below:
    </p>
      <pre className='shadow p-3 mb-5 bg-body-tertiary' style={{width: "55%"}}>
      <code>
        <h6><strong>min:</strong>{" "}f(x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>m</sub>)</h6>
        <h6><strong>subject to:</strong></h6>
        <ul>
          <li>constraint 1</li>
          <li>constraint 2</li>
          <li>...</li>
          <li>constraint n</li>
        </ul>
      </code>
      </pre>
      <pre className='shadow p-3 mb-5 bg-body-tertiary' style={{width: "55%"}}>
      <code>
        <h6><strong>max:</strong>{" "}f(x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>m</sub>)</h6>
        <h6><strong>subject to:</strong></h6>
        <ul>
          <li>constraint 1</li>
          <li>constraint 2</li>
          <li>...</li>
          <li>constraint n</li>
        </ul>
      </code>
      </pre>
  </>

  )
}

export default Howto