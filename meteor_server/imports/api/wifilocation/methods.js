import { Meteor } from 'meteor/meteor';
import { WiFiLocation } from './wifilocation';

Meteor.methods({
  'wifilocation.add': function(uuid, position=[0, 0, 0], networks=[]) {
    let data = {
      created: new Date(),
      uuid: uuid,
      position: position,
      networks: networks
    };
    WiFiLocation.insert(data);
    return data;
  },
  'wifilocation.deleteAll': function() {
    WiFiLocation.remove({});
  }
});
