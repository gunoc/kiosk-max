import React, { useRef, useState } from 'react';
import { Tab } from './Tab';
import classes from './TabMenu.module.css';
import { Menu } from '../utils/types';

export function TabMenu({
  menuList,
  activeTab,
  setActiveTab,
}: {
  menuList: Menu[];
  activeTab: number;
  setActiveTab: (idx: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  const handleMouseDown: React.MouseEventHandler = (event) => {
    setStartX(event.pageX - (containerRef.current?.offsetLeft ?? 0));
    setIsDragging(true);
  };

  const handleMouseMove: React.MouseEventHandler = (event) => {
    if (!isDragging) return;
    const x = event.pageX - (containerRef.current?.offsetLeft ?? 0);
    const walk = x - startX;
    const scrollLeft = containerRef.current?.scrollLeft;

    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft! - walk;
      setStartX(x);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartX(0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setStartX(0);
  };

  return (
    <div
      className={classes.container}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {menuList.map((menu, index) => (
        <Tab key={index} id={index} menuName={menu.name} activeTab={activeTab} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
}
