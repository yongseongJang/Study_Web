import * as React from "react";
import { useState } from "react";

interface messageProps {
  messages: string[];
  id?: string;
  info?: string | undefined;
  onChange?: (e: React.ChangeEvent) => void;
}

function message(props: messageProps) {
  const [selectedValue, setSelectedValue] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const messageIndex = props.messages.indexOf(e.target.value);
    const option = [0, props.messages.length - 1];

    if (props.onChange && option.indexOf(messageIndex) === -1) {
      props.onChange(e);
    }

    setSelectedValue(messageIndex);
  };

  return (
    <div className="message">
      <select
        id={props.id ? props.id : "select"}
        className="message__select"
        onChange={handleChange}
      >
        {props.messages.map((message, index) => {
          return (
            <option key={index} value={message}>
              {message}
            </option>
          );
        })}
      </select>
      {selectedValue === props.messages.length - 1 && (
        <input id={props.id ? props.id : "select"} onChange={props.onChange} />
      )}
    </div>
  );
}

export default message;
