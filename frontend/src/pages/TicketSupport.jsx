import React, { useEffect, useState } from 'react';

function TicketSupport() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("http://localhost:5000/users/alltickets", {
          credentials: "include",
        });

        console.log("Status:", res.status);

        /* const text = await res.text(); // read as text first
        console.log("Raw response body:", text); */

        if (res.ok) {
          const data = await res.json();
          //
          console.log("Fetched tickets:", data); // log it
          //
          setTickets(data);
        } else {
          setError("Failed to fetch tickets");
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("An error occurred while fetching tickets");
      }
    };

    fetchTickets();
  }, []);

  return (
    <main>
      <h1>Logged Role Change Tickets</h1>
      {error && <p>{error}</p>}
      {tickets.length === 0 ? (
        <p>No available tickets at the moment.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket._id}>
              <strong>User Name:</strong> {ticket.user?.username || "N/A"} <br />
              <strong>Reason:</strong> {ticket.message}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default TicketSupport;
