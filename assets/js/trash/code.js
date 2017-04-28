/**
 * Created by aggoetey on 19.04.17.
 */

var assert = require('assert');

function correct(reeks) {

    return reeks.length % 2 === 1 && !(/([a-z])\1/i).test(reeks) && (/^[a-z]*$/i).test(reeks) && geendubbels(reeks);
}

function geendubbels(reeks) {
    let i,
        len=reeks.length,
        out=[],
        obj={};

    for (i=0;i<len;i++) {
        obj[reeks[i]]=0;
    }
    for (i in obj) {
        out.push(i);
    }
    return reeks.length === out.length;
}

function letterwaarde(reeks) {

    assert(correct(reeks), "ongeldige letterreeks");

    const startwaarde = (reeks.length - 1) / 2;
    let waardes = {};
    for (let i = startwaarde * -1; i <= startwaarde; i++) {
        waardes[reeks[i + startwaarde].toUpperCase()] = i;
    }
    return waardes;

}

function woordwaarde(woord, reeks) {
    let waardes = letterwaarde(reeks);
    let som = 0;
    let teller = 0;
    let correct = true;
    while (teller < woord.length && correct) {
        correct = woord[teller].toUpperCase() in waardes;
        assert(correct, "ontbrekende letters");
        som += waardes[woord[teller].toUpperCase()];
        teller++;
    }
    return som;
}

function alignering(woorden, reeks) {
    let teller = 1;
    let correct = true;
    while (teller < woorden.length && correct) {
        correct = woordwaarde(woorden[teller - 1], reeks) + 1 === woordwaarde(woorden[teller], reeks);
        teller += 1;
    }
    return correct;
}


function rangschik1(woorden, reeks) {
    woorden.sort(function (a, b) {
        return woordwaarde(a, reeks) > woordwaarde(b, reeks) ? 1 : -1;
    });

}

function rangschik2(woorden, reeks) {
    return rangschik1(woorden, reeks);
}


console.log(letterwaarde("JHMUCNVTURISEYAPL")["E"]);