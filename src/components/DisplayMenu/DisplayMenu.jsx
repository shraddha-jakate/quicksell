import React from 'react';
import Display from "../../assets/Display.svg"
import Down from "../../assets/down.svg";
import "./DisplayMenu.css"

const DisplayMenu = ({ show, toggle, grouping, setGrouping, ordering, setOrdering }) => (
  <div className="display-menu-container">
    <button onClick={toggle} className="display-button">
      <img src={Display} alt="display" />
      <span>Display</span>
      <img src={Down} alt="down" />
    </button>

    {show && (
      <div className="dropdown-menu">
        <div className="dropdown-section">
          <label className="dropdown-label">Grouping</label>
          <select value={grouping} onChange={(e) => setGrouping(e.target.value)} className="dropdown-select">
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="dropdown-section">
          <label className="dropdown-label">Ordering</label>
          <select value={ordering} onChange={(e) => setOrdering(e.target.value)} className="dropdown-select">
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    )}
  </div>
);

export default DisplayMenu;
