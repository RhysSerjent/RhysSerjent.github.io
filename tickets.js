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



    if (document.getElementById('rdbSingle').checked === true) {
        ticket = 'Single';
        familyTicketBuilder(2,2,0);
        cost = (family * familyReturn) + (adult * adultSingle) + ((Number(child) + Number(oap)) * concessionSingle)


    }else{
        ticket = 'Return';
        familyTicketBuilder(2,2,0);
        familyTicketBuilder(1,2,1);
        familyTicketBuilder(1,3,0);
        familyTicketBuilder(0,2,2);
        familyTicketBuilder(0,3,1);
        familyTicketBuilder(0,4,0);
        familyTicketBuilder(2,1,0);
        familyTicketBuilder(1,2,0);
        familyTicketBuilder()


        cost = (family * familyReturn) + (adult * adultReturn) + ((Number(child) +Number(oap)) * concessionReturn);
    }

    const outPutA = document.getElementById('outputAdult');
    const outPutC = document.getElementById('outputConcession');
    const outPutF = document.getElementById('outputFamily');
    const outPutCost = document.getElementById('outputCost')



    
    outPutF.textContent = `Family Return X ${family}`;
    outPutA.textContent = `Adult ${ticket} X ${adult} `;
    outPutC.textContent = `Concession ${ticket} X ${Number(child) + Number(oap)}`
    outPutCost.textContent = `Total cost £${cost}`;

}




function familyTicketBuilder(a,c,o) {
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


let inputs = document.getElementsByTagName('input');
for (let i = 0; i < inputs.length; i++) {
    let iBox = inputs[i];
    iBox.addEventListener('input',inputChanged);
    
}

document.getElementById('clear').addEventListener('click', clear);
