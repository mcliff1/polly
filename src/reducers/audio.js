/**
 * @file audio.js
 * combined state object for polly app
 *
 */
const defaultState = {
  text: '',
  translatedText: null,
  audioList: '',
  selectedVoice: 'Joanna',
  lastGenerated: null,
  searchFilter: '*',
  needsUpdate: false,
  selectedLanguage: 'English',
  audioItem: ''
}



/**
 * Main reducer functions
 */
const audio = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return {
        ...state,
        text: action.text
      };
    case 'UPDATE_FILTER':
      return {
        ...state,
        searchFilter: action.payload
      };
    case 'SELECT_LANGUAGE':
      return {
        ...state,
        selectedLanguage: action.payload,
        translatedText: (action.payload === 'English' ? null : 'Sprechen Sie')
      };
    case 'SELECT_VOICE':
      return {
        ...state,
        selectedVoice: action.payload,
      };
    case 'GENERATE_AUDIO_FULFILLED':
      return {
        ...state,
        lastGenerated: action.payload['recordId'],
        searchFilter:  action.payload['recordId'],
        needsUpdate: true
      };
    case 'UPDATE_LIST_FULFILLED':
      return {
        ...state,
        audioList: action.payload,
        needsUpdate: false
      };
    case 'UPDATE_ITEM_FULFILLED':
      return {
        ...state,
        audioItem: action.payload[0],
        needsUpdate: false
      };
    default:
      return state;
  }
}

export default audio;
