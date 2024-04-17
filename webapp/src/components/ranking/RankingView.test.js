import { render , screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import RankingView from './RankingView';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { UserContextProvider} from '../loginAndRegistration/UserContext';
i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;

const mockAxios = new MockAdapter(axios);
describe('RankingView component', () => {
    
    
    it('renders title', () => {
      act(()=>{
        render(<UserContextProvider><MemoryRouter><RankingView /></MemoryRouter></UserContextProvider>);
      })
        const text = screen.getByText(i18en.t('ranking.ranking'));
        expect(text).toBeInTheDocument();
    });
    it('renders Loading if the call to the gateway has not been done', () => {
      act(()=>{
        render(<UserContextProvider><MemoryRouter><RankingView /></MemoryRouter></UserContextProvider>);
      })
        const text = screen.getByText('Loading...');
        expect(text).toBeInTheDocument();
    });
});

  describe('RankingView component with endpoint', ()=>{
    mockAxios.onGet('http://localhost:8000/record/ranking/top10').reply(200, 
      {
          "usersCompetitiveStats": [
            {
              "_id": "user",
              "totalPoints": 1000,
              "totalCompetitiveGames": 4
            },
            {
              "_id": "user2",
              "totalPoints": 900,
              "totalCompetitiveGames": 2
            },
            {
              "_id": "user3",
              "totalPoints": 800,
              "totalCompetitiveGames": 3
            },
            {
              "_id": "user4",
              "totalPoints": 700,
              "totalCompetitiveGames": 5
            },
            {
              "_id": "user5",
              "totalPoints": 600,
              "totalCompetitiveGames": 6
            },
            {
              "_id": "user6",
              "totalPoints": 500,
              "totalCompetitiveGames": 7
            },
            {
              "_id": "user7",
              "totalPoints": 400,
              "totalCompetitiveGames": 8
            },
            {
              "_id": "user8",
              "totalPoints": 300,
              "totalCompetitiveGames": 9
            },
            {
              "_id": "user9",
              "totalPoints": 200,
              "totalCompetitiveGames": 10
            },
            {
              "_id": "user10",
              "totalPoints": 100,
              "totalCompetitiveGames": 11
            }
          ]
    });

    mockAxios.onGet('http://localhost:8000/record/ranking/user').reply(200,
    {
      "_id": "myUser",
      "totalPoints": 250,
      "totalCompetitiveGames": 1
    }
    );

    it('renders position all headers in the table',async ()=>{
      
      await act(async () =>{
          await render(<UserContextProvider><MemoryRouter><RankingView /></MemoryRouter></UserContextProvider>);
          
      })
      await waitFor(() => expect(screen.getByText(i18en.t('ranking.position'))).toBeInTheDocument());
          expect(screen.getByText(i18en.t('ranking.username'))).toBeInTheDocument()
          expect(screen.getByText(i18en.t('ranking.points'))).toBeInTheDocument()
          expect(screen.getByText(i18en.t('ranking.num_games'))).toBeInTheDocument()
  });
  it('renders position all users usernames',async ()=>{
    await act(async () =>{
        await render(<UserContextProvider><MemoryRouter><RankingView /></MemoryRouter></UserContextProvider>);
        
    })
    await waitFor(() => expect(screen.getByText(i18en.t('ranking.position'))).toBeInTheDocument());
        //expect(screen.getByText("user1")).toBeInTheDocument()
        expect(screen.getByText("user2")).toBeInTheDocument()
        expect(screen.getByText("user3")).toBeInTheDocument()
        expect(screen.getByText("user4")).toBeInTheDocument()
        expect(screen.getByText("user5")).toBeInTheDocument()
        expect(screen.getByText("user6")).toBeInTheDocument()
        expect(screen.getByText("user7")).toBeInTheDocument()
        expect(screen.getByText("user8")).toBeInTheDocument()
        expect(screen.getByText("user9")).toBeInTheDocument()
        expect(screen.getByText("user10")).toBeInTheDocument()
  });
  it('renders position all users totalPoints',async ()=>{
  
  await act(async () =>{
      await render(<UserContextProvider><MemoryRouter><RankingView /></MemoryRouter></UserContextProvider>);
      
  })
  await waitFor(() => expect(screen.getByText(i18en.t('ranking.position'))).toBeInTheDocument());
      expect(screen.getByText("1000")).toBeInTheDocument()
      expect(screen.getByText("900")).toBeInTheDocument()
      expect(screen.getByText("800")).toBeInTheDocument()
      expect(screen.getByText("700")).toBeInTheDocument()
      expect(screen.getByText("600")).toBeInTheDocument()
      expect(screen.getByText("500")).toBeInTheDocument()
      expect(screen.getByText("400")).toBeInTheDocument()
      expect(screen.getByText("300")).toBeInTheDocument()
      expect(screen.getByText("200")).toBeInTheDocument()
  });
  it('renders position all users competitive games',async ()=>{
  
  await act(async () =>{
    await render(<UserContextProvider><MemoryRouter><RankingView /></MemoryRouter></UserContextProvider>);
    
  })
  await waitFor(() => expect(screen.getByText(i18en.t('ranking.position'))).toBeInTheDocument());
  
  expect(screen.getAllByText(/2/).length).toBeGreaterThanOrEqual(2);//hay dos pq hay una posicion
  expect(screen.getAllByText(/5/).length).toBeGreaterThanOrEqual(2);//hay dos pq hay una posicion
  expect(screen.getAllByText(/6/).length).toBeGreaterThanOrEqual(2);//hay dos pq hay una posicion
  expect(screen.getAllByText(/7/).length).toBeGreaterThanOrEqual(2);//hay dos pq hay una posicion
  });
  it('renders position all users competitive games',async ()=>{
 
  await act(async () =>{
    await render(<UserContextProvider><MemoryRouter><RankingView /></MemoryRouter></UserContextProvider>);
    
  })
  await waitFor(() => expect(screen.getByText(i18en.t('ranking.position'))).toBeInTheDocument());

    expect(screen.getByText("myUser")).toBeInTheDocument()
    expect(screen.getByText("250")).toBeInTheDocument()
    //should be one if only your rank is shown
    expect(screen.getAllByText(/1/).length).toBeGreaterThanOrEqual(2);//hay dos pq hay una posicion

  });
})

