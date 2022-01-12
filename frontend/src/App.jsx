import React from 'react';
import { 
    BrowserRouter as Router,
    Routes,
    Route,    
  } from 'react-router-dom'
import Layout from './hocs/Layout';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';

const App = () => (
<div className="App">

    <Router>

        <Layout/>
        
        <Routes>

            <Route exact="true" path="/" element={<Home />} />
            <Route exact="true" path="/blog" element={<Blog />} />
            <Route exact="true" path='/category/:id' element={<Category />} />
            <Route exact="true" path='/blog/:id' element={<BlogDetail />} />
           
        </Routes>



    </Router>
</div>

);

export default App;