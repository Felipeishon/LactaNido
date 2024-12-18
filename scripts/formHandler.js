const people = {
    consejeria: [
        { value: 'andrea_matta', text: 'Andrea Matta (Consejera)' },
        { value: 'juana_nancupil', text: 'Juana Ñancupil (Consejera)' }
    ],
    cuidado: [
        { value: 'antonia_paredes', text: 'Antonia Paredes (Cuidadora)' },
        { value: 'juana_nancupil', text: 'Juana Ñancupil (Cuidadora)' }
    ]
};

const occupiedDates = [
    { date: '2023-11-15', time: '10:00' },
    { date: '2023-11-16', time: '14:00' }
];

export function setupForm() {
    const personSelect = document.getElementById('person');

    document.getElementById('serviceType').addEventListener('change', function() {
        const serviceType = this.value;
        
        personSelect.innerHTML = '';
        
        people[serviceType].forEach(person => {
            const option = document.createElement('option');
            option.value = person.value;
            option.textContent = person.text;
            personSelect.appendChild(option);
        });

        generateCalendar();
    });

    document.getElementById('scheduleForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = new Date(document.getElementById('date').value);
        const time = document.getElementById('time').value;
        const serviceType = document.getElementById('serviceType').value;
        const person = personSelect.options[personSelect.selectedIndex].textContent;

        // Resto del código sin cambios
    });
}

function generateCalendar() {
    const calendarContainer = document.getElementById('calendarContainer');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    calendarContainer.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarTable = document.createElement('table');
    const headerRow = document.createElement('tr');
    ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    calendarTable.appendChild(headerRow);

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const weekRow = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const dayCell = document.createElement('td');
            if (i === 0 && j < firstDay) {
                dayCell.textContent = '';
            } else if (date > daysInMonth) {
                break;
            } else {
                const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                dayCell.textContent = date;
                dayCell.classList.add('day');
                if (j === 0 || j === 6) {
                    dayCell.classList.add('non-working-day');
                }
                if (occupiedDates.some(d => d.date === fullDate)) {
                    dayCell.classList.add('occupied');
                }
                dayCell.addEventListener('click', () => selectDate(fullDate));
                date++;
            }
            weekRow.appendChild(dayCell);
        }
        calendarTable.appendChild(weekRow);
    }
    calendarContainer.appendChild(calendarTable);
}

function selectDate(date) {
    const serviceType = document.getElementById('serviceType').value;
    const availableTimes = serviceType === 'consejeria' ? ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] : ['00:00', '06:00', '12:00', '18:00'];
    const occupiedTimes = occupiedDates.filter(d => d.date === date).map(d => d.time);

    const availableSlots = availableTimes.filter(time => !occupiedTimes.includes(time));

    if (availableSlots.length === 0) {
        alert('No hay horarios disponibles para esta fecha.');
    } else {
        alert(`Horarios disponibles para ${date}: ${availableSlots.join(', ')}`);
    }
}