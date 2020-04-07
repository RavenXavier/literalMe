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

Session.set("imageLimit", 9);
lastScrollTop = 0;

$(window).scroll(function(event){
	//check if we are near the bottom of the page 
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
		//where are we on the page
		var scrollTop = $(this).scrollTop();
		//test if we are going down
		if (scrollTop > lastScrollTop){
			//yes we are scrolling down
			Session.set("bookLimit",Session.get("bookLimit") + 3);
		}//end of if (new scrollTop)
		lastScrollTop = scrollTop;	
	}//end of (height check)
});	

Template.mainBody.helpers({
  allCards() {
		//get time 15 seconds
		var prevTime = new Date().getTime() - 15000;
		var results = booksdb.find({createdOn: {$gte: prevTime}}).count();

		if (results > 0){
			return booksdb.find({}, {sort:{createdOn: -1,upVote: -1 }, limit: Session.get("bookLimit")});
		}
		else{
			return booksdb.find({}, {sort:{ upVote: -1, createdOn: -1}, limit: Session.get("bookLimit")});
		}
	},
});


Template.mainBody.events({
  'click .js-viewBook'(event, instance) {
  	$("#viewBookModal").modal("show");
    var myId = this._id;
  	var theTitle = booksdb.findOne({_id:myId}).title;
  	var thePath = booksdb.findOne({_id:myId}).path;
  	var theDesc = booksdb.findOne({_id:myId}).desc;
  	var theAuthor = booksdb.findOne({_id:myId}).author;
  	var theView = booksdb.findOne({_id:myId}).views;
  	$("#viewId").val(myId);
  	$("#viewTitle").html(theTitle); 											//shows title
  	$("#viewDesc").html(theDesc); 												//shows description
  	$("#viewAuthor").html(theAuthor);
  	$(".viewHolder").attr("src", thePath); 								//image appears
  	theView += 1;
  	booksdb.update({_id:myId},
  		{$set:{
  			"views": theView
  			}}
  		);
    },

  'click .js-editBook'(event, instance) {
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
 		var myId = this._id;
 		var myUp = booksdb.findOne({_id:myId}).upVote;
 		myUp += 1;
 		booksdb.update({_id:myId},
  		{$set:{
  			"upVote": myUp
  			}}
  		);
 	},
 	'click .js-dislike'(event, instance){
 		var myId = this._id;
 		var myDown = booksdb.findOne({_id:myId}).downVote;
 		myDown += 1;
 		booksdb.update({_id:myId},
  		{$set:{
  			"downVote": myDown
  			}}
  		);	
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
			"author": myAuthor,
			"views": 0,
			"upVote": 0,
			"downVote": 0,
			"createdOn":  new Date().getTime()
		});
		$("#addBookModal").modal("hide");
		$('#bookTitle').val('');
		$('#bookPath').val('');
		$('#bookAuthor').val('');
		$('#bookDesc').val('');
		$(".placeHolder").attr("src",$("#bookPath").val());
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

Template.viewBook.events({
	'click .js-delete'(event, instance){
		var myId = $('#viewId').val();
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
