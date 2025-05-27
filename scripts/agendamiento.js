let calendar;

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const serviceTypeSelect = document.getElementById('serviceType');
    const personSelect = document.getElementById('person');

    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        slotMinTime: '08:00:00',
        slotMaxTime: '20:00:00',
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
        events: [
            // Aquí se cargarán los eventos desde el servidor
            // Ejemplo: '/api/citas'
        ],
        dateClick: function(info) {
            manejarSeleccionFecha(info);
        },
        select: function(info) {
            manejarSeleccionRango(info);
        },
        eventClick: function(info) {
            manejarClicEvento(info.event);
        }
    });

    calendar.render();

    // Configurar los event listeners para los selectores
    serviceTypeSelect.addEventListener('change', actualizarCalendario);
    personSelect.addEventListener('change', actualizarCalendario);
});

/**
 * Actualiza la configuración del calendario según las selecciones del usuario
 */
function actualizarCalendario() {
    const serviceType = document.getElementById('serviceType').value;
    const person = document.getElementById('person').value;
    
    // Actualizar horarios según el tipo de servicio
    if (serviceType === 'consejeria') {
        calendar.setOption('businessHours', {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '08:00',
            endTime: '18:00'
        });
        calendar.setOption('slotMinTime', '08:00:00');
        calendar.setOption('slotMaxTime', '18:00:00');
    } else if (serviceType === 'cuidado') {
        calendar.setOption('businessHours', {
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
            startTime: '00:00',
            endTime: '24:00'
        });
        calendar.setOption('slotMinTime', '00:00:00');
        calendar.setOption('slotMaxTime', '24:00:00');
    }
    
    // Aquí se podría agregar lógica para filtrar eventos según el tipo de servicio y persona
    // Por ejemplo, recargar eventos desde el servidor con estos parámetros
}

/**
 * Maneja el evento de clic en una fecha/hora específica
 */
function manejarSeleccionFecha(info) {
    // Se puede implementar un modal más sofisticado aquí
    const serviceType = document.getElementById('serviceType').value;
    const person = document.getElementById('person').value;
    
    if (!serviceType || !person) {
        alert('Por favor seleccione el tipo de servicio y la persona antes de agendar una cita.');
        return;
    }
    
    const title = prompt('Por favor ingrese el título de la cita:');
    if (title) {
        calendar.addEvent({
            title: `${title} - ${serviceType} con ${person}`,
            start: info.date,
            allDay: info.allDay
        });
        
        // Aquí se podría agregar código para guardar el evento en el servidor
    }
}

/**
 * Maneja el evento de selección de un rango de tiempo
 */
function manejarSeleccionRango(info) {
    const serviceType = document.getElementById('serviceType').value;
    const person = document.getElementById('person').value;
    
    if (!serviceType || !person) {
        alert('Por favor seleccione el tipo de servicio y la persona antes de agendar una cita.');
        calendar.unselect();
        return;
    }
    
    const title = prompt('Por favor ingrese el título de la cita:');
    if (title) {
        calendar.addEvent({
            title: `${title} - ${serviceType} con ${person}`,
            start: info.start,
            end: info.end,
            allDay: info.allDay
        });
        
        // Aquí se podría agregar código para guardar el evento en el servidor
    }
    calendar.unselect();
}

/**
 * Maneja el evento de clic en un evento existente
 */
function manejarClicEvento(event) {
    if (confirm(`¿Desea eliminar la cita "${event.title}"?`)) {
        event.remove();
        
        // Aquí se podría agregar código para eliminar el evento en el servidor
    }
}
