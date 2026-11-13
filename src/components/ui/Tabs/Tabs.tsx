import React, { useRef } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  ariaLabel?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  className = '',
  ariaLabel = 'Cabin classes',
}) => {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      targetIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      targetIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = items.length - 1;
    }

    if (targetIndex >= 0) {
      e.preventDefault();
      onChange(items[targetIndex].id);
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[targetIndex]?.focus();
    }
  };

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-label={ariaLabel}
      className={`${styles.tabList} ${className}`.trim()}
    >
      {items.map((tab, idx) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            className={`${styles.tab} ${isActive ? styles.active : ''}`.trim()}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
