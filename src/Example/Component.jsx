import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const Component = ({ type, name }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COMPONENT,
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`component ${isDragging ? 'dragging' : ''}`}>
      {name}
    </div>
  );
};

export default Component;
