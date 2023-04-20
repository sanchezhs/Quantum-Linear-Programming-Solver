import { useContext } from 'react'
import { ScrollContext } from '../../context/ScrollContext'

function Qaoa() {

    const { firstRef } = useContext(ScrollContext)

  return (
    <>
    <h3 ref={firstRef}>Qaoa</h3>
    <p>explicar un poco c&oacute;mo funciona qaoa y la web, se podra usar cuenta en ibm...</p>
    </>
  )
}

export default Qaoa