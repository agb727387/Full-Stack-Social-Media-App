import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AppOne from './AppOne';
import './index.css';

ReactDOM.render(
    <Router>
<AppOne />
</Router>,
 document.getElementById('root')
);