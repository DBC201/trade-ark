function readDataAsUrl(file) {
    return new Promise(function (resolve, reject) {
        let filereader = new FileReader();
        filereader.readAsDataURL(file);
        filereader.onload = function () {
            resolve(filereader.result);
        }

        filereader.onerror = function () {
            reject(filereader.error);
        }
    });
}

async function submit(url, onresponse) {
    let req_inputs = document.getElementsByName("required_input");
    let send_data = {};
    let missing_input = false;
    for (let i=0; i<req_inputs.length; i++) {
        if (!req_inputs[i].value) {
            document.getElementById(req_inputs[i].id+"_error").innerText = "Please fill in the required fields";
            missing_input = true;
        }
        else {
            send_data[req_inputs[i].id] = req_inputs[i].value;
            document.getElementById(req_inputs[i].id+"_error").innerText = "";
        }
    }

    if (missing_input) {
        document.getElementById("response").innerText = "Some fields are missing";
        return;
    }
    else {
        document.getElementById("response").innerText = "";
    }

    let inputs = document.getElementsByName("input");
    let checkboxes = document.getElementsByName("checkbox_input");

    for (let i=0; i<inputs.length; i++) {
        send_data[inputs[i].id] = inputs[i].value;
    }

    for (let i=0; i<checkboxes.length; i++) {
        send_data[checkboxes[i].id] = checkboxes[i].checked;
    }

    let file_inputs = document.getElementsByName("file_input");

    for (let i=0; i<file_inputs.length; i++) {
        send_data[file_inputs[i].id] = [];
        for (let j=0; j<file_inputs[i].files.length; j++) {
            send_data[file_inputs[i].id].push(await readDataAsUrl(file_inputs[i].files[j]));
        }
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(send_data));

    xhr.onload = function () {
        if (onresponse) {
            onresponse(xhr);
        }
        else {
            document.getElementById("response").innerText = xhr.response;
        }
    }
}
