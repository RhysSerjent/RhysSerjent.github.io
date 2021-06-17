let cost = 0;
let adult = 0;
let oap = 0;
let child = 6;
let family = 0;

const adultReturn = 4;
const concessionReturn = 3;
const familyReturn = 10;

const adultSingle = 3;
const concessionSingle = 2;
const familySingle = 6;

function vaildCheck(handler){
    if (handler.value < 0 || handler.value == '') {
        handler.value = null;
        return 0;
        
        
        
    }else
        return handler.value;

}

function resetValues() {


    adult = vaildCheck(document.getElementById('aT'));
    oap = vaildCheck(document.getElementById('oT'));
    child = vaildCheck( document.getElementById('cT'));
    family = 0;


    if (adult < 0 ) {
        adult *= -1
        document.getElementById('aT').value = adult
    }

    if (adult == '') {
        adult = 0;
    }
}

function inputChanged() {

    let ticket = null;

    resetValues();
    aacc();
    aocc();
    accc();
    oocc();
    occc();
    cccc();
    aac();
    acc();
    aoc();

    const outPutA = document.getElementById('outputAdult');
    const outPutC = document.getElementById('outputConcession');
    const outPutF = document.getElementById('outputFamily');
    const outPutCost = document.getElementById('outputCost')


    if (document.getElementById('rdbSingle').checked === true) {
        ticket = 'Single';
        cost = (family * familySingle) + (adult * adultSingle) + ((Number(child) + Number(oap)) * concessionSingle)
    }else{
        ticket = 'Return';
        cost = (family * familyReturn) + (adult * adultReturn) + ((Number(child) +Number(oap)) * concessionReturn)

    }
    
    outPutF.textContent = `Family ${ticket} X ${family}`;
    outPutA.textContent = `Adult ${ticket} X ${adult} `;
    outPutC.textContent = `Concession ${ticket} X ${Number(child) + Number(oap)}`
    outPutCost.textContent = `Total cost £${cost}`;

}

function aacc() {
    while (adult >= 2  && child >= 2) {
            adult -= 2;
            child -= 2;
            family += 1;

    }
}


function aocc() {
    while (adult >= 1 && oap >= 1 && child >= 2) {
        adult -=1;
        oap -= 1;
        child -=2
        family += 1;
    }
}


function accc() {
    while (adult >= 1 && child >= 3) {
        adult -= 1;
        child -=3;
        family += 1
    }
}

function oocc() {
    while (oap >= 2 && child >= 2) {
        oap -= 2;
        child -= 2;
        family +=1;
    }
}

function occc() {
    while (oap >= 1 && child >= 3) {
        oap -= 1;
        child -= 3;
        family += 1;
    }
 
}

function cccc() {
    while (child >= 4) {
        child -=4;
        family += 1;
    }
}

function aac() {
    while (adult >= 2 && child >= 1) {
        adult -= 2;
        child -= 1;
        family +=1;
    }
}

function acc(){
    while (adult >=1 && child >= 2) {
        adult -=1;
        child -= 2;
        family += 1;

    } 
}

function aoc() {
    while (adult >= 1 && child >= 1 && oap >= 1) {
        adult -=1;
        child -= 1;
        oap -= 1;
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


let inputs = document.getElementsByTagName('input');
for (let i = 0; i < inputs.length; i++) {
    let iBox = inputs[i];
    iBox.addEventListener('input',inputChanged);
    
}

document.getElementById('clear').addEventListener('click', clear);
