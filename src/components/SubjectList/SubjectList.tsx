import React from "react";

interface SubjectListProps {
  data: { name: string }[];
  onComplete: (arg0: { name: string }) => void;
}

export function SubjectList(props: SubjectListProps) {
  return (
    <div id="subjects-container">
      <h2>Choose subject</h2>
      {props?.data?.map((item, index) => (
        <button
          className="btn--primary"
          key={index}
          onClick={() => props.onComplete(item)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
