import React, { useRef, useState, useEffect } from 'react';
import { Tab } from './Tab';
import classes from './TabMenu.module.css';
import { Menu } from '../../utils/types';

export function TabMenu({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: (idx: number) => void }) {
  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setMenuList(data);
        setLoading(false);
      });
  }, []);

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
