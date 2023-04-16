import {createContext, useState } from 'react'

export const FormContext = createContext()

export function FormProvider({children}) {
    const [constraints, setConstraints] = useState([{id: 1, value: ''}])
    const [objetive, setObjetive] = useState('')
    const [radioValue, setRadioValue] = useState('')


    function createConstraint() {
        setConstraints([...constraints, {id: 
            constraints.length > 0 ? constraints[constraints.length - 1].id + 1 : 1,
            value: ''
        } ])
    }

    function deleteConstraint(index) {
        setConstraints(prevConstraints => prevConstraints.filter(constraint => constraint.id !== index))
    }

    return (
        <FormContext.Provider value={
            {
                constraints,
                objetive,
                setRadioValue,
                createConstraint,
                setConstraints,
                deleteConstraint,
                setObjetive}
        }>
            {children}
        </FormContext.Provider>
    )
}