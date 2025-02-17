document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es', // Configuración en español
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true, // Permite seleccionar fechas
        selectMirror: true,
        navLinks: true, // Permite hacer clic en los días/semanas
        editable: true,
        dayMaxEvents: true,
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5], // Lunes a Viernes
            startTime: '08:00',
            endTime: '18:00'
        },
        select: function(info) {
            // Manejo de selección de fecha
            const title = prompt('Por favor ingrese el título de la cita:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: info.start,
                    end: info.end,
                    allDay: info.allDay
                });
            }
            calendar.unselect();
        },
        eventClick: function(info) {
            // Manejo de clic en evento
            if (confirm('¿Desea eliminar esta cita?')) {
                info.event.remove();
            }
        }
    });

    calendar.render();
});