const Persons = ({ persons, deletePhoneData }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePhoneData(person)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Persons
