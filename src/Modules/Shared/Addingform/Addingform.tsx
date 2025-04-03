import React from 'react'
import Title from '../Title/Title'
import { useForm } from 'react-hook-form'

export default function Addingform() {
    let verb="Add"
    let madeFor="task"

    let 
    useForm({})

  return (

    <div>
      <Title verb={verb} madeFor={madeFor}   ></Title>

      <form></form>
    </div>
  )
}
