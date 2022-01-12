import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';

const App = () => (


    <Router>                
        <Layout>     {/* Transmite la info a los componentes */}
          
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route exact path='/blog' component={<Blog/>} />
                <Route exact path='/category/:id' component={<Category/>} />
                <Route exact path='/blog/:id' component={<BlogDetail/>} />
            </Routes>
        </Layout>
    </Router>
);

export default App;