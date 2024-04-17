function ListGroup() {
  let items = ["Brasil", "Singapura", "Russia", "Ucrania"];

  return (
    <>
      <h1>List of items</h1>
      {items.length === 0 && <p>No items found!</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className="list-group-item"
            key={item}
            onClick={(event) => console.log(event)}
          >
            {item}
          </li>
        ))}
        ;
      </ul>
    </>
  );
}

export default ListGroup;
