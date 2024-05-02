import UniversityModel from '../models/university.model';

const DetailsController = {
    getUniversityById: (id) => {
        return UniversityModel.getUniversityById(id);
    },
};

export default DetailsController;