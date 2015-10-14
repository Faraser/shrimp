import mongoose from 'mongoose';
import faker from 'faker';
import {isEmpty, getToObjectOptions} from './utils';

const message = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  channelId: mongoose.Schema.Types.ObjectId,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

message.statics.getAll = function getAll() {
  return new Promise((resolve, reject) => {
    this.find({}, null, {sort: {timestamp: 1}}, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

message.statics.isEmpty = isEmpty;
message.set('toObject', getToObjectOptions());

message.statics.createTestMessage = function createTestMessage(idsSenders, idsChannels) {
  return new this({
    senderId: faker.random.arrayElement(idsSenders),
    channelId: faker.random.arrayElement(idsChannels),
    text: faker.lorem.sentences(),
    timestamp: faker.date.between( new Date(Date.now() - 100 * 1000), new Date(Date.now())),
  });
};

message.statics.getForChannels = function getForChannels(channelIds) { return this.find({ channelId: { $in: channelIds } }); };

message.statics.add = function add(data, cb) {
  return new this(data).save(cb);
};

export default function getMessageModel() {
  return mongoose.model('Message', message);
}
