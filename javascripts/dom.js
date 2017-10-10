"use strict";

var outputDiv = $('#dinosaurs');

const domString = (dinosuars) => {
    let domStrang = "";
        domStrang += `<div>`;
        domStrang +=`<h1>${dinosuars.name}</h1>`;
        domStrang +=`</div>`;
    printToDom(domStrang);
};

const printToDom = (string) => {
	outputDiv.append(string);
};

module.exports = domString;