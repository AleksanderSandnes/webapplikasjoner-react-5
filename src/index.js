import _ from 'lodash';

window.onload = start;

function start() {
    var button = document.getElementById('button');
    var popUp = document.getElementById('popUp');
    var body = document.getElementById('body');
    var exit = document.getElementById('exit');
    var descriptionT = document.getElementById('descriptionT');
    var charLeft = document.getElementById('charLeft');

    descriptionT.addEventListener("keydown", function() {
        charLeft.innerHTML = 125 - descriptionT.value.length;
    });

    descriptionT.addEventListener("keyup", function() {
        charLeft.innerHTML = 125 - descriptionT.value.length;
    });

    var addT = document.getElementById('addT');
    addT.addEventListener("click", function() {
        var titleT = document.getElementById('titleT').value;
        var descriptionT = document.getElementById('descriptionT').value;
        var authorT = document.getElementById('authorT').value;
        var error = document.getElementById('error');

        var errorBuilder = "";
        if(titleT ==  "") {
            errorBuilder += "<p>Mangler tittel</p>";
        }
        if(descriptionT == "") {
            errorBuilder += "<p>Mangler beskrivelse</p>";
        }
        if(authorT == "") {
            errorBuilder += "<p>Mangler forfatter</p>";
        }

        if(errorBuilder == "") {
            addNewTTT(titleT, descriptionT, authorT);
            error.innerHTML = "";
            error.style.display = "none";
        } else {
            error.innerHTML = errorBuilder;
            error.style.display = "block";
        }
    });

    button.addEventListener("click", function() {
        popUp.style.display = "block";
        body.style.overflowY = "hidden";
    });

    exit.addEventListener("click", function() {
        popUp.style.display = "none";
        body.style.overflowY = "scroll";
    });

    updateT();
    deleteBtn();
    completeBtn();
}

function updateT() {
    var children = document.getElementById('nyesteTodos').children;
    if(children.length > 3) {
        for(var i = 0; i < children.length; i++) {
            console.log(children[i]);
            if(i < 3) {
                children[i].style.display = "block";
            } else {
                children[i].style.display = "none";
            }
        }
    }
}

function deleteBtn() {
    var btnSlettTodo = document.getElementsByClassName('btnSlettTodo');
    for(var j = 0; j < btnSlettTodo.length; j++) {
        btnSlettTodo[j].addEventListener("click", function() {
            var article = this.parentElement.parentElement;
            article.remove();
            updateT();
        })
    }
}

function completeBtn() {
    var btnFullforTodo = document.getElementsByClassName('btnFullforTodo');
    for(var h = 0; h < btnFullforTodo.length; h++) {
        btnFullforTodo[h].addEventListener("click", function () {
            var article = this.parentElement.parentElement;
            var titleT = article.children[0].innerHTML;
            var descriptionT = article.children[1].innerHTML;
            var authorT = article.children[3].innerHTML;
            console.log(authorT);
            var listeAvFerdigeTodos = document.getElementById('listeAvFerdigeTodos');
            var date = new Date();
            var year = date.getFullYear().toString().substr(-2);
            var month = (parseInt(date.getMonth()) + 1 < 10 ? ("0" + (parseInt(date.getMonth()) + 1)) : (parseInt(date.getMonth()) + 1));
            var day = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());

            listeAvFerdigeTodos.innerHTML +=
                "<article class='th'>" +
                "<p class='title'>" + titleT + "</p>" +
                "<p class='author'>" + authorT + "</p>" +
                "<p class='description'>" + descriptionT + "</p>" +
                "<p class='completedDate'>" + day + "." + month + "." + year + "</p>" +
                "</article>";
            article.remove();
            updateT();
        });
    }
}

function addNewTTT(title, description, author) {
    var nyesteTodos = document.getElementById('nyesteTodos');
    var nyesteTodoElementer = nyesteTodos.innerHTML;

    nyesteTodos.innerHTML = "<article style='th'>\n" +
        "                    <p class=\"overskrift\">"+title+"</p>\n" +
        "                    <p class=\"beskrivelse\">"+description+"</p>\n" +
        "                    <div>\n" +
        "                    <button class=\"btnSlettTodo\">Delete</button>\n" +
        "                    <button class=\"btnFullforTodo\">Complete</button>\n" +
        "                    </div>\n" +
        "                    <p style=\"display: none\" class=\"authorT\">"+author+"</p>\n" +
        "                    </article>";
    nyesteTodos.innerHTML += nyesteTodoElementer;

    document.getElementById('popUp').style.display = "none";
    document.getElementById('body').style.overflowY = "scroll";
    document.getElementById('titleT').value = null;
    document.getElementById('descriptionT').value = null;
    document.getElementById('authorT').value = null;
    document.getElementById('charLeft').innerHTML = 125;
    updateT();
    deleteBtn();
    completeBtn();
}