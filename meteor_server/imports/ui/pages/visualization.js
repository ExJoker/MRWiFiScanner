import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { WiFiLocation } from '/imports/api/wifilocation/wifilocation.js';
import { Visualization } from '/imports/Visualization.js';
import dat from '/imports/libs/datgui/DAT.GUI.min';


import './visualization.html';

Template.visualization.onRendered(function() {
  const gui = new dat.GUI();
  let vis = new Visualization(gui);
  $(window).resize(
    function() {
    setTimeout(function() {
      $('canvas').height($( window ).height());
      $('canvas').width($( window ).width());
    }, 250);
  });

  let sub = Meteor.subscribe('wifilocation', this.data.uuid());
  let locations = WiFiLocation.find({}).observeChanges({
    added: function(docId, newDoc) {
      vis.addLocation(docId, newDoc);
    }
  });
  /*
  let geometry = Geometry.find({});
  geometry.observeChanges({
    removed: function(docId) {
      vis.removeGeometry(docId);
    },
    changed: function(docId, newDoc) {
      vis.changeGeometry(docId, newDoc);
    },
    added: function(docId, newDoc) {
      vis.addGeometry(docId, newDoc);
    }
  });
  */
});

Template.visualization.helpers({

});

Template.visualization.events({
  'click button#cube'(event, instance) {
    Meteor.call('geometry.add');
  },
  'click button#sphere'(event, instance) {
    Meteor.call('geometry.add', 'sphere');
  },
  'click button#monkey'(event, instance) {
    Meteor.call('geometry.add', 'monkey');
  }
});
