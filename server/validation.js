import getMessageModel from './models/message';
import getUserModel from './models/user';

const Message = getMessageModel();
const User = getUserModel();

import Linkify from 'linkify-it';
import fetch from 'node-fetch';

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
// TODO: tomorrow refactor this hell
export function parseMessage(message) {
  console.log('message', message);
  const link = new Linkify();
  const matches = link.match(message.text);
  console.log('matches', matches);

  return new Promise((resolve) => {
    if (matches === null) {
      resolve(null);
      // reject('Links not found');
    }
    const promises = matches.map(match => {
      return fetch(`http://api.embed.ly/1/oembed?url=${match.url}&key=0ccb2018f041465fae7e0d65154b0399`);
    });
    // console.log(promises);
    Promise.all(promises)
      .then(responses => {
        console.log('responses', responses);
        const jsons = responses.map(response => response.json());
        console.log('jsons', jsons);
        return jsons;
      })
      .then(jsons => {
        Promise.all(jsons)
          .then(datas => {
            console.log('dates', datas);
            const result = datas.map((data, i) => {
              data.text = matches[i].text;
              return data;
            });
            resolve(result);
          });
      })
    ;
  });
}


