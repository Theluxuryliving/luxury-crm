import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

export default function CalendarTab() {
  const [followups] = useState([
    {
      id: 1,
      title: "Ahmed Raza – WhatsApp Call",
      date: "2025-07-16T14:00:00",
    },
    {
      id: 2,
      title: "Sarah Malik – Meeting",
      date: "2025-07-18T11:30:00",
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📅 Calendar</h1>

      <div className="bg-white p-4 rounded shadow">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
          events={followups.map((f) => ({
            id: f.id.toString(),
            title: f.title,
            start: f.date,
          }))}
        />
      </div>
    </div>
  );
}
