import UniversityModel from '../models/university.model';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('UniversityModel', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('fetchUniversitiesData fetches data from API if not cached', async () => {
    const mockData = [{ id: 0, name: 'University 1' }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );

    const result = await UniversityModel.fetchUniversitiesData();

    expect(result).toEqual(mockData);
    expect(localStorage.getItem('universitiesData')).toEqual(JSON.stringify(mockData));
  });

  test('fetchUniversitiesData returns cached data if available', async () => {
    const cachedData = [{ id: 1, name: 'Cached University' }];
    localStorage.setItem('universitiesData', JSON.stringify(cachedData));

    const result = await UniversityModel.fetchUniversitiesData();

    expect(result).toEqual(cachedData);
  });

  test('searchTable filters rows correctly', () => {
    UniversityModel.rows = [{ id: 1, name: 'University 1' }, { id: 2, name: 'University 2' }];
    const filteredData = UniversityModel.searchTable('Uni');

    expect(filteredData).toEqual([{ id: 1, name: 'University 1' }, { id: 2, name: 'University 2' }]);
  });

  test('deleteRow deletes row correctly', () => {
    UniversityModel.rows = [{ id: 1, name: 'University 1' }, { id: 2, name: 'University 2' }];
    UniversityModel.deleteRow(1);

    expect(UniversityModel.rows).toEqual([{ id: 1, name: 'University 1' }]);
  });

  test('getUniversityById returns correct university', () => {
    UniversityModel.rows = [{ id: 1, name: 'University 1' }, { id: 2, name: 'University 2' }];
    const result = UniversityModel.getUniversityById(2);

    expect(result).toEqual({ id: 2, name: 'University 2' });
  });

});
