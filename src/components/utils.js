export const priorityMap = {
    4: { name: 'Urgent', color: 'priority-urgent' },
    3: { name: 'High', color: 'priority-high' },
    2: { name: 'Medium', color: 'priority-medium' },
    1: { name: 'Low', color: 'priority-low' },
    0: { name: 'No Priority', color: 'priority-none' },
  };
  
  export const statusIcons = {
    'Todo': '📋',
    'In progress': '🔄',
    'Backlog': '📝',
    'Done': '✅',
    'Canceled': '❌',
  };
  
  export const groupTickets = (tickets, users, grouping, ordering) => {
    let groupedData = {};
  
    if (grouping === 'status') {
      groupedData = { Backlog: [], Todo: [], 'In progress': [], Done: [], Canceled: [] };
    } else if (grouping === 'priority') {
      groupedData = { 'No Priority': [], Urgent: [], High: [], Medium: [], Low: [] };
    } else if (grouping === 'user') {
      users.forEach((user) => (groupedData[user.name] = []));
    }
  
    const sortedTickets = [...tickets].sort((a, b) =>
      ordering === 'priority' ? b.priority - a.priority : a.title.localeCompare(b.title)
    );
  
    sortedTickets.forEach((ticket) => {
      if (grouping === 'status') {
        groupedData[ticket.status].push(ticket);
      } else if (grouping === 'priority') {
        const priorityName = priorityMap[ticket.priority].name;
        groupedData[priorityName].push(ticket);
      } else if (grouping === 'user') {
        const user = users.find((u) => u.id === ticket.userId);
        if (user) groupedData[user.name].push(ticket);
      }
    });
  
    return groupedData;
  };
  