document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const serviceTypeSelect = document.getElementById('serviceType');
    const personSelect = document.getElementById('person');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        selectMirror: true,
        navLinks: true,
        editable: true,
        dayMaxEvents: true,
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '08:00',
            endTime: '18:00'
        },
        select: function(info) {
            const title = prompt('Por favor ingrese el título de la cita:');
            if (title) {
                const serviceType = serviceTypeSelect.value;
                const person = personSelect.value;
                
                calendar.addEvent({
                    title: `${title} - ${serviceType} con ${person}`,
                    start: info.start,
                    end: info.end,
                    allDay: info.allDay
                });
            }
            calendar.unselect();
        },
        eventClick: function(info) {
            if (confirm('¿Desea eliminar esta cita?')) {
                info.event.remove();
            }
        }
    });

    calendar.render();

    // Actualizar horarios según el tipo de servicio
    serviceTypeSelect.addEventListener('change', function() {
        const serviceType = this.value;
        
        if (serviceType === 'consejeria') {
            calendar.setOption('businessHours', {
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: '08:00',
                endTime: '18:00'
            });
        } else if (serviceType === 'cuidado') {
            calendar.setOption('businessHours', {
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                startTime: '00:00',
                endTime: '24:00'
            });
        }
    });
});