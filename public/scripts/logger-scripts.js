window.onload = function () {
    console.log('success!');

    let timeInput = document.getElementById('logger-time');
    let activityInput = document.getElementById('logger-activity');
    let addButton = document.getElementById('add-entry');

    let tableBody = document.getElementById('daily-log-body');

    addButton.addEventListener('click', (event) => {
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
        tableBody.append(row);
    });



    let saveButton = document.getElementById('save-log');
    
    saveButton.addEventListener('click', (event) => {
        let log = [];
        let data = tableBody.children;
        let datalen = data.length;
        for (let index = 0; index < datalen; index++) {
            log.push({
                time: data[index].children[0].textContent,
                activity: data[index].children[1].textContent
            });
        }
        // console.log(log);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3000/logger', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            value: log
        }));
    });
}