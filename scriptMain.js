function phoneMask() {
    $('.phone_with_ddd').mask('(00) 00000-0000');
}

function cepMask() {
    $('.cep').mask('00000-000');
}

$(document).ready(phoneMask(), cepMask());

let CEP_INPUT = document.getElementById("inputCep");

CEP_INPUT.addEventListener('keydown', (e) => {
    if (e.code === "Enter") {
        validateCep(CEP_INPUT);
    }
});

// Object array that receives user information and stores it to be disposed.
var regCostumers = [
    
];

function loadTable() {
    // Gets the table to show the data.
    const tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    for (let i = 0; i < regCostumers.length; i++) {
        tableBody.innerHTML +=
        `<th scope="row">${i + 1}</th>
        <td>${regCostumers[i].shortName}</td>
        <td class="phone_with_ddd">${regCostumers[i].phone}</td>
        <td class="d-none d-lg-table-cell phone_with_ddd">${regCostumers[i].adressAndNumber}</td>
        <td class="d-none d-lg-table-cell">${courses.get(regCostumers[i].neighborhood)}</td>
        <td>${regCostumers[i].cityAndState}</td>`;
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

    if (document.getElementById("inputPhone").value.length != 15) {
        document.getElementById("inputPhone").classList.add("border-danger");
        isFormValid = false;
    }
    else {
        document.getElementById("inputPhone").classList.remove("border-danger");
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

    regCostumers.push({

    });

    loadTable()

    clearForm();

    return;
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

    const adressJson = await response.json();

    const inputAdress = document.getElementById("inputAdress");
    const inputAdrNumber = document.getElementById("inputAdrNumber");
    const inputNeighborhood = document.getElementById("inputNeighborhood");
    const inputCity = document.getElementById("inputCity");
    const inputState = document.getElementById("inputState");

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