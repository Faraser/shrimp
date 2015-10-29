import getMessageModel from './models/message';
import getUserModel from './models/user';
import {M} from '../constants.js';
import Linkify from 'linkify-it';
import fetch from 'node-fetch';

const Message = getMessageModel();
const User = getUserModel();


export function checkEditPermission(sessionId, messageId) {
  return new Promise((resolve, reject) => {
    Promise.all([User.getBySessionId(sessionId), Message.getById(messageId)]).then(([user, message]) => {
      if (user.id.toString() === message.senderId.toString()) {
        resolve();
      } else {
        reject(new Error('Permission denied'));
      }
    });
  });
}


export function checkAddPermission(sessionId, senderId) {
  return new Promise((resolve, reject) => {
    User.getBySessionId(sessionId).then((user) => {
      if (user.id.toString() === senderId) {
        resolve();
      } else {
        reject(new Error('Permission denied'));
      }
    });
  });
}


export function parseUrlsInMessage(message) {
  const link = new Linkify();
  const matches = link.match(message.text);
  return new Promise((resolve, reject) => {
    if (matches === null) {
      reject('Urls not found');
    }
    const requests = matches.map(match => fetch(`http://api.embed.ly/1/oembed?url=${match.url}&key=${M.API_KEY}`));
    Promise.all(requests)
      .then(responses => {
        return responses.filter((item, i) => {
          if (item.status !== 200) {
            matches.splice(i, 1);
            return false;
          }
          return true;
        });
      })
      .then(responses => Promise.all(responses.map(item => item.json())))
      .then(data => {
        const result = data.map((item, i) => {
          item.text = matches[i].text;
          return item;
        });
        resolve(result);
      })
      .catch(err => reject(err));
  });
}

