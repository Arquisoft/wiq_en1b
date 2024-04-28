import React, { useState } from 'react';
import RankingRetriever from './RankingRetriever';
import {useTranslation} from "react-i18next";
import Loader from "../fragments/Loader"
import BackButton from '../fragments/BackButtonToGameMenu';
import Cookies from 'js-cookie'

const retriever = new RankingRetriever();

const RankingView = () => {
  const[t] = useTranslation("global");
  const cookie = JSON.parse(Cookies.get('user'))   

  const [rankingData, setRankingData] = useState(null);
  const [myRankingData, setMyRankingData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(cookie.username);
  
  

  const getRanking = async () => {
    try {
      var ranking = await retriever.getTopTen(cookie.token);
      setRankingData(ranking.usersCompetitiveStats);
      var myrank = await retriever.getUser(cookie.username, cookie.token);
      setMyRankingData(myrank);
    } catch (error) {
    }
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    if(searchTerm.length!==0){
      try {
        const rank = await retriever.getUser(searchTerm, cookie.token);
        setMyRankingData(rank);
      } catch (error) {
      }
    }
    
  }
  if(rankingData==null || myRankingData == null){
    getRanking();
  }

  return (
    <div className='table'>
      <BackButton t={t} />
      <h1>{t("ranking.ranking")}</h1>
      {rankingData && rankingData.length > 0 && myRankingData ? (
        <>
        <form onSubmit={handleSearch}>
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
                <td>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("ranking.enter_username")}
                />
                </td>
                <td>
                  <div>
                    <button id='search' type="submit">{t("ranking.search")}</button>
                  </div>
                </td>
              <td colSpan="2"></td>
              </tr>
              <tr>
                <td>{myRankingData.position}</td>
                <td>{myRankingData._id}</td>
                <td>{myRankingData.totalPoints}</td>
                <td>{myRankingData.totalCompetitiveGames}</td>
              </tr>
            </tbody>
          </table>
        </form>
        </>
      ) : (
        < Loader />
      )}
    </div>
  );
};

export default RankingView;
