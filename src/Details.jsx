import React from 'react'
import { useParams } from "react-router-dom"
 function Details() {
    //pulls id from context which comes from browser router component in jsc ie requires browser router 
    const { id } = useParams();
  return (
    <div>hi!</div>
  )
}
export default Details; 
