import { Meteor } from 'meteor/meteor';
import { WiFiScan } from './wifiscan';

Meteor.methods({
  'wifiscan.add': function(uuid) {
    let data = {
      created: new Date(),
      uuid: uuid
    };
    WiFiScan.insert(data);
    return data;
  },
  'wifiscan.deleteAll': function() {
    WiFiScan.remove({});
  }
});
