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


Template.mainBody.helpers({
 	allCards(){
 		return booksdb.find();
 		},
 	veiws() {
    return Template.instance().veiws.get();
  	},
  
});

Template.mainBody.events({
  'click .js-veiwBook'(event, instance) {
    $("#veiwBookModal").modal("show");
    var myId = this._id;
  	var theTitle = booksdb.findOne({_id:myId}).title;
  	var thePath = booksdb.findOne({_id:myId}).path;
  	var theDesc = booksdb.findOne({_id:myId}).desc;
  	var theAuthor = booksdb.findOne({_id:myId}).author;
  	$("#veiwId").val(myId);
  	$("#veiwTitle").html(theTitle); 											//shows title
  	$("#veiwDesc").html(theDesc); 												//shows description
  	$("#veiwAuthor").html(theAuthor);
  	$(".veiwHolder").attr("src", thePath); 								//image appears
    instance.veiws.set(instance.veiws.get() + 1);
    },

  'click .js-editBook'(event, instance) {
    console.log('Editing...'+ ":" + this._id);
    $("#editBookModal").modal("show");
  	var myId = this._id;
  	var theTitle = booksdb.findOne({_id:myId}).title;
  	var thePath = booksdb.findOne({_id:myId}).path;
  	var theDesc = booksdb.findOne({_id:myId}).desc;
  	var theAuthor = booksdb.findOne({_id:myId}).author;
  	$("#editId").val(myId);
  	$("#editbookTitle").val(theTitle);
  	$("#editbookPath").val(thePath);
  	$("#editbookAuthor").val(theAuthor);
  	$("#editbookDesc").val(theDesc);
  	$(".editHolder").attr("src", thePath);
 	},
 	'click .js-like'(event, instance){
		var button = document.getElementById("thUp"),
  	count = 0;
		button.onclick = function() {
  	count += 1;
  	button.innerHTML = " " + count;
		};

 	},
 	'click .js-dislike'(event, instance){
 		console.log("dislike: " + this._id);
 		var button = document.getElementById("thDown"),
  	count = 0;
		button.onclick = function() {
  	count += 1;
  	button.innerHTML = " " + count;
		};	
 	},
});

Template.addBook.events({
	'click .js-add'(event, instance){
		$("#addBookModal").modal("show");
	},
	'click .js-addMe'(event, instance){
		var myTitle = $('#bookTitle').val();
		var myPath = $('#bookPath').val();
		var myDesc = $('#bookDesc').val();
		var myAuthor = $('#bookAuthor').val();
		booksdb.insert({
			"title": myTitle,
			"path": myPath,
			"desc": myDesc,
			"author": myAuthor
		});
		$("#addBookModal").modal("hide");
		$('#bookTitle').val('');
		$('#bookPath').val('');
		$('#bookAuthor').val('');
		$('#bookDesc').val('');
	},
	'click .js-closeMe'(event, instance){
		$("#addBookModal").modal("hide");
		$('#bookTitle').val('');
		$('#bookPath').val('');
		$('#bookAuthor').val('');
		$('#bookDesc').val('');
		$(".placeHolder").attr("src",$("#bookPath").val());

	},
	'input #bookPath'(event, instance){
			$(".placeHolder").attr("src",$("#bookPath").val());
		},

});

Template.editBook.events({
	'click .js-editMe'(event, instance){
		var newTitle = $('#editbookTitle').val();
		var newPath = $('#editbookPath').val();
		var newDesc = $('#editbookDesc').val();
		var newAuthor = $('#editbookAuthor').val();
		var updateId = $('#editId').val();
		booksdb.update({_id: updateId},
				{$set:{
					"title": newTitle,
					"path": newPath,
					"desc": newDesc,
					"author": newAuthor
				}}
			);
		$("#editBookModal").modal("hide");
	},
	'click .js-closeMe'(event, instance){
		$("#editBookModal").modal("hide");
		$('#editbookTitle').val('');
		$('#editbookPath').val('');
		$('#bookAuthor').val('')
		$('#editbookDesc').val('');
		$(".editHolder").attr("src",$("#editbookPath").val());
	},
	'input #editbookPath'(event, instance){
			$(".editHolder").attr("src",$("#editbookPath").val());
		}	
});

Template.veiwBook.events({
	'click .js-delete'(event, instance){
		var myId = $('#veiwId').val();
		$("#deleteId").val(myId);
		$('#confirmModal').modal('show')
	},
	'click .js-confirm'(event, instance){
		var myId = $('#deleteId').val();
 		$("#"+myId).fadeOut('slow',function(){
  	booksdb.remove({_id:myId});
  	});
	},

});

Template.mainBody.onCreated(function mainBodyOnCreated(){
	this.veiws = new ReactiveVar(0); 
});