import { useState, useEffect } from "react"
import "./index.css"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import phonebookService from "./service/phonebook"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showNewName, setShowNewName] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filteredPersonList = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    if (event.target.value === "") {
      setPersons(persons)
    } else {
      setPersons(filteredPersonList)
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    }
    const personExists = checkSamePersonExists(newName)
    if (personExists) {
      const replaceNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (replaceNumber) {
        phonebookService
          .update(newPerson)
          .then()
          .catch((error) => {
            if (error.response.status === 404) {
              setError(
                `Information of ${newPerson.name} has already been removed from server`
              )
              setTimeout(() => {
                setError("")
              }, 5000)
            }
          })
      }
      return
    }
    phonebookService
      .create(newPerson)
      .then((response) => {
        if (response.status === 201) {
          setShowNewName(newName)
          setTimeout(() => {
            setShowNewName("")
          }, 5000)
          setPersons(persons.concat(newPerson))
        }
      })
      .catch((error) => error.response)
  }

  const checkSamePersonExists = (name) => {
    for (const person of persons) {
      if (person.name === name) {
        return true
      }
    }
  }

  const deletePhoneData = (deletedPerson) => {
    const res = window.confirm(`Delete ${deletedPerson.name}`)
    if (res) {
      phonebookService.deleteNumber(deletedPerson.id).then((response) => {
        if (response.status === 200) {
          const newList = persons.filter(
            (person) => person.id !== deletedPerson.id
          )
          setPersons(newList)
        }
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {showNewName !== "" && (
        <h3 className="showAddedPerson">Added {showNewName}</h3>
      )}
      {error !== "" && <h3 className="showError">{error}</h3>}
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} deletePhoneData={deletePhoneData} />
    </div>
  )
}

export default App
