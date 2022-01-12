import React, {useEffect} from 'react'
import { useParams } from "react-router-dom";

const BlogListDetail = () => {
    let params = useParams();

    useEffect(() => {
      console.log("estoy vivo")
    }, [])
    return (
        <div>
            <h1>hello word</h1>
            {params.id}
            
        </div>
    )
}

export default BlogListDetail
