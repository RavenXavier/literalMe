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
 		return booksdb.find();
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

	},
});

Template.addBook.events({
	'click .js-addMe'(event, instance){
		var myTitle = $('#bookTitle').val();
		var myPath = $('#bookPath').val();
		var myDesc = $('#bookDesc').val();
		booksdb.insert({
			"title": myTitle,
			"path": myPath,
			"desc": myDesc
		});
		$("#addBookModal").modal("hide");
		$('#bookTitle').val('');
		$('#bookPath').val('');
		$('#bookDesc').val('');
	},
	'click .js-closeMe'(event, instance){
		$("#addBookModal").modal("hide");
		$('#bookTitle').val('');
		$('#bookPath').val('');
		$('#bookDesc').val('');
		$(".placeHolder").attr("src",$("#bookPath").val())
	},
	'input #bookPath'(event, instance){
			$(".placeHolder").attr("src",$("#bookPath").val())
			console.log($("#bookPath").val());

		},

});