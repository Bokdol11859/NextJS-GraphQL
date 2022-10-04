import React, { useState } from "react";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";

const UserIds = ["eric", "eric"];

const getRandomuserId = () => UserIds[Math.round(Math.random())];

const originalMsgs = Array(50)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    userId: getRandomuserId(),
    timestamp: 1234567890123 + i * 1000 * 60, // ms -> s -> min
    text: `${i + 1} mock text`,
  }))
  .reverse();

const MsgList = () => {
  const [msgs, setMsgs] = useState(originalMsgs);
  const [editingId, setEditingId] = useState(null);

  const onCreate = (text) => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomuserId(),
      timestamp: Date.now(),
      text: `${msgs.length + 1} ${text}`,
    };
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  const onUpdate = (text, id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, {
        ...msgs[targetIndex],
        text,
      });
      return newMsgs;
    });
    doneEdit();
  };

  const onDelete = (id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const tempMsgs = [...msgs];
      tempMsgs.splice(targetIndex, 1);
      return tempMsgs;
    });
  };

  const doneEdit = () => setEditingId(null);

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map((props) => (
          <MsgItem
            key={props.id}
            {...props}
            onUpdate={onUpdate}
            startEdit={() =>
              editingId !== props.id ? setEditingId(props.id) : doneEdit()
            }
            isEditing={editingId === props.id}
            onDelete={() => onDelete(props.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
