import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListingPage from './views/listing.view';
import DetailsPage from './views/details.view';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<ListingPage />} />
                <Route path='/details/:id' element={<DetailsPage />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;