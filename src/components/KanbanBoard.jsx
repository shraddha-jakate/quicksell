import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';



const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(() => localStorage.getItem('ordering') || 'priority');
  const [showDisplayMenu, setShowDisplayMenu] = useState(false);

  useEffect(() => {
    fetchData();
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);
  }, [grouping, ordering]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const priorityMap = {
    4: { name: 'Urgent', color: 'priority-urgent' },
    3: { name: 'High', color: 'priority-high' },
    2: { name: 'Medium', color: 'priority-medium' },
    1: { name: 'Low', color: 'priority-low' },
    0: { name: 'No Priority', color: 'priority-none' }
  };

  const statusIcons = {
    'Todo': '📋',
    'In progress': '🔄',
    'Backlog': '📝',
    'Done': '✅',
    'Canceled': '❌'
  };

  const sortTickets = (tickets) => {
    return [...tickets].sort((a, b) => {
      if (ordering === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  };

  const groupTickets = () => {
    let groupedData = {};
    
    if (grouping === 'status') {
      groupedData = {
        'Backlog': [], 'Todo': [], 'In progress': [], 'Done': [], 'Canceled': []
      };
    } else if (grouping === 'priority') {
      groupedData = {
        'No Priority': [], 'Urgent': [], 'High': [], 'Medium': [], 'Low': []
      };
    } else if (grouping === 'user') {
      users.forEach(user => {
        groupedData[user.name] = [];
      });
    }

    const sortedTickets = sortTickets(tickets);
    
    sortedTickets.forEach(ticket => {
      if (grouping === 'status') {
        groupedData[ticket.status].push(ticket);
      } else if (grouping === 'priority') {
        const priorityName = priorityMap[ticket.priority].name;
        groupedData[priorityName].push(ticket);
      } else if (grouping === 'user') {
        const user = users.find(u => u.id === ticket.userId);
        if (user) {
          groupedData[user.name].push(ticket);
        }
      }
    });

    return groupedData;
  };

  const renderCard = (ticket) => {
    const user = users.find(u => u.id === ticket.userId);
    
    return (
      <div key={ticket.id} className="ticket-card">
        <div className="ticket-header">
          <span className="ticket-id">{ticket.id}</span>
          {user && (
            <div className="user-info">
              <div className={`user-status ${user.available ? 'available' : ''}`}></div>
              <span className="user-name">{user.name}</span>
            </div>
          )}
        </div>
        <div className="ticket-content">
          {grouping !== 'status' && (
            <span className="status-icon">{statusIcons[ticket.status]}</span>
          )}
          <h3 className="ticket-title">{ticket.title}</h3>
        </div>
        <div className="ticket-footer">
          {grouping !== 'priority' && (
            <div className={`priority-indicator ${priorityMap[ticket.priority].color}`}>
              ●
            </div>
          )}
          <div className="ticket-tag">
            {ticket.tag[0]}
          </div>
        </div>
      </div>
    );
  };

  const renderColumn = (title, tickets) => (
    <div className="kanban-column">
      <div className="column-header">
        <div className="header-left">
          <span className="column-title">{title}</span>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="header-actions">
        </div>
      </div>
      <div className="column-content">
        {tickets.map(ticket => renderCard(ticket))}
      </div>
    </div>
  );

  return (
    <div className="kanban-container">
      <div className="display-menu-container">
        <button
          onClick={() => setShowDisplayMenu(!showDisplayMenu)}
          className="display-button"
        >
          <span>Display</span>
        </button>
        
        {showDisplayMenu && (
          <div className="dropdown-menu">
            <div className="dropdown-section">
              <label className="dropdown-label">Grouping</label>
              <select
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
                className="dropdown-select"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-section">
              <label className="dropdown-label">Ordering</label>
              <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
                className="dropdown-select"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="kanban-board">
        {Object.entries(groupTickets()).map(([title, groupTickets]) => 
          renderColumn(title, groupTickets)
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;