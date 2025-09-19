"use client"
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Dropdown } from "antd";

const MegaMenu = ({
  menuItems = [],
  interaction = "hover",
  stackedNav = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeChildIndexes, setActiveChildIndexes] = useState([]);
  const [activeExtraContent, setActiveExtraContent] = useState(null)
  const menuRef = useRef();

  const hasChildrens = (item) =>
    Array.isArray(item.childrens) && item.childrens.length > 0;

  const onlyFirstLevelChildrens = (item) =>
    hasChildrens(item) && item.childrens.every((child) => !hasChildrens(child));

  const onTitleEnter = (index) => {
    const isSame = activeIndex === index;
    const item = menuItems[index];

    setActiveIndex(index);

    const path = [];
    let current = item;

    while (Array.isArray(current.childrens) && current.childrens.length > 0) {
      path.push(0);
      current = current.childrens[0];
    }

    setActiveChildIndexes(path);

    if (typeof current?.extraContent === "function") {
      setActiveExtraContent(current.extraContent);
    } else {
      setActiveExtraContent(null);
    }
  };

  const onChildEnter = (index, level) => {
    if (interaction === "hover") {
      setActiveChildIndexes((prev) => {
        const newIndexes = prev.slice(0, level);
        newIndexes[level] = index;
        return newIndexes;
      });

      // Traverse to get the correct child
      let current = menuItems[activeIndex];
      for (let i = 0; i <= level; i++) {
        if (!current?.childrens) break;
        const childIndex = i === level ? index : activeChildIndexes[i];
        current = current.childrens[childIndex];
      }

      if (typeof current?.extraContent === "function") {
        setActiveExtraContent(current.extraContent);
      }
    }
  };

  const onChildClick = (index, level, e) => {
    e.stopPropagation();
    if (interaction === "click") {
      setActiveChildIndexes((prev) => {
        const newIndexes = prev.slice(0, level);
        newIndexes[level] = index;
        return newIndexes;
      });

      // Traverse to get the correct child
      let current = menuItems[activeIndex];
      for (let i = 0; i <= level; i++) {
        if (!current?.childrens) break;
        const childIndex = i === level ? index : activeChildIndexes[i];
        current = current.childrens[childIndex];
      }

      if (typeof current?.extraContent === "function") {
        setActiveExtraContent(current.extraContent);
      }
    }
  };

  const renderChildrens = (childrens, isNormalType = false, level = 0) => {
    if (!childrens) return null;

    if (React.isValidElement(childrens)) {
      return <div className="custom-content">{childrens}</div>;
    }

    // Check if using stackedNav-style layout
    if (stackedNav) {
      return (
        <div className="stackedNav-menu">
          {childrens.map((section, sectionIdx) => (
            <div className="stackedNav-section" key={sectionIdx}>
              <h4 className="stackedNav-section-title">{section.name}</h4>
              <ul className="stackedNav-links">
                {section.childrens.map((link, linkIdx) => (
                  <li className="stackedNav-link-item" key={linkIdx}>
                    <a href={link.url || "#"} className="stackedNav-link">
                      <span className="stackedNav-icon">{link.icon}</span>
                      <div className="stackedNav-link-info">
                        <strong className="stackedNav-link-name">
                          {link.name}
                        </strong>
                        <p className="stackedNav-link-desc">
                          {link.description}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="horizontal-nested-menu">
        <div className="childrens-column">
          <ul className="children-list">
            {childrens.map((child, idx) => {
              const hasNested = hasChildrens(child);
              const clickable = child.url && !hasNested;
              const isActive = child.url
                ? false
                : activeChildIndexes[level] === idx;

              return (
                <li
                  key={idx}
                  className={` ${clickable ? "link-item" : "category-item"} ${
                    isActive ? "selected" : ""
                  }`}
                  onMouseEnter={() => onChildEnter(idx, level)}
                  onClick={(e) => onChildClick(idx, level, e)}
                >
                  {child.url ? (
                    <a href={child.url}>
                      <span className="link-icon">{child.icon}</span>
                      <div className="link-info">
                        <strong>{child.name}</strong>
                        <p className="link-desc">{child.description}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="category-header">
                      <span className="category-icon">{child.icon}</span>
                      <div>
                        <h4>{child.name}</h4>
                        <p className="category-desc">{child.description}</p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {activeChildIndexes[level] != null &&
          childrens[activeChildIndexes[level]] &&
          hasChildrens(childrens[activeChildIndexes[level]]) &&
          renderChildrens(
            childrens[activeChildIndexes[level]].childrens,
            isNormalType,
            level + 1
          )}
      </div>
    );
  };

  const activeItem = menuItems[activeIndex];

  const onlyFirstLevel = useMemo(
    () => (activeItem ? onlyFirstLevelChildrens(activeItem) : false),
    [activeItem]
  );

  return (
    <nav
      className="mega-menu"
      ref={menuRef}
      onMouseEnter={() => {
        document.body.style.overflow = "hidden";
      }}
      onMouseLeave={() => {
        document.body.style.overflow = "";
        setActiveIndex(null);
        setActiveChildIndexes([]);
        setActiveExtraContent(null);
      }}
    >
      <ul className="menu-bar">
        {menuItems.map((item, index) => {
          const noChildrens = !hasChildrens(item);
          const isActive = activeIndex === index;
          const isOnlyFirstLevel = onlyFirstLevelChildrens(item);
          const showSmall = isActive && isOnlyFirstLevel;
          const smallChildrenTitle = () => (
            <>
              <span className="menu-icon">{item.icon}</span>
              <div className="menu-info">
                <div className="menu-title">{item.title}</div>
                <div className="menu-desc">{item.description}</div>
              </div>
            </>
          );

          return (
            <li
              key={index}
              className="menu-item"
              onMouseEnter={() =>
                interaction === "hover" && onTitleEnter(index)
              }
              onClick={() => interaction === "click" && onTitleEnter(index)}
            >
              {noChildrens ? (
                <a href={item.url || "#"} className="menu-button">
                  {smallChildrenTitle()}
                </a>
              ) : !showSmall && !isOnlyFirstLevel ? (
                <button className="menu-button" type="button">
                  {smallChildrenTitle()}
                </button>
              ) : (
                <Dropdown
                  menu={{
                    items: item.childrens.map((child, idx) => ({
                      label: (
                        <a
                          className={
                            typeof window !== "undefined" && (window.location.pathname ===
                            new URL(child.url, window.location.origin).pathname
                              ? "selected"
                              : "")
                          }
                          href={child.url}
                        >
                          {child.name}
                        </a>
                      ),
                      key: idx,
                      ...child,
                    })),
                  }}
                >
                  <button className="menu-button" type="button">
                    {smallChildrenTitle()}
                  </button>
                </Dropdown>
              )}
            </li>
          );
        })}
      </ul>
      {activeIndex !== null && hasChildrens(activeItem) && !onlyFirstLevel && (
        <div
          style={{ display: "flex", gap: "10px" }}
          className={`menu-children-wrapper ${
            stackedNav ? "stackedNav-menu-wrapper" : ""
          }`}
        >
          <div className="children-group">
            {!onlyFirstLevel && renderChildrens(activeItem?.childrens)}
          </div>
          {!stackedNav && (
            <div className="extra-content">{activeExtraContent}</div>
          )}
        </div>
      )}
    </nav>
  );
};

export default MegaMenu;
