counter = 0;
window.onload = function () {
    console.log('success!');

    let timeInput = document.getElementById('logger-time');
    let activityInput = document.getElementById('logger-activity');
    let addButton = document.getElementById('add-entry');

    let tableBody = document.getElementById('daily-log-body');
    // console.log(tableBody.children)
    Array.from(tableBody.children).forEach(row => {
        counter++;
    });

    console.log('counter', counter);

    addButton.addEventListener('click', (event) => {
        counter++;
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
        db = document.createElement('button');
        db.classList.add("daily-log__remove-activity");
        db.append(document.createTextNode("x"));
        td2.append(db);
        db.addEventListener('click', event => {
            counter--;
            console.log('removed!', db.parentElement.parentElement)
            console.log('counter', counter);

            x = document.getElementById('daily-log-body');
            x.children[counter].remove();
        })




        row.append(td1);
        row.append(td2);
        row.addEventListener('click', (event) => {
            row.remove();
        })
        tableBody.append(row);
    });



    let saveButton = document.getElementById('save-log');

    saveButton.addEventListener('click', (event) => {
        let log = [];
        let data = tableBody.children;
        let datalen = data.length;
        for (let index = 0; index < datalen; index++) {
            activity = data[index].children[1].textContent.toString();
            // console.log(activity);
            log.push({
                time: data[index].children[0].textContent,
                activity: activity.slice(0, activity.length - 1)
            });
        }
        console.log('data\n', log);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3000/logger', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            value: log
        }));
    });

    let deleteButtons = Array.from(document.querySelectorAll('.daily-log__remove-activity'));
    // console.log(deleteButtons)
    deleteButtons.forEach(button => {
        // console.log(button);
        button.addEventListener('click', event => {
            counter--;
            button.parentElement.parentElement.remove();
        })
    })

}