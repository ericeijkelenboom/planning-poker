Router.map(function() { 
	
	this.route('home', {path: '/'});
	
  	this.route('story', {
		path: '/story/:_id',
    	controller: 'StoryController',
  	});
});

StoryController = RouteController.extend({
  	template: 'story',
  
  	notFoundTemplate: 'storyNotFound',

  	waitOn: function () {
		return Meteor.subscribe('stories', SessionAmplify.get('userId'));
  	},

  	data: function () {
    	var story; 
    	
    	if(isNumber(this.params._id)) 
			story = Stories.findOne({displayId: +this.params._id});
		else 
			story = Stories.findOne(this.params._id);
						
		return story;
  	},

  	show: function () {
    	// render the RouteController's template into the main yield location
    	this.render();
  	}
});