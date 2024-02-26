const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <div>
        filterShownWith: <input onChange={handleFilterChange} />
      </div>
    </div>
  );
};

export default Filter;
