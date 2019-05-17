import React from 'react';
// import AudioListViewDetail from './AudioListViewDetail';


const AudioListView = ({list}) => {
  return(
    <div>

  <table id="posts">
    <colgroup>
      <col style={{width:"10%"}}/>
      <col style={{width:"7%"}}/>
      <col style={{width:"45%"}}/>
      <col style={{width:"8%"}}/>
      <col style={{width:"25%"}}/>
      <col style={{width:"5%"}}/>
    </colgroup>
    <tbody>
      <tr>
        <th>Post ID</th>
        <th>Voice</th>
        <th>Post</th>
        <th>Status</th>
        <th>Player</th>
        <th></th>
      </tr>

      {
        list ?
        list.map((item, idx) => {
          return(
          <tr key={idx}>
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
          </tr>
)
        })
        :
        <tr><td colSpan="5">No data</td></tr>
      }


    </tbody>
  </table>


    </div>
  );
}

export default AudioListView;
