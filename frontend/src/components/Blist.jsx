import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react'
import { Link} from 'react-router-dom';




const BlogList = () => {

    // GET BLOGS
    const [blogsList, setBlogsList] = useState([]);
    const getList = ()=> {
        axios.get("http://localhost:8000/api/blog/")
        .then(res => {
          const datos = res.data;
          setBlogsList(datos);      
        })
      }



    useEffect(() => {

      getList()
    }, [])


    const displayContent = (i) => {
      return {__html: i.content}
  };
    return (
        <div className='container'>

          

          {blogsList.map( iten=>
          <div key={iten.id} >


            <h1>{iten.title}</h1>     
            <div className="d-flex d-flex-column">
            <img width='200' height='250' src={iten.thumbnail} alt='thumbnail' />
            <span>Content:  </span> 
            <p  dangerouslySetInnerHTML={displayContent(iten) } ></p>



            </div>    
           

            <p className='lead mb-5'>
              <Link to={`/blogList/${iten.slug}`}
                className='font-weight-bold'>
                Continuar leyendo
              </Link>
            </p>


            <hr />



          </div>
          
            
            )}
            

        </div>
    )
}

export default BlogList
