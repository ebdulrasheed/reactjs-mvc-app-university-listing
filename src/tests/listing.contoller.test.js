import UniversityModel from '../models/university.model';
import listingController from '../controllers/listing.controller';

// Mocking the UniversityModel module
jest.mock('../models/university.model');

describe('listingController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchData', async () => {
    const mockData = [{ id: 1, name: 'University 1' }];
    UniversityModel.fetchUniversitiesData.mockResolvedValueOnce(mockData);

    const result = await listingController.fetchData();

    expect(UniversityModel.fetchUniversitiesData).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });

  test('sortTable with correct columnIndex', () => {
    const columnIndex = 2;
    listingController.sortTable(columnIndex);
    expect(UniversityModel.sortTable).toHaveBeenCalledTimes(1);
    expect(UniversityModel.sortTable).toHaveBeenCalledWith(columnIndex);
  });

  test('searchTable with correct filter', () => {
    const filter = 'search query';
    listingController.searchTable(filter);
    expect(UniversityModel.searchTable).toHaveBeenCalledTimes(1);
    expect(UniversityModel.searchTable).toHaveBeenCalledWith(filter);
  });

  test('deleteRow with correct index', () => {
    const index = 3;
    listingController.deleteRow(index);
    expect(UniversityModel.deleteRow).toHaveBeenCalledTimes(1);
    expect(UniversityModel.deleteRow).toHaveBeenCalledWith(index);
  });
});
