import UniversityModel from '../models/university.model';
import DetailsController from '../controllers/details.controller';

jest.mock('../models/university.model');

describe('DetailsController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Call getUniversityById', () => {
    const id = '123';
    const obj = { id, name: 'uni' }
    UniversityModel.getUniversityById.mockReturnValueOnce(obj);
    const result = DetailsController.getUniversityById(id);
    expect(UniversityModel.getUniversityById).toHaveBeenCalledTimes(1);
    expect(UniversityModel.getUniversityById).toHaveBeenCalledWith(id);
    expect(result).toEqual(obj);
  });
});