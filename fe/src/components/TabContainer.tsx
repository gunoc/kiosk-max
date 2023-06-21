import React, { useRef, useState } from 'react';
import { Tab } from './Tab';
import classes from './TabContainer.module.css';

export function TabContainer({ tabs }: { tabs: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown: React.MouseEventHandler = (event) => {
    setStartX(event.pageX - (containerRef.current?.offsetLeft ?? 0));
    setIsDragging(true);
  };

  const handleMouseMove: React.MouseEventHandler = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - (containerRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 3;
    const scrollLeft = containerRef.current?.scrollLeft;

    console.log(`Current x: ${x}`);
    console.log(`Start x: ${startX}`);
    console.log(`Walk: ${walk}`);
    console.log(`Scroll Left: ${scrollLeft}`);

    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft! - walk;
      setStartX(x);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartX(0); // startX를 초기화
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setStartX(0); // startX를 초기화
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
      {tabs.map((tab, index) => (
        <Tab key={index} tab={tab} />
      ))}
    </div>
  );
}
