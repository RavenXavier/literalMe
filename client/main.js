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
    $("#veiwBookModal").modal("show");
    var myId = this._id;
  	var theTitle = booksdb.findOne({_id:myId}).title;
  	var thePath = booksdb.findOne({_id:myId}).path;
  	var theDesc = booksdb.findOne({_id:myId}).desc;
    console.log('Veiwing...' + ":" + this._id+ 'Title: '+ theTitle + 'Desc: '+theDesc+'path: '+thePath); //all info appears 
  	$("#veiwId").val(myId);
  	$("#veiwTitle").val(theTitle); //no title
  	$("#veiwDesc").val(theDesc); //no description
  	$(".veiwHolder").attr("src", thePath); //image appears
  	console.log($("#veiwTitle").val()); //title appars in log 
    },
  'click .js-editBook'(event, instance) {
    // open edit pane
    console.log('Editing...'+ ":" + this._id);
    $("#editBookModal").modal("show");
  	var myId = this._id;
  	var theTitle = booksdb.findOne({_id:myId}).title;
  	var thePath = booksdb.findOne({_id:myId}).path;
  	var theDesc = booksdb.findOne({_id:myId}).desc;
  	$("#editId").val(myId);
  	$("#editbookTitle").val(theTitle);
  	$("#editbookPath").val(thePath);
  	$("#editbookDesc").val(theDesc);
  	$(".veiwHolder").attr("src", thePath);
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
		$(".placeHolder").attr("src",$("#bookPath").val());
	},
	'input #bookPath'(event, instance){
			$(".placeHolder").attr("src",$("#bookPath").val());
			//.log($("#bookPath").val());

		},

});

Template.editBook.events({
	'click .js-editMe'(event, instance){
		var newTitle = $('#editbookTitle').val();
		var newPath = $('#editbookPath').val();
		var newDesc = $('#editbookDesc').val();
		var updateId = $('#editId').val();
		booksdb.update({_id: updateId},
				{$set:{
					"title": newTitle,
					"path": newPath,
					"desc": newDesc
				}}
			);
		$("#editBookModal").modal("hide");
		// console.log(newTitle + ": " + newDesc + ": " + newPath + ": " + updateId );
	},
	'click .js-closeMe'(event, instance){
		$("#editBookModal").modal("hide");
		$('#editbookTitle').val('');
		$('#editbookPath').val('');
		$('#editbookDesc').val('');
		$(".editHolder").attr("src",$("#editbookPath").val());
	},
	'input #editbookPath'(event, instance){
			$(".editHolder").attr("src",$("#editbookPath").val());
			//console.log($("#editbookPath").val());
		}	
});

Template.veiwBook.events({
	'click .js-delete'(event, instance){
		var myId = this._id;
		$('#deleteId').val(myId);
		console.log(myId);
		$('#confirmModal').modal('show')
	},
	'click js-confirm'(event, instance){
		var myId = $('#deleteId').val();
 		$("#"+myId).fadeOut('slow',function(){
  	booksdb.remove({_id:myId});
  	});
  	console.log(myId);
	},

});