var SidebarView = Backbone.View.extend({
	className: "info-window",
	events: {
		"click .current-view li" : "clickEntry"
	},
	initialize: function(options) {
		this.map = options.map;
		google.maps.event.addListener(this.map, 'center_changed', _.bind(this.updateMarkerList, this));

	},
	render: function() {
		this.$el.append($("#sidebar-template").html());
		this.$currentViewList = this.$el.find(".current-view");
		return this;
	},
	updateMarkerList: function() {
		var bounds = this.map.getBounds();
		this.$currentViewList.empty();


		for(var i = 0; i < app.markerList.length; i++) {
			if( bounds.contains(app.markerList[i].marker.getPosition()) ){
				var marker = app.markerList[i].marker;
				var markerModel = app.markerList[i].model;

				var entry = $("#list-entry li").clone();

				entry.find(".type").text(TYPE_STRING[markerModel.get("type")]);
				entry.find(".text").text(markerModel.get("title"));
				entry.data("marker", marker);
				this.$currentViewList.append(entry);

			}
		}
	},
	clickEntry: function(e) {
		var marker = $(e.target).data("marker") || $(e.target).parents("li").data("marker");
		//this.map.setCenter(marker.getPosition());
		new google.maps.event.trigger( marker, 'click' );

	}
});