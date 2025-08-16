import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-sidebar text-sidebar-foreground p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <a href="#" className="hover:text-sidebar-primary">Dashboard</a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:text-sidebar-primary">Tasks</a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:text-sidebar-primary">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
