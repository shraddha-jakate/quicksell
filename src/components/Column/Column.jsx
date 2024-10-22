import React from 'react';
import './column.css';
import TicketCard from '../TicketCard/TicketCard';
import Add from "../../assets/add.svg"
import DotMenu from "../../assets/3dotmenu.svg"

// Status Imports
import Todo from "../../assets/To-do.svg";
import InProgress from "../../assets/inprogress.svg";
import Backlog from "../../assets/Backlog.svg";
import Done from "../../assets/Done.svg";
import Cancelled from "../../assets/Cancelled.svg";
// Priority Imports
import No from "../../assets/No-priority.svg";
import High from "../../assets/HighPriority.svg";
import Low from "../../assets/LowPriority.svg";
import Medium from "../../assets/MediumPriority.svg";
import Urgentcolour from "../../assets/UrgentPrioritycolour.svg";

const priorityMap = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No Priority"
};

const Column = ({ title, tickets, users, grouping }) => {
  const statusIcons = {
    'Todo': Todo,
    'In progress': InProgress,
    'Backlog': Backlog,
    'Done': Done,
    'Canceled': Cancelled
  };

  const priorityIcons = {
    4: Urgentcolour,
    3: High,
    2: Medium,
    1: Low,
    0: No
  };

  const getColumnIcon = () => {
    if (grouping === 'status' && statusIcons[title]) {
      return statusIcons[title];
    }
    if (grouping === 'priority') {
      // Find the priority number by matching the title
      const priorityNumber = Object.entries(priorityMap)
        .find(([_, value]) => value === title)?.[0];
      return priorityIcons[priorityNumber];
    }
    return null;
  };

  const columnIcon = getColumnIcon();

  return (
    <div className="kanban-column">
      <div className="column-header">
        <div className='column-gap'>
          {columnIcon && (
            <img
              src={columnIcon}
              alt={title}
              className="column-icon"
            />
          )}
          <span className="column-title">{title}</span>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="header-actions">
          <img src={Add} alt="" />
          <img src={DotMenu} alt="" />
        </div>
      </div>
      {tickets.map((ticket) => (
        <TicketCard 
          key={ticket.id} 
          ticket={ticket} 
          users={users} 
          grouping={grouping} 
        />
      ))}
    </div>
  );
};

export default Column;
