const Form = ({ onSubmit, handleNameChange, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
