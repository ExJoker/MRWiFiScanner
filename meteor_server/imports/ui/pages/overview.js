import './overview.html';
import { WiFiScan } from '/imports/api/wifiscan/wifiscan';

Template.overview.onCreated(function() {
  Meteor.subscribe('wifiscan');
});

Template.overview.helpers({
  scans: function() {
    return WiFiScan.find();
  }
});
