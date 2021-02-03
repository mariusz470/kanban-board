import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend as Backend } from "react-dnd-html5-backend";
import uuid from "react-uuid";
import DndItem from "./components/DndItem";
import DndGroup from "./components/DndGroup";
import DragNDrop from "./components/DragNDrop";
import { data, statuses } from "./data";
import {
  getTasks,
  addTask,
  deleteTask,
  editTask,
} from "./services/taskService";
import ModalWindow from "./components/ModalWindow";

function App() {
  const [items, setItems] = useState(data);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      const dataDb = await getTasks();
      setItems(dataDb);
    };
    fetchTasks();
  }, []);

  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i._id !== item._id)
        .concat({ ...item, status, icon: mapping.icon });
      return [...newItems];
    });
  };
  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };
  const onSave = (item) => {
    setItems((prevState) => {
      const newItems = prevState.map((note) =>
        note._id === item._id ? item : note
      );
      return [...newItems];
    });
  };
  const onSaveNewItem = (item) => {
    const newItems = [...items, item];
    setItems(newItems);
  };
  const item = {
    id: uuid(),
    icon: "⭕️",
    status: "open",
    title: "New item",
    content: "Your new item",
  };

  const addItem = () => {
    setShow(true);
  };
  const onClose = () => setShow(false);
  const onDelete = (id) => {
    const newItems = items.filter((note) => note._id !== id);
    setItems(newItems);
  };

  return (
    <DndProvider backend={Backend}>
      <Header />
      <button className="btn-add" onClick={addItem}>
        Add new task
      </button>
      <ModalWindow
        item={item}
        onClose={onClose}
        onSave={onSaveNewItem}
        onDelete={onDelete}
        show={show}
      />
      <div className="row">
        {statuses.map((s) => {
          return (
            <div key={s.status} className="col-wrapper">
              <h2 className="col-header">{s.status.toUpperCase()}</h2>
              <DragNDrop onDrop={onDrop} status={s.status}>
                <DndGroup>
                  {items
                    .filter((i) => i.status === s.status)
                    .map((i, idx) => (
                      <DndItem
                        key={i._id}
                        item={i}
                        index={idx}
                        moveItem={moveItem}
                        onSave={onSave}
                        onDelete={onDelete}
                        status={s}
                      />
                    ))}
                </DndGroup>
              </DragNDrop>
            </div>
          );
        })}
      </div>
    </DndProvider>
  );
}

export default App;
