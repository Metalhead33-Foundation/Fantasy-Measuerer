import React from 'react';
import {Route, Routes} from 'react-router-dom'
import FantasyMeasurer from './modules/fantasy-measurer/components/Index'

const MyRoutes: React.FC = () => (
    <Routes>
        <Route path="/fantasy-measurer" element={<FantasyMeasurer />} />
    </Routes>
)

export default MyRoutes
