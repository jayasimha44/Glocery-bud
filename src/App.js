import React, { useEffect, useState } from "react";

import Alert from "./Alert";
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  }
  return [];
};
const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({ show: true, msg: "Please Enter Item" });
    } else if (name && isEditMode) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditMode(false);
      setAlert({ show: true, msg: "Item Updated!" });
    } else {
      const id = new Date().getTime().toString();
      setList([...list, { id, name }]);
      setAlert({ show: true, msg: "Item Added!", type: "success" });
      setName("");
    }
  };

  const clearAll = () => {
    setList([]);
    if (list.length <= 0) {
      setAlert({ show: true, msg: "No Items Found!", type: "danger" });
    } else {
      setAlert({ show: true, msg: "All Items Deleted!", type: "danger" });
    }
  };

  const closeAlert = () => {
    setAlert({
      show: false,
    });
  };

  const deleteHandler = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    setAlert({ show: true, msg: "Item Deleted!", type: "danger" });
  };

  const editHandler = (id) => {
    const selectedItem = list.find((item) => item.id === id);
    setIsEditMode(true);
    setEditId(id);
    setName(selectedItem.name);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="container">
      <article className="card">
        <form className="glocery-form" onSubmit={submitHandler}>
          {alert.show && <Alert alert={alert} closeAlert={closeAlert} />}
          <h3 className="text-center">Glocery Bud</h3>
          <div className="input-group">
            <input
              type="text"
              placeholder="Add Glocery Items"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-primary">
              {isEditMode ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        <br />
        {list.length > 0 && (
          <ul className="list-group">
            <List
              list={list}
              removeItem={deleteHandler}
              editHandler={editHandler}
            />
          </ul>
        )}
        <button className="btn btn-outline" onClick={clearAll}>
          Clear All
        </button>
      </article>
    </section>
  );
};

export default App;
