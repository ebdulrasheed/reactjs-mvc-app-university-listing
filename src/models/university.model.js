import { getCachedData } from '../utils/localstorage';
const UniversityModel = {
    rows: [],
    filteredRows: [],
    sortBy: null,
    asc: true,

    async fetchUniversitiesData(isMainPage = true) {
        try {
            const cachedData = getCachedData('universitiesData');
            if (!isMainPage && cachedData?.length > 0) {
                this.rows = cachedData;
                this.filteredRows = cachedData;
            } else {
                const response = await fetch('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates');
                const data = await response.json();
                const universities = data.map((item, i) => ({ ...item, id: i }));
                localStorage.setItem('universitiesData', JSON.stringify(universities));
                this.rows = universities;
                this.filteredRows = universities;
            }
            return this.rows;
        } catch (error) {
            console.error('Error fetching data:', error);
            const cachedData = getCachedData('universitiesData');
            if (cachedData?.length > 0) {
                this.rows = cachedData;
                this.filteredRows = cachedData;
                return cachedData;
            }
            alert('Error in fetching data from the server');
            return [];
        }
    },

    sortTable(columnIndex) {
        this.sortBy = columnIndex;
        const sortedRows = [...this.filteredRows].sort((a, b) => {
            const aValue = a[Object.keys(a)[columnIndex]];
            const bValue = b[Object.keys(b)[columnIndex]];
            return this.asc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
        this.filteredRows = sortedRows;
        this.asc = !this.asc;
        return sortedRows;
    },

    searchTable(filter) {
        const filteredData = this.rows.filter(row =>
            row.name.toUpperCase().includes(filter.toUpperCase())
        );
        this.filteredRows = filteredData;
        return filteredData;
    },

    deleteRow(index) {
        this.rows.splice(index, 1);
        this.filteredRows = this.rows.slice(); // Update filtered rows after deletion
        localStorage.setItem('universitiesData', JSON.stringify(this.rows));
        return this.filteredRows;
    },

    getUniversityById(id) {
        if (this.rows.length === 0) {
            this.fetchUniversitiesData(false);
        }
        return this.rows.find((row) => row.id === Number(id));
    }
};

export default UniversityModel;