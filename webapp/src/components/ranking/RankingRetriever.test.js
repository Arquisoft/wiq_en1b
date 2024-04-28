import axios from 'axios';
import RankingRetriever from './RankingRetriever'; // Ruta a tu archivo RankingRetriever

jest.mock('axios'); // Simula las llamadas a Axios

describe('RankingRetriever Tests', () => {
  let rankingRetriever;

  beforeEach(() => {
    rankingRetriever = new RankingRetriever();
  });

  test('Throws error if endpoint is not set for getTopTen', async () => {
    axios.get.mockRejectedValue(new Error('Endpoint not found')); // Simula error
    
    try {
      await rankingRetriever.getTopTen('dummy-token');
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Verifica que se lanzó un error
      expect(error.message).toContain('Endpoint not found'); // Verifica el mensaje del error
    }
  });

  test('Throws error if endpoint is not set for getUser', async () => {
    axios.get.mockRejectedValue(new Error('Endpoint not found')); // Simula error
    
    try {
      await rankingRetriever.getUser('dummy-user', 'dummy-token');
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Verifica que se lanzó un error
      expect(error.message).toContain('Endpoint not found'); // Verifica el mensaje del error
    }
  });

  test('should have the base url', () => {
    expect(rankingRetriever.apiUrl).toEqual('http://localhost:8000/record/ranking')
  })

  test('should not have the base url', () => {
    process.env.REACT_APP_API_ENDPOINT = 'test';
    rankingRetriever = new RankingRetriever();
    expect(rankingRetriever.apiUrl).toEqual('test/record/ranking')
  })
});
