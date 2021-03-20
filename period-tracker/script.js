document.addEventListener('DOMContentLoaded', function () {
	var eventsList = [];

	//localStorage.removeItem('eventsList');

	if (localStorage.getItem('eventsList')) {
		eventsList = JSON.parse(localStorage.getItem('eventsList'));
		console.log(eventsList);
	} else {
		localStorage.setItem('eventsList', '');
	}

	var calendarEl = document.getElementById('calendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {
		headerToolbar: {
			left: 'prev,next',
			center: 'title',
			right: 'myCustomButton',
		},
		initialView: 'dayGridMonth',
		events: eventsList,
		height: 600,
		eventColor: '#f51d11',
		customButtons: {
			myCustomButton: {
				text: 'Add Period',
				click: () => {
					var startDate = '';
					var endDate = '';

					do {
						startDate = prompt('Enter a start date in the format (YYYY-MM-DD)');
					} while (startDate === '');

					do {
						endDate = prompt('Enter an end date in the format (YYYY-MM-DD)');
					} while (endDate === '');

					if (startDate !== '' && endDate !== '') {
						calendar.addEvent({
							id: 'period',
							title: `Period - ${eventsList.length + 1}`,
							start: startDate,
							end: endDate,
						});

						eventsList.push({
							id: 'period',
							title: `Period - ${eventsList.length + 1}`,
							start: startDate,
							end: endDate,
						});

						localStorage.setItem('eventsList', JSON.stringify(eventsList));
					}
				},
			},
		},
	});
	calendar.render();

	calendar.on('dateClick', par => {
		console.log('date clicked', par);
	});
});
