import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initalPersons => {
        setPersons(initalPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.reduce((acc, person) => 
      acc || person.name === newName, false)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        }) 
    }
  }
  
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }
    

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  
  const personsToShow = newFilter 
    ? persons.filter(person => 
      person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
        <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new entry</h2>
        <PersonForm
          handleSubmit={addPerson}
          name={newName}
          handleNameChange={handleNameChange}
          number={newNumber}
          handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App

