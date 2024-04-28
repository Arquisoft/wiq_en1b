import CreationHistoricalRecord from './CreationHistoricalRecord';
import axios from 'axios';

jest.mock('axios'); // Mock axios for tests

describe('CreationHistoricalRecord', () => {
  let recordInstance;

  beforeEach(() => {
    recordInstance = new CreationHistoricalRecord(); // Create a new instance before each test
  });

  it('should initialize an empty record', () => {
    const record = recordInstance.getRecord();
    
    // Check that the initial record is empty
    expect(record.game.questions).toEqual([]); // The list of questions should be empty
    expect(record.game.points).toBeUndefined(); // Points should not be defined initially
    expect(record.game.date).toBeUndefined(); // Date should not be defined initially
  });

  it('should add a question to the record', () => {
    recordInstance.addQuestion('Question?', ['A', 'B', 'C'], 'B', 'C', 0);

    const record = recordInstance.getRecord();

    // Verify that the question was added correctly
    expect(record.game.questions.length).toBe(1);
    expect(record.game.questions[0].question).toBe('Question?');
  });

  it('should send the record and reset the state on success', async () => {
    const user = 'testuser';
    const token = 'mockedToken';

    axios.post.mockResolvedValue({ data: 'Success' }); // Simulate a successful response

    await recordInstance.sendRecord(user, token); // Call sendRecord

    // Check that the correct call was made to axios.post
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringMatching(/\/record$/), // Verify the URL
      {
        user: 'testuser',
        game: recordInstance.getRecord().game,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'token': 'mockedToken',
        },
      }
    );

    // Verify that the record was reset after sending
    const record = recordInstance.getRecord();
    expect(record.game.questions).toEqual([]);
  });

  it('should handle errors when sending the record', async () => {
    const user = 'testuser';
    const token = 'mockedToken';

    axios.post.mockRejectedValue(new Error('Request failed')); // Simulate an error

    console.error = jest.fn(); // Mock console.error to avoid noise in the console

    await recordInstance.sendRecord(user, token); // Call sendRecord

    // Check that console.error was called with the correct message
    expect(console.error).toHaveBeenCalledWith('Error al enviar el registro:', 'Request failed');
  });

  it('should set points correctly', () => {
    recordInstance.setPoints(100); // Set points to 100

    const record = recordInstance.getRecord();

    // Verify that the points were set correctly
    expect(record.game.points).toBe(100);
  });

  it('should set date correctly', () => {
    const testDate = new Date('2023-01-01T00:00:00Z'); // Test date
    recordInstance.setDate(testDate); // Set the date

    const record = recordInstance.getRecord();

    // Verify that the date was set correctly
    expect(record.game.date).toEqual(testDate);
  });

  it('should set competitive correctly', () => {
    recordInstance.setCompetitive(true); // Set competitive to true

    const record = recordInstance.getRecord();

    // Verify that the competitive field was set correctly
    expect(record.game.competitive).toBe(true); // Should be true

    // Also verify the change to false
    recordInstance.setCompetitive(false);
    expect(record.game.competitive).toBe(false); // Should be false
  });
});
