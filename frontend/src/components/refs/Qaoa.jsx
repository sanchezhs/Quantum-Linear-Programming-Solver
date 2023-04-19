import { useContext } from 'react'
import { ScrollContext } from '../../context/ScrollContext'

function Qaoa() {

    const { firstRef } = useContext(ScrollContext)

  return (
    <>
    <h3 ref={firstRef}>Qaoa</h3>
    </>
  )
}

export default Qaoa