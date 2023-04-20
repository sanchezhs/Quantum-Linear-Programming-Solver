import {createContext, useState } from 'react'

export const AppContext = createContext()

export function AppContextProvider({children}) {
    const [constraints, setConstraints] = useState([{id: 1, value: ''}])
    const [objetive, setObjetive] = useState('')
    const [radioValue, setRadioValue] = useState('')
    const [theme, setTheme] = useState('light');
    const [modalShow, setModalShow] = useState({show: false, header: '', body: ''});

    function showErrorModal(error) {
        const { errors } = error.response.data;
        let objetiveErr = ""
        let constraintsErr = ""
        if (errors.objetive) {
            objetiveErr = errors.objetive[0]
        } 
        if (errors.constraints) {
            constraintsErr = errors.constraints
        }
        setModalShow({show: true, header: 'Syntax Error', body: {objetiveErr, constraintsErr}})
    }

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
        <AppContext.Provider value={
            {
                constraints,
                objetive,
                radioValue,
                theme,
                modalShow,
                showErrorModal,
                setModalShow,
                setTheme,
                setRadioValue,
                createConstraint,
                setConstraints,
                deleteConstraint,
                setObjetive}
        }>
            {children}
        </AppContext.Provider>
    )
}