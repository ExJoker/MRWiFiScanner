import './wifi_overview.html';
import { WiFiScan } from '/imports/api/wifiscan/wifiscan';

Template.wifi_overview.onCreated(function() {
  Meteor.subscribe('wifiscan');
});

Template.wifi_overview.helpers({
  scans: function() {
    return WiFiScan.find();
  }
});
