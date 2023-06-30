import React, { useRef, useState, useEffect } from 'react';
import classes from './TabMenu.module.css';
import { Tab } from './Tab';
import { Menu } from '../../utils/types';

export function TabMenu({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: (idx: number) => void }) {
  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setMenuList(data);
        setLoading(false);
      });
  }, []);

  // Click and drag feature
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
  // Switch Category tab
  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  if (loading) {
    return (
      <div className={classes.container}>
        <div>Loading...</div>
      </div>
    );
  }

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
