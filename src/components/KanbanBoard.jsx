import React, { useState, useEffect, useCallback } from 'react';
import DisplayMenu from './DisplayMenu/DisplayMenu';
import Column from './Column/Column';
import { groupTickets } from './utils';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(() => localStorage.getItem('ordering') || 'priority');
  const [showDisplayMenu, setShowDisplayMenu] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);
  }, [fetchData, grouping, ordering]);

  const groupedData = groupTickets(tickets, users, grouping, ordering);

  return (
    <div className="kanban-container">
      <DisplayMenu
        show={showDisplayMenu}
        toggle={() => setShowDisplayMenu(!showDisplayMenu)}
        grouping={grouping}
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
      />

      <div className="kanban-board">
        {Object.entries(groupedData).map(([title, tickets]) => (
          <Column 
            key={title} 
            title={title} 
            tickets={tickets} 
            users={users}
            grouping={grouping}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;