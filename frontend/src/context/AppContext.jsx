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
        let fileContents = ""
        let header = "Syntax Error"
        if (errors.objetive) {
            objetiveErr = errors.objetive[0]
        } 
        if (errors.constraints) {
            constraintsErr = errors.constraints
        }
        console.log(errors)
        if (errors[0]) {
            header = "File Error"
            fileContents = errors[0]
        }
        setModalShow({show: true, header: header, body: {objetiveErr, constraintsErr, fileContents}})
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