import React from 'react';
import PropTypes from 'prop-types';

const voiceList = [
  { id: "Ivy", label: 'Ivy [English - American]' },
  { id: "Joanna", label: 'Joanna [English - American]' },
  { id: "Joey", label: 'Joey [English - American]' },
  { id: "Justin", label: 'Justin [English - American]' },
  { id: "Kendra", label: 'Kendra [English - American]' },
  { id: "Kimberly", label: 'Kimberly [English - American]' },
  { id: "Salli", label: 'Salli [English - American]' },
  { id: "Matthew", label: 'Matthew [English - American]' },
  { id: "Nicole", label: 'Nicole [English - Australian]' },
  { id: "Russell", label: 'Russell [English - Australian]' },
  { id: "Emma", label: 'Emma [English - British]' },
  { id: "Brian", label: 'Brian [English - British]' },
  { id: "Amy", label: 'Amy [English - British]' },
  { id: "Aditi", label: 'Raveena [English - Indian]' },
  { id: "Raveena", label: 'Raveena [English - Indian]' },
  { id: "Geraint", label: 'Geraint [English - Welsh]' },
  { id: "Ricardo", label: 'Ricardo [Brazilian Portuguese]' },
  { id: "Vitória", label: 'Vitória [Brazilian Portuguese]' },
  { id: "Lotte", label: 'Lotte [Dutch]' },
  { id: "Ruben", label: 'Ruben [Dutch]' },
  { id: "Mathieu", label: 'Mathieu [French]' },
  { id: "Céline", label: 'Céline [French]' },
  { id: "Léa", label: 'Léa [French]' },
  { id: "Chantal", label: 'Chantal [Canadian French]' },
  { id: "Marlene", label: 'Marlene [German]' },
  { id: "Hans", label: 'Hans [German]' },
  { id: "Vicki", label: 'Vicki [German]' },
  { id: "Dóra", label: 'Dóra [Icelandic]' },
  { id: "Karl", label: 'Karl [Icelandic]' },
  { id: "Carla", label: 'Carla [Italian]' },
  { id: "Giorgio", label: 'Giorgio [Italian]' },
  { id: "Mizuki", label: 'Mizuki [Japanese]' },
  { id: "Takumi", label: 'Takumi [Japanese]' },
  { id: "Seoyeon", label: 'Seoyeon [Korean]' },
  { id: "Liv", label: 'Liv [Norwegian]' },
  { id: "Maja", label: 'Maja [Polish]' },
  { id: "Jacek", label: 'Jacek [Polish]' },
  { id: "Jan", label: 'Jan [Polish]' },
  { id: "Ewa", label: 'Ewa [Polish]' },
  { id: "Ricardo", label: 'Ricardo [Portuquese - Brazilian]' },
  { id: "Victoria", label: 'Victoria [Portuquese - Brazilian]' },
  { id: "Cristiano", label: 'Cristiano [Portuquese]' },
  { id: "Inês", label: 'Inês [Portuquese]' },
  { id: "Carmen", label: 'Carmen [Romanian]' },
  { id: "Maxim", label: 'Maxim [Russian]' },
  { id: "Tatyana", label: 'Tatyana [Russian]' },
  { id: "Enrique", label: 'Enrique [Spanish]' },
  { id: "Penélope", label: 'Penélope [US Spanish]' },
  { id: "Miguel", label: 'Miguel [US Spanish]' },
  { id: "Conchita", label: 'Conchita [Castilian Spanish]' },
  { id: "Astrid", label: 'Astrid [Swedish]' },
  { id: "Filiz", label: 'Filiz [Turkish]' },
  { id: "Gwyneth", label: 'Gwyneth [Welsh]' },
]

const languageList = [
  { id: 'English', label: 'English'},
  { id: 'French', label: 'French'},
  { id: 'German', label: 'German'},
  { id: 'Spanish', label: 'Spanish'},
  { id: 'Portuguese', label: 'Portuguese'},
]

const TextToAudioControl = ({handleVoice, selectedLanguage, handleLanguage, handleGenerate, selectedVoice}) => {
  return(
    <div>
      Text to Audio Control
      a drop down to select voice and generate
      <div>
      <select id='selectVoice'
          onChange={(event) => handleVoice(event.target.value)}
          defaultValue={selectedVoice}>
        {voiceList.map((voiceItem, index) =>
          <option key={index} value={voiceItem.id}>{voiceItem.label}</option>,
        )}
      </select>
      <select id='selectLanguage'
          onChange={(event) => handleLanguage(event.target.value)}
          defaultValue={selectedLanguage}>
        {languageList.map((item, index) =>
          <option key={index} value={item.id}>{item.label}</option>,
        )}
      </select>

      <button onClick={() => handleGenerate(selectedVoice, selectedLanguage)}>Generate</button>
      </div>
      <br/>

    </div>
  );
}

TextToAudioControl.propTypes = {
  handleGenerate: PropTypes.func.isRequired,
  selectedVoice: PropTypes.string.isRequired,
  handleVoice: PropTypes.func.isRequired,
  handleLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
}
export default TextToAudioControl;
