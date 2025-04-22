function phoneMask() {
    $('.phone_with_ddd').mask('(00) 00000-0000');
}

$(document).ready(phoneMask());

// Object array that receives user information and stores it to be disposed.
var regStudents = [
    {
        name: "Pedro Henrique Silva",
        email: "pedro.h.silva8787@gmail.com",
        phone: 15996137562,
        course: 3,
        shift: "Noturno",
    },
    {
        name: "Gerivaldo de Souza",
        email: "geri.souza1998@gmail.com",
        phone: 15997177340,
        course: 1,
        shift: "Matutino",
    },
    {
        name: "Genilson Sobral de França",
        email: "ge.franca@outlook.com",
        phone: 11996283345,
        course: 1,
        shift: "Matutino",
    },
    {
        name: "Anderson Silva",
        email: "andsilvaufc@hotmail.com",
        phone: 11998532020,
        course: 4,
        shift: "Vespetino",
    },
];

const courses = new Map([
    [0, "N/A"],
    [1, "Eletrônica"],
    [2, "Engenharia da Computação"],
    [3, "Engenharia de Software"],
    [4, "Sistemas de Informação"],
]);

function loadTable() {
    // Gets the table to show the data.
    const tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    for (let i = 0; i < regStudents.length; i++) {
        tableBody.innerHTML +=
        `<th scope="row">${i + 1}</th>
        <td>${regStudents[i].name}</td>
        <td class="d-none d-lg-table-cell">${regStudents[i].email}</td>
        <td class="d-none d-lg-table-cell phone_with_ddd">${regStudents[i].phone}</td>
        <td>${courses.get(regStudents[i].course)}</td>
        <td>${regStudents[i].shift}</td>`;
    }    

    phoneMask();
}

$(document).ready(loadTable());

function validateForm() {
    const formControls = document.getElementsByClassName("form-control");

    let isFormValid = true;

    for (let cntrl of formControls) {
        if (cntrl.value.length <= 0) {
            cntrl.classList.add("border-danger");
            isFormValid = false;
        }
        else {
            cntrl.classList.remove("border-danger");
        }
    }

    const formSelect = document.getElementById("inputCourse");

    if (formSelect.value < 1 || formSelect.value > courses.length) {
        formSelect.classList.add("border-danger");
        isFormValid = false;
    }
    else {
        formSelect.classList.remove("border-danger");
    }

    return isFormValid;
}

function getStuShift() {
    const radios = document.getElementsByName("periodRadio");
    let stuShift = "";

    for (let radio of radios) {
        if (radio.checked == true) {
            let selector = `label[for=${radio.id}]`

            stuShift = document.querySelector(selector).innerHTML;
        }
    }

    console.log(stuShift)
    return stuShift;
}

function clearForm() {
    document.getElementById("inputName").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPhone").value = "";
    let stdOptions = document.getElementsByClassName("std-option");
    
    for (let option of stdOptions) {
        option.selected = 'selected';
    }
}

function submitForm(){
    if (!validateForm()) {
        
        return;
    }

    regStudents.push({
        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        phone: document.getElementById("inputPhone").value.replace(/\D/g, ""),
        course: parseInt(document.getElementById("inputCourse").value),
        shift: getStuShift(),
    });

    loadTable()

    clearForm();

    return;
}