import React from 'react';



const AudioItemDetail = ({item}) => {
  return(
    <div>
    <table><tbody>
    <tr>
      <td>{item.id}</td>
      <td>{item.voice}</td>
      <td>{item.text}</td>
      <td>{item.status}</td>
      <td>
        {
          typeof item['url'] === 'undefined' ?
          <div></div>
          :
          <audio controls>
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
