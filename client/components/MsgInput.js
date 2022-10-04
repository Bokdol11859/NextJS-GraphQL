import React, { useRef } from "react";

const MsgInput = ({
  mutate,
  id = undefined,
  placeholder = "내용을 입력하세요.",
}) => {
  const textRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const text = textRef.current.value;
    textRef.current.value = "";
    mutate(text, id);
  };

  return (
    <form className="messages__input" onSubmit={onSubmit}>
      <textarea
        ref={textRef}
        placeholder={placeholder}
        defaultValue={placeholder}
      />
      <button type="submit">완료</button>
    </form>
  );
};

export default MsgInput;
