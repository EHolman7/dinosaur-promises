(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const dom = require('./dom');

let dinosaurs = [];


//The old way - Pyramid of Doom
// var dinoGetter = function(){
// 	$.ajax("./db/dinosaurs.json").done(function(data1){
// 		console.log('data1', data1);
// 		data1.dinosaurs1.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		$.ajax("./db/dinosaurs2.json").done(function(data2){
// 			console.log('data2', data2);
// 			data2.dinosaurs2.forEach(function(dino){
// 				dinosaurs.push(dino);
// 		});
// 			$.ajax("./db/dinosaurs3.json").done(function(data3){
// 			console.log('data3', data3);
// 			data2.dinosaurs3.forEach(function(dino){
// 				dinosaurs.push(dino);
// 			});
// 		console.log("dinosaurs after forEach", dinosaurs);
// 		});
// 	});
// 	});
// };
	
const firstDinosaurJSON = () => {
	return new Promise((resolve, reject) =>{
		$.ajax('./db/dinosaurs.json').done((data1) => {
			resolve(data1.dinosaurs1);
		}).fail((error1) => {
			reject(error1);
		});
	});
};

const secondDinosaurJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/dinosaurs2.json').done((data2) => {
			resolve(data2.dinosaurs2);
		}).fail((error2) => {
			reject(error2);
		});
	});
};

const thirdDinosaurJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/dinosaurs3.json').done((data3) => {
			resolve(data3.dinosaurs3);
		}).fail((error3) => {
			reject(error3);
		});
	});
};

//Promise Works - Promise Pyramid of Doom
// var dinoGetter = function(){
// 	firstDinosaurJSON().then(function(results){	
// 		results.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		secondDinosaurJSON().then(function(results2){
// 			results2.forEach(function(dino){
// 				dinosaurs.push(dino);
// 			});
// 			thirdDinosaurJSON().then(function(results3){
// 				results3.forEach(function(dino){
// 					dinosaurs.push(dino);
// 				});
// 				console.log('dinosaurs', dinosaurs);
// 			});
// 		});
// 	}).catch(function(error){
// 		console.log('error', error);
// 	});
// };

//Promise - Correct Way
// var dinoGetter = function(){
// 	firstDinosaurJSON().then(function(results){	
// 		results.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		return secondDinosaurJSON();
// 	}).then(function(results2){
// 		results2.forEach(function(dino){
// 			dinosaurs.push(dino);
// 	});
// 		return thirdDinosaurJSON();
// 	}).then(function(results3){
// 		results3.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		console.log('dinosaurs', dinosaurs);
// 		makeDinos();
// 	});
// };

const allTheCats = () => {
	return new Promise((resolve, reject) =>{
		$.ajax('./db/snacks.json').done((data) => {
			resolve(data.cats);
		}).fail((error1) => {
			reject(error1);
		});
	});
};

const dinoGetter = () => {
	Promise.all([firstDinosaurJSON(), secondDinosaurJSON(), thirdDinosaurJSON()]).then((results) => {
		allTheCats().then((cats) => {
		// console.log('results from Promise.all', results);
		results.forEach((result) => {
			result.forEach((dino) => {
				dino.snacks = [];
				dino.catIds.forEach((catId) => {
					// console.log("catId", catId);
					cats.forEach((cat) => {
						if(cat.id === catId){
							dino.snacks.push(cat);
						}
					});
				});
				// console.log("dino", dino);
				dinosaurs.push(dino);
			});
		});
		console.log("dinosaurs", dinosaurs);
		makeDinos();
		});
	}).catch((error) => {
		console.log("error from Promise.all", error);
	});
};

const makeDinos = () => {
	dinosaurs.forEach((dino) => {
		dom(dino);
	});
};

const initializer = () => {
	dinoGetter();	
};

const getDinosaurs = () => {
	return dinosaurs;
};

module.exports = {initializer:initializer, getDinosaurs:getDinosaurs};
},{"./dom":2}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";

var data = require('./data');

$(document).ready(function() {
	data.initializer();
});
},{"./data":1}]},{},[3]);
