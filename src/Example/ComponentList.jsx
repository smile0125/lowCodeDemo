import React from 'react';
import Component from './Component';

const ComponentList = () => {
  const components = [
    { type: 'button', name: 'Button' },
    { type: 'text', name: 'Text Editor' },
    { type: 'image', name: 'Image' },
  ];

  return (
    <div className="component-list">
      {components.map((component) => (
        <Component key={component.type} {...component} />
      ))}
    </div>
  );
};

export default ComponentList;
