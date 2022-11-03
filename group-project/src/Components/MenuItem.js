import React from 'react';

export default function MenuItem(props) {
  return (
    <div>
      MenuItem
      {props.items.map((item, index) => {
        return (
          <div>
            <h1 key={index}>{item.item}</h1>
            <h1 key={index}>{item.price}</h1>
          </div>
        );
      })}
    </div>
  );
}
