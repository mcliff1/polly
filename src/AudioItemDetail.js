import React from 'react';


const AudioItemDetail = ({item, lastGenerated}) => {
  return(
    <div>
    <table border="0"><tbody>
    <tr>
      <td>{lastGenerated}</td>
      <td>{item.id}</td>
      <td>{item.voice}</td>
      <td>{item.text}</td>
      <td>{item.status}</td>
      <td>
        {
          typeof item['url'] === 'undefined' ?
          <div>no url</div>
          :
          <audio controls preload="auto">
            <source src={item.url} type='audio/mpeg' />
          </audio>
        }
      </td>
      <td>del</td>
    </tr></tbody></table>
    </div>
  );
}

export default AudioItemDetail;
