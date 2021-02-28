import React from "react";

const NewItem = ({ list }) => {
  const onClickHandler = () => {
    console.log(list);
  };

  return <button onClick={onClickHandler}>New Item</button>;
};

export default NewItem;
