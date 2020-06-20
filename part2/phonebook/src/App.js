import React, { useState } from 'react'

const Person = ({ name }) => {
  return (
    <div>
      {name}<br />
    </div>
  )
}
const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
      <Person key={person.name} name={person.name} />
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    {name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:<input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Persons persons={persons} />
    </div>
  )
}

export default App

