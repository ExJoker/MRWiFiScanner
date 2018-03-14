import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { WiFiLocation } from '/imports/api/wifilocation/wifilocation.js';
import { Visualization } from '/imports/Visualization.js';
import { Gui } from  '/imports/Gui.js';



import './wifi_scan.html';

Template.wifi_scan.onRendered(function() {
  const gui = new Gui();
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
});
