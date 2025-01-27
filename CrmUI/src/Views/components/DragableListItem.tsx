import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableItemProps {
  item: { id: number; name: string };
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'INPUT_ELEMENT_ITEM',
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  
  return (

    <li className="border-dashed border dark:border-white rounded m-4" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <span

        className={` items-center text-center block p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-500  hover:text-white group`}
      >
        <span className="ms-3">{item.name.toUpperCase()}</span>
      </span>
    </li>


  );
};

export default DraggableItem;