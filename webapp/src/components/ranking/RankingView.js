import React, { useState, useEffect } from 'react';
import RankingRetriever from './RankingRetriever';
import {useTranslation} from "react-i18next";
import Loader from "../fragments/Loader"
const retriever = new RankingRetriever();

const RankingView = () => {
  const [rankingData, setRankingData] = useState(null);
  const [myRankingData, setMyRankingData] = useState(null);
  const[t] = useTranslation("global");
  const getRanking = async () => {
    try {
      var ranking = await retriever.getTopTen();
      setRankingData(ranking.usersCompetitiveStats);
      var myrank = await retriever.getMyPosition();
      setMyRankingData(myrank);
      console.log(myrank)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRanking();
  }, []); 

  return (
    <div className='table'>
      <h1>{t("ranking.ranking")}</h1>
      {rankingData && rankingData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>{t("ranking.position")}</th>
              <th>{t("ranking.username")}</th>
              <th>{t("ranking.points")}</th>
              <th>{t("ranking.num_games")}</th>
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
            {/* Blank row */}
            <tr className="penultimate-row">
              <td colSpan="4"></td>
            </tr>
            <tr>
              <td>0</td>
              <td>{myRankingData._id}</td>
              <td>{myRankingData.totalPoints}</td>
              <td>{myRankingData.totalCompetitiveGames}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        < Loader />
      )}
    </div>
  );
};

export default RankingView;
