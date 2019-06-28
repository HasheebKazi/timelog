window.onload = function () {
    console.log('success!');

    let timeInput = document.getElementById('logger-time');
    let activityInput = document.getElementById('logger-activity');
    let button = document.getElementById('add-entry');

    let table = document.getElementById('daily-log');

    button.addEventListener('click', (event) => {
        // get data
        time = timeInput.value;
        activity = activityInput.value;
        // reset fields
        timeInput.value = "";
        activityInput.value = "";

        row = document.createElement('tr');
        td1 = document.createElement('td');
        td2 = document.createElement('td');
        td1.append(document.createTextNode(time));
        td2.append(document.createTextNode(activity));
        row.append(td1);
        row.append(td2);
        table.append(row);
    });
}