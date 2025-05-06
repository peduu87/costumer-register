function phoneMask() {
    $('.phone_with_ddd').mask('(00) 00000-0000');
}

function cepMask() {
    $('.cep').mask('00000-000');
}

$(document).ready(phoneMask(), cepMask());

const inputName = document.getElementById("inputName");
const inputPhone = document.getElementById("inputPhone");
const inputCep = document.getElementById("inputCep");
const inputAdress = document.getElementById("inputAdress");
const inputAdrNumber = document.getElementById("inputAdrNumber");
const inputNeighborhood = document.getElementById("inputNeighborhood");
const inputCity = document.getElementById("inputCity");
const inputState = document.getElementById("inputState");

inputCep.addEventListener('keydown', (e) => {
    if (e.code === "Enter") {
        validateCep(inputCep);
    }
});

// Object array that receives user information and stores it to be disposed.
var regCostumers = [
    
];

// String that stores the CEP being used, so it could be validated while submitting.
let workingCep

function loadTable() {
    // Gets the table to show the data.
    const tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    for (let i = 0; i < regCostumers.length; i++) {
        tableBody.innerHTML +=
        `<th scope="row">${i + 1}</th>
        <td>${regCostumers[i].shortName}</td>
        <td class="phone_with_ddd">${regCostumers[i].phone}</td>
        <td class="d-none d-lg-table-cell">${regCostumers[i].adress}, ${regCostumers[i].adrNumber}</td>
        <td class="d-none d-lg-table-cell">${regCostumers[i].neighborhood}</td>
        <td>${regCostumers[i].city}, ${regCostumers[i].state}</td>`;
    }    

    phoneMask();
}

$(document).ready(loadTable());

function capitalizeName(name) {
    const prepositions = ["da", "de", "do", "das", "dos", "e"];

    return name
        .split(" ")
        .filter(word => word.trim() !== "")
        .map((word, index) => {
            const lower = word.toLowerCase();
            if (index !== 0 && prepositions.includes(lower)) {
                return lower; // Keeps lower case if it's not the first word and it's a preposition.
            }
            return lower[0].toUpperCase() + lower.slice(1);
        })
        .join(" ");
}

function validateForm() {
    const formControls = document.getElementsByClassName("form-control");

    let isFormValid = true;

    for (let cntrl of formControls) {
        cntrl.value = cntrl.value.trim();

        if (cntrl.value.length <= 0) {
            cntrl.classList.add("border-danger");
            isFormValid = false;
        }
        else {
            cntrl.classList.remove("border-danger");
        }
    }

    if (document.getElementById("inputPhone").value.length != 15) {
        document.getElementById("inputPhone").classList.add("border-danger");
        isFormValid = false;
    }
    else {
        document.getElementById("inputPhone").classList.remove("border-danger");
    }

    if (inputCep.value != workingCep) {
        inputCep.classList.add("border-danger");
        isFormValid = false;
    }
    else {
        inputCep.classList.remove("border-danger");
    }

    return isFormValid;
}

function clearForm() {
    const frms = document.getElementsByClassName("form-control");

    for (let frm of frms) {
        frm.value = "";
    }
}

function submitForm(){
    if (!validateForm()) {
        return;
    }

    inputName.value = capitalizeName(inputName.value)

    regCostumers.push({
        name: inputName.value,
        shortName: getShortName(inputName.value),
        phone: inputPhone.value,
        cep: inputCep.value,
        adress: inputAdress.value,
        adrNumber: inputAdrNumber.value,
        neighborhood: inputNeighborhood.value,
        city: inputCity.value,
        state: inputState.value,
    });

    loadTable()

    workingCep = "";

    clearForm();

    return;
}

function getShortName (name) {
    let firstName, lastName;
    
    for (let i = 0; i < name.length; i++) {
        if (name[i] == " ") {
            firstName = name.substring(0, i);
            break;
        }
        else if (i == name.length-1){
            return name;
        }
    }

    for (let j = (name.length - 1); j > 0; j--) {
        if (name[j] == " ") {
            lastName = name.substring(j + 1);
            break;
        }
    }

    return (firstName + " " + lastName);
}

async function validateCep(input) {
    let cep = input.value.replace("-", "");

    if (cep.length < 8) {
        return;
    }

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    if (!response.ok) {
        alert("O CEP informado não pôde ser encontrado.");
        return;
    }

    workingCep = input.value;

    const adressJson = await response.json();

    if (adressJson.logradouro && adressJson.logradouro != "") {
        inputAdress.value = adressJson.logradouro;
    }
    else {
        inputAdress.disabled = false;
    }
    
    inputAdrNumber.disabled = false;

    if (adressJson.bairro && adressJson.bairro != "") {
        inputNeighborhood.value = adressJson.bairro;
    }
    else {
        inputNeighborhood.disabled = false;
    }
    if (adressJson.localidade && adressJson.localidade != "") {
        inputCity.value = adressJson.localidade;
    }
    else {
        inputCity.disabled = false;
    }
    if (adressJson.estado && adressJson.estado != "") {
        inputState.value = adressJson.estado;
    }
    else {
        inputState.disabled = false;
    }
}