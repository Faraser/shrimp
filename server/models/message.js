import mongoose from 'mongoose';
import {isEmpty, getToObjectOptions} from './utils';

const ObjectId = mongoose.Types.ObjectId;

const message = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  channelId: mongoose.Schema.Types.ObjectId,
  text: String,
  timestamp: { type: Date, default: Date.now },
  edited: { type: Boolean, default: false },
  images: [String],
  embeded: [],
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

message.statics.getForChannels = function getForChannels(channelIds) { return this.find({ channelId: { $in: channelIds } }); };

message.statics.add = function add(data) {
  return new this(data).save().then(result => result.toObject());
};

message.statics.edit = function edit(data) {
  return new Promise((resolve, reject) => {
    this.findOneAndUpdate( {_id: new ObjectId(data.messageId)}, {
      text: data.text,
      timestamp: Date.now(),
      edited: true,
      images: data.images,
    }, {new: true})
      .then(editedMessage => resolve(editedMessage.toObject()))
      .catch(err => reject(err));
  });
};

message.statics.getById = function getById(id) {
  return new Promise((resolve, reject) => {
    this.findOne({_id: new ObjectId(id)}, (err, m) => {
      if (err) {
        reject(err);
      } else {
        resolve(m);
      }
    });
  });
};


message.statics.addEmbeded = function addEmbeded(id, data) {
  return new Promise((resolve, reject) => {
    this.findOneAndUpdate({_id: new ObjectId(id)}, {
      $addToSet: {
        images: {$each: data.filter(item => item.type === 'photo').map(item => item.url)},
      },
      embeded: data.filter(item => item.type !== 'photo'),
    }, {new: true})
      .then(result => resolve(result.toObject()))
      .catch(err => reject(err));
  });
};

export default function getMessageModel() {
  return mongoose.model('Message', message);
}
