"use client"
import React, { useState } from "react";
import { Drawer, Button, Collapse } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Panel } = Collapse;

const MobileMegaMenuDrawer = ({ menuItems = [], useNestedDrawer = false }) => {
    const route = useRouter()
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState([]);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => {
    setOpen(false);
    setActivePath([]);
  };

  const getActiveLevelItems = () => {
    let items = menuItems;
    for (const index of activePath) {
      if (!items[index] || !Array.isArray(items[index].childrens)) break;
      items = items[index].childrens;
    }
    return items;
  };

  const handleItemClick = (index, item) => {
    if (Array.isArray(item.childrens) && item.childrens.length > 0) {
      if (useNestedDrawer) {
        setActivePath([...activePath, index]);
      }
    } else if (item.url) {
    route.push(item.url)
      closeDrawer();
    }
  };

  const handleBack = () => {
    setActivePath((prev) => prev.slice(0, -1));
  };

  const renderCollapseItems = (items) => (
    <>
      {items.map((item, index) =>
        item.url ? (
          <div key={index} className="drawer-url-item">
            <a href={item.url} onClick={closeDrawer} className="drawer-link">
              <span className="drawer-icon">{item.icon}</span>
              <span className="drawer-label">{item.name || item.title}</span>
            </a>
          </div>
        ) : (
          <Collapse accordion key={index} expandIconPosition="right">
            <Panel
              header={
                <div className="drawer-panel-header">
                  <span className="drawer-icon">{item.icon}</span>
                  <span className="drawer-label">
                    {item.name || item.title}
                  </span>
                </div>
              }
              key="panel"
            >
              {Array.isArray(item.childrens) &&
                item.childrens.length > 0 &&
                renderCollapseItems(item.childrens)}
            </Panel>
          </Collapse>
        )
      )}
    </>
  );

  const currentItems = getActiveLevelItems();

  return (
    <div className="mobile-menu">
      <Button icon={<MenuOutlined />} type="text" onClick={openDrawer} />
      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        open={open}
        className="mobile-drawer-menu"
      >
        {useNestedDrawer && activePath.length > 0 && (
          <div className="drawer-back-button" onClick={handleBack}>
            ← Back
          </div>
        )}

        {!useNestedDrawer ? (
          renderCollapseItems(menuItems)
        ) : (
          <ul className="drawer-menu-list">
            {currentItems.map((item, index) => (
              <li
                key={index}
                className={`drawer-menu-item ${
                  item.url ? "clickable" : "expandable"
                }`}
              >
                {item.url ? (
                  <a
                    href={item.url}
                    onClick={() => closeDrawer()}
                    className="drawer-link"
                  >
                    <span className="drawer-icon">{item.icon}</span>
                    <span className="drawer-label">
                      {item.name || item.title}
                    </span>
                  </a>
                ) : (
                  <button
                    onClick={() => handleItemClick(index, item)}
                    className="drawer-button-link"
                  >
                    <span className="drawer-icon">{item.icon}</span>
                    <span className="drawer-label">
                      {item.name || item.title}
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Drawer>
    </div>
  );
};

export default MobileMegaMenuDrawer;
