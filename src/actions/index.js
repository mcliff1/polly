/**
 * @file index.js
 * main action class for polly REACT ui
 */


// utility const for API
//export const API_ENDPOINT = 'https://polly-dev-api.mattcliff.net/pollydev';
export const API_ENDPOINT = process.env.API_ENDPOINT + '/pollydev';
console.log('using endpoint:' +          API_ENDPOINT);


export const updateText = (text) => ({
  type: 'UPDATE_TEXT',
  text
});


export const selectVoice = (selected) => ({
  type: 'SELECT_VOICE',
  payload: selected
});

export const selectLanguage = (selected) => ({
  type: 'SELECT_LANGUAGE',
  payload: selected
});


export const updateFilter = (filter) => ({
  type: 'UPDATE_FILTER',
  payload: filter
});



export const generateAudio = (voice, language, text) => ({
  type: 'GENERATE_AUDIO',
  payload: fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json',
      'Accept' : 'application/json, text/plain, */*'
      },

      body: '{ "voice" : "' + voice +
              '", "text" : "' + text + '" }'
    }).then(res => res.json())
});


export const updateItem = (postId) => ({
  type: 'UPDATE_ITEM',
  payload: fetch(API_ENDPOINT + '?postId=' + postId, {
      method: 'GET',
      headers: { 'Content-Type' : 'application/json' }
    }).then(res => res.json())
});


export const updateList = (filter) => ({
  type: 'UPDATE_LIST',
  payload: fetch(API_ENDPOINT + '?postId=' + filter, {
      method: 'GET',
      headers: { 'Content-Type' : 'application/json' }
    }).then(res => res.json())
});
