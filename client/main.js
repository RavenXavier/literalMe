import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this   is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor

import './main.html';
import '../lib/collection.js';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

Template.mainBody.helpers({
 	allCards(){
 		return imagesdb.find();
 	},
});

Template.mainBody.events({
  'click .js-veiwBook'(event, instance) {
    // open veiw pane
    console.log('Veiwing...' + ":" + this._id);
    
    },
  'click .js-editBook'(event, instance) {
    // open edit pane
    console.log('Editing...'+ ":" + this._id);
    },

	'click .js-addMe'(event, instance){
		console.log("adding image...");
		var myTitle = $("#bookTitle").val();
		var myPath = $("#bookPath").val();
		var myDesc = $("#bookDesc").val();
		imagesdb.insert({
			"title": myTitle,
			"path": myPath,
			"desc": myDesc,
			// "createdOn":  new Date().getTime()
 		});
 		console.log("saving...");
 		$("#addBookModal").modal("hide");
 		var myTitle = $("#bookTitle").val("");
		var myPath = $("#bookPath").val("");
		var myDesc = $("#bookDesc").val("");
	},
	// 'click .js-closeMe'(event, instance){
	// 	// console.log("closing...")
	// 	var myTitle = $("#imgTitle").val("");
	// 	var myPath = $("#imgPath").val("");
	// 	var myDesc = $("#imgDesc").val("");
	// 	$(".placeHolder").attr("src",$("#imgPath").val())
	// }, 
	// 'click .js-saveMe'(event, instance){
	
	// 	'input #imgPath'(event, instance){
	// 		$(".placeHolder").attr("src",$("#imgPath").val())
	// 		console.log($("#imgPath").val());

	// 	},
});
