import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ list, removeItem, editHandler }) => {
  return (
    <>
      {list &&
        list.map((item) => {
          return (
            <li className="list-group-item">
              <h5 key={item.id}>{item.name}</h5>
              <p>
                <button
                  className="btn btn-primary"
                  onClick={() => editHandler(item.id)}
                >
                  <FaEdit />
                </button>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => removeItem(item.id)}
                >
                  <FaTrash />
                </button>
              </p>
            </li>
          );
        })}
    </>
  );
};

export default List;
