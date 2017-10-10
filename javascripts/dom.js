"use strict";

var outputDiv = $('#dinosaurs');

const domString = (dinosuar) => {
    let domStrang = "";
        domStrang += `<div>`;
        domStrang +=`<h1>${dinosuar.name}</h1>`;
        domStrang +=`</div>`;
    printToDom(domStrang);
};

const printToDom = (string) => {
	outputDiv.append(string);
};

module.exports = domString;