
var results = {};
var names = [];
var m = new MersenneTwister();

console.log('updated 2020 with mailjet');

function draw() {
    blockNames();
    var nameInputs = document.getElementsByClassName('nameInput');

    for (var i=0; i < nameInputs.length; i++) {
        results[nameInputs[i].value] = '';
        names.push(nameInputs[i].value);
    }

    for (var key in results) {
        //console.log('searching recipient for: ', key);
        if (results.hasOwnProperty(key) && results[key] === '') {
            var j=0;
            var drawnIndex;
            do{
                j++;
                drawnIndex = getRandomInt(0, names.length - 1);
                // console.log(isSameAsLastYear(names[drawnIndex], key));
                // console.log(names[drawnIndex] === key);
                // console.log(names[drawnIndex] === key || isSameAsLastYear(names[drawnIndex], key));
                // console.log(names[drawnIndex] + '======>' + key);
                // console.log('-------------------', j);
            }
            while((names[drawnIndex] === key || isSameAsLastYear(key, names[drawnIndex]) ) && j < 300);
            
            if(j === 1000) {
                console.log('error');
                alert('error');
                break;
            }

            if(names[drawnIndex] === key || isSameAsLastYear(key, names[drawnIndex])) {
                throw new Error('error, trying again');
            }

            
            results[key] = names[drawnIndex];
            console.log(key, '=>', names[drawnIndex]);
            names.splice(drawnIndex, 1);
        }
    }

    // // check
    // const check = Object.keys(results).some((key) => {
    //     return names[drawnIndex] === key || isSameAsLastYear(key, names[drawnIndex]);
    // })
    // if() {
    //     console.log('error, trying again');
    //     return draw();
    // }


    console.log(results);
    addActionButtons();
}

function tryDraw() {
    try {
        draw();
    } catch (error) {
        var results = {};
        var names = [];
        alert('error, try again')
    }
}
// 2023
const pairs = [
    ['Jan', 'Marcin'],
    ['Sabina', 'Jan'],
    ['Bożena', 'Marek'],
    ['Tadeusz', 'Bożena'],
    ['Marek', 'Maria'],
    ['Marcin', 'Tadeusz'],
    ['Maria', 'Sabina'],
];
// // 2021
// const pairs = [
//     ['Jan', 'Maria'],
//     ['Sabina', 'Marcin'],
//     ['Bożena', 'Tadeusz'],
//     ['Tadeusz', 'Sabina'],
//     ['Marek', 'Bożena'],
//     ['Marcin', 'Jan'],
//     ['Maria', 'Marek'],
// ];
// // 2020
// const pairs = [
//     ['Sabina', 'Tadeusz'],
//     ['Marek', 'Sabina'],
//     ['Bożena', 'Marcin'],
//     ['Jan', 'Marek'],
//     ['Tadeusz', 'Jan'],
//     ['Maria', 'Bożena'],
//     ['Marcin', 'Babcia'],
//     // ['Babcia', 'Maria'],
// ];
// 2019
// const pairs = [
//     ['Marcin', 'Tadeusz'],
//     ['Maria', 'Marek'],
//     ['Babcia', 'Jan'],
//     ['Sabina', 'Marcin'],
//     ['Tadeusz', 'Maria'],
//     ['Marek', 'Bożena'],
//     ['Jan', 'Sabina'],
//     ['Bożena', 'Babcia'],
// ];

function isSameAsLastYear(giver, recipient) {
    //console.log(pairs);
    //console.log('isSameAsLastYear', pairs.some((pair) => pair[0] === giver && pair[1] === recipient));
    return pairs.some((pair) => pair[0] === giver && pair[1] === recipient);
}

function addName() {
    var div = document.createElement('div');
    div.className = 'participant';
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'nameInput';
    div.appendChild(input);
    var namesContainer = document.getElementById('participants');
    namesContainer.appendChild(div);
}

function removeName() {
    var nameInputs = document.getElementsByClassName('nameInput');
    nameInputs[nameInputs.length-1].remove();
}

function blockNames() {
    var nameInputs = document.getElementsByClassName('nameInput');

    for (var i=0; i < nameInputs.length; i++) {
        nameInputs[i].disabled = true;
    }

    document.getElementById('btnRemoveName').remove();
    document.getElementById('btnAddName').remove();
    document.getElementById('btnDraw').remove();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(m.random() * (max - min + 1)) + min;
}

function addActionButtons() {
    var nameInputs = document.getElementsByClassName('nameInput');

    for (var i=0; i < nameInputs.length; i++) {
        var button = document.createElement('button');
        button.onclick = function(e){
            showResultFor(e.target.previousSibling.value);
            return false;
        };
        button.innerHTML = '❔Result';
        insertAfter(button, nameInputs[i]);
        
        var button2 = document.createElement('button');
        button2.onclick = function(e){
            sendEmail(e.target.previousSibling.previousSibling.value, e.target);
            return false;
        };
        button2.innerHTML = '📧Send';
        insertAfter(button2, button);
    }
}

function showResultFor(name) {
    document.getElementById('giftFrom').innerHTML = name;
    document.getElementById('giftTo').innerHTML = results[name];
    document.getElementById('modal').classList.add('modal--opened');		
    setTimeout(function(){ 
        document.getElementById('modal').classList.remove('modal--opened');
    }, 3000);
}

function sendEmail(name, button) {
    var email = window.prompt('Type email address','');
    if(!validateEmail(email)) { 
        alert("Type valid email address");
        return false; 
    }

    button.innerHTML = 'Sending...';
    button.disabled = true;

    var service_id = "service_mj95fuc";
    var template_id = "template_1oRpYHPm";

    var template_params = {
        to_email: email,
        to_name: name,
        message_html: results[name]
    }
    
    emailjs.send(service_id, template_id, template_params)
        .then(function(response) {
            button.innerHTML = 'Email Sent';
            console.log('SUCCESS!', response.status, response.text);
            alert("Sent!");
        }, function(error) {
            console.log('FAILED...', error);
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
        });

    return false;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}