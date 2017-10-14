"use strict";

var outputDiv = $('#dinosaurs');

const domString = (dinosuars) => {
    let domStrang = "";
        domStrang +=	`<div class=${dinosuars.info === 'Carnivore' ? 'card-bad' : 'card-good'}>`;
        domStrang +=		`<h1>${dinosuars.type}</h1>`;
        domStrang +=		`<h4>${dinosuars.bio}</h4>`;
        if (dinosuars.info === 'Carnivore'){
        	domStrang += `<h4>Has some tasty snacks.</h4>`;
        } else {
        	domStrang += `<h4>Has some adorable (debatable) friends.</h4>`;
        }
        domStrang +=		`<div class='card-holder'>`;
        dinosuars.snacks.forEach((cat) => {
        	domStrang += `<div class='card'>`;
        	domStrang += `<h5>${cat.name}</h5>`;
        	domStrang += `<div class='card-img'>`;
        	domStrang += `<img src=${cat.imageUrl}>`;
        	domStrang += `</div>`;
        	domStrang += `<p class'card-description>${cat.specialSkill}</p>`;
        	domStrang += `</div>`;
        });
        domStrang +=		`</div>`;
        domStrang +=	`</div>`;
    printToDom(domStrang);
};

const printToDom = (string) => {
	outputDiv.append(string);
};

module.exports = domString;