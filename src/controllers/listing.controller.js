import UniversityModel from '../models/university.model';

const listingController = {
    fetchData: async () => {
        return await UniversityModel.fetchUniversitiesData();
    },

    sortTable: (columnIndex) => {
        return UniversityModel.sortTable(columnIndex);
    },

    searchTable: (filter) => {
        return UniversityModel.searchTable(filter);
    },

    deleteRow: (index) => {
        return UniversityModel.deleteRow(index);
    }
};

export default listingController;