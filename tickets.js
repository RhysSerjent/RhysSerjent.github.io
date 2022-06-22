let cost = 0;
let adult = 0;
let oap = 0;
let child = 0;
let family = 0;

let storedAdult = 0;
let storedOap = 0;
let storedChild = 0;

// ticket prices
const adultReturn = 5;
const concessionReturn = 3;
const familyReturn = 12;
const seniorReturn = 4;

const adultSingle = 3;
const concessionSingle = 2;


function returnValidInput(handler, oldValue) {
  console.log(oldValue);
  if (handler.value === '') {
    handler.value = null;
    return 0;
  } else if (handler.value < 0 || handler.value.toString().includes('.')) {
    handler.value = oldValue;
    return oldValue;
  }
  return handler.value;
}

function updateValues() {
  adult = returnValidInput(document.getElementById('aT'), storedAdult);
  oap = returnValidInput(document.getElementById('oT'), storedOap);
  child = returnValidInput(document.getElementById('cT'), storedChild);
  family = 0;

  storedAdult = adult;
  storedChild = child;
  storedOap = oap;
}

function inputChanged() {
  let ticket = null;

  updateValues();

  if (document.getElementById('rdbSingle').checked === true) {
    ticket = 'Single';
    cost = (family * familyReturn) + (adult * adultSingle) + ((Number(child) + Number(oap)) * concessionSingle);
  } else {
    ticket = 'Return';
    // groups that are cheaper as a family ticket
    familyTicketBuilder(2, 2, 0);
    familyTicketBuilder(1, 2, 1);
    familyTicketBuilder(0, 2, 2);
    familyTicketBuilder(2, 1, 0);


    cost = (family * familyReturn) + (adult * adultReturn) + (oap * seniorReturn) + (Number(child) * concessionReturn);
  }

  const outPutA = document.getElementById('outputAdult');
  const outPutC = document.getElementById('outputConcession');
  const outPutS = document.getElementById('outputSenior');
  const outPutF = document.getElementById('outputFamily');
  const outPutCost = document.getElementById('outputCost');

  outPutS.textContent = '';

  outPutF.textContent = `Family Return X ${family}`;
  outPutA.textContent = `Adult ${ticket} X ${adult} `;
  if (document.getElementById('rdbSingle').checked === true) {
    outPutC.textContent = `Concession ${ticket} X ${Number(child) + Number(oap)}`;
  } else {
    outPutC.textContent = `Concession ${ticket} X ${Number(child)}`;
    outPutS.textContent = `Senior ${ticket} X ${Number(oap)}`;
  }
  outPutCost.textContent = `Total cost £${cost}`;
}

function familyTicketBuilder(a, c, o) {
  while (adult >= a && child >= c && oap >= o) {
    adult -= a;
    child -= c;
    oap -= o;
    family += 1;
  }
}

function clear() {
  document.getElementById('aT').value = null;
  document.getElementById('oT').value = null;
  document.getElementById('cT').value = null;

  const pOut = document.getElementsByTagName('p');
  for (let i = 0; i < pOut.length; i++) {
    pOut[i].textContent = '';
  }
}

const inputs = document.getElementsByTagName('input');
for (let i = 0; i < inputs.length; i++) {
  const iBox = inputs[i];
  iBox.addEventListener('input', inputChanged);
}

// prevent invalid inputs
const inputBoxes = document.querySelectorAll('.inputBox');
for (const box of inputBoxes) {
  box.addEventListener('keydown', function (event) {
    if (event.key === '.' || event.key === '-') {
      event.preventDefault();
    }
  });
}

document.getElementById('clear').addEventListener('click', clear);
