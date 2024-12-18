function generateCalendar(year, month, availableDays) {
    const calendarBody = document.querySelector('#calendar tbody');
    calendarBody.innerHTML = ''; // Limpiar el calendario

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) { // Máximo 6 filas
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.textContent = '';
            } else if (date > daysInMonth) {
                break;
            } else {
                cell.textContent = date;
                if (availableDays.includes(date)) {
                    cell.classList.add('available');
                }
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}

// Ejemplo de uso
const availableDaysConsejeria = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12]; // Días disponibles para consejería
generateCalendar(2023, 10, availableDaysConsejeria); // Octubre 2023