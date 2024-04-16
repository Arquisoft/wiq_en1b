import React, { useState, useEffect } from 'react';
import RankingRetriever from './RankingRetriever';
const retriever = new RankingRetriever();

const RankingView = () => {
  const [rankingData, setRankingData] = useState(null);

  const getRanking = async () => {
    try {
      console.log("caalling")
      var ranking = await retriever.getTopTen();
      setRankingData(ranking.usersCompetitiveStats);
      console.log(ranking)
      console.log(rankingData)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRanking();
  }, []); 

  return (
    <div>
      <h1>Ranking</h1>
      {console.log("DIV")}
      {console.log(rankingData)}
      {rankingData && rankingData.length > 0 ? (
        
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Username</th>
              <th>Points</th>
              <th>Num of Games</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.totalPoints}</td> 
                <td>{user.totalCompetitiveGames}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RankingView;
