import React from 'react';
import { 
    BrowserRouter as Router,
    Routes,
    Route,  
    Navigate,
    NavLink
    
  } from 'react-router-dom'
import Layout from './hocs/Layout';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';
import BlogList from './components/Blist';
import BlogListDetail from './components/BlistDetail';
import NoFoundPage from './components/NoFoundPage';
import Ruta from './router/Ruta';
import RutaAnidada from './router/RutaAnidada';

const App = () => (
    <Router>

        <Layout/>
        
        <Routes>
            <Route path="ruta/*" element={<Ruta />} > 
           
                <Route path="rutaAnidada" element={<RutaAnidada/>} />       

            </Route>


            
            <Route exact="true" path="/" element={<Home />} />
            <Route exact="true" path="/blog" element={<Blog />} />
            <Route exact="true" path='/blog/:slug' element={<BlogDetail />} />


            <Route path="blogList" element={<BlogList />}>
            </Route>
            <Route path="blogList/:slug" element={<BlogListDetail />} />



           {/* 
       <Route exact="true" path='/category/:id' element={<Category />} /> */}



            {/* NO FOUND PAGE */}
            {/* <Route  path="*" element={<NoFoundPage />} /> */}
            <Route  path="*" element={<Navigate to="/" />} />
            {/* NO FOUND PAGE */}




        </Routes>
    </Router>


);

export default App;