import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ModalWindow = ({ show, onClose, onSave, onDelete, item }) => {
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);

  const handleSave = (e) => {
    e.preventDefault();
    const newItem = {
      ...item,
      title,
      content,
    };
    onSave(newItem);
    onClose();
  };

  const handleDelete = (_id) => {
    onDelete(_id);
    onClose();
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleSave}
      className="modal"
      overlayClassName="overlay"
    >
      <form onSubmit={handleSave}>
        <div className="close-btn-ctn">
          <h1>Title</h1>
          <button
            style={{ position: "relative", top: "0", left: "710px" }}
            className="close-btn"
            onClick={handleSave}
          >
            X
          </button>
        </div>
        <input
          style={{ fontSize: "1.8em" }}
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <div>
          <h2>Description</h2>
          <p>
            <input
              style={{ height: "2rem" }}
              type="text"
              placeholder="Add Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </p>

          <h2>Status</h2>
          <p>
            {item.icon}{" "}
            {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}{" "}
          </p>
          <button className="btn-save" onClick={() => handleSave}>
            Save
          </button>
          <button
            className="btn-delete"
            type="button"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalWindow;
