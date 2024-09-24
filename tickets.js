let cost = 0;
let adult = 0;
let oap = 0;
let child = 0;
let family = 0;

let storedAdult = 0;
let storedOap = 0;
let storedChild = 0;

// ticket prices
const adultReturn = 6;
const concessionReturn = 4;
const familyReturn = 13;
const seniorReturn = 5;

const adultSingle = 4;
const concessionSingle = 3;


function returnValidInput(handler, oldValue) {
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
    // Family return is now cheaper than a getting singles
    familyTicketBuilder(2,2,0);

    cost = (family * familyReturn) + (adult * adultSingle) + ((Number(child) + Number(oap)) * concessionSingle);
  } else {
    ticket = 'Return';
    // groups that are cheaper as a family ticket
    familyTicketBuilder(2, 2, 0);
    familyTicketBuilder(1, 2, 1);
    familyTicketBuilder(1, 3, 0);
    familyTicketBuilder(0, 2, 2);
    familyTicketBuilder(2, 1, 0);
    familyTicketBuilder(0, 3, 1);
    familyTicketBuilder(0, 4, 0);
    familyTicketBuilder(2, 1, 0);
    familyTicketBuilder(0, 1, 2);
    familyTicketBuilder(1, 2, 0);


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
