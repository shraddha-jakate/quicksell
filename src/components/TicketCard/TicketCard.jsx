import React from 'react';
import './TicketCard.css';
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
import Urgent from "../../assets/UrgentPrioritygrey.svg";

const TicketCard = ({ ticket, users, grouping }) => {
  const user = users.find((u) => u.id === ticket.userId);

  const statusIcons = {
    'Todo': Todo,
    'In progress': InProgress,
    'Backlog': Backlog,
    'Done': Done,
    'Canceled': Cancelled
  };

  const priorityIcons = {
    4: Urgent,
    3: High,
    2: Medium,
    1: Low,
    0: No
  };

  const truncateTitle = (title, maxLength = 60) => {
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  const shouldShowStatus = grouping === 'user' || grouping === 'priority';
  const shouldShowPriority = grouping === 'user' || grouping === 'status';

  return (
    <div className="ticket-card">
      <div className="ticket-top">
        <div className="ticket-header">
          <span className="ticket-id">{ticket.id}</span>
          {user && (
            <div className="user-info">
              <div className={`user-status ${user.available ? 'available' : ''}`}></div>
            </div>
          )}
        </div>
        <div className="ticket-content">
          {shouldShowStatus && (
            <img
              src={statusIcons[ticket.status]}
              alt={ticket.status}
              className="status-icon"
            />
          )}
          <p className="ticket-title" title={ticket.title}>
            {truncateTitle(ticket.title)}
          </p>
        </div>
      </div>
      <div className="ticket-footer">
        {shouldShowPriority && (
          <img
            src={priorityIcons[ticket.priority]}
            alt={`Priority ${ticket.priority}`}
            className="priority-icon"
          />
        )}
        <div className="ticket-tag">{ticket.tag[0]}</div>
      </div>
    </div>
  );
};

export default TicketCard;