import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams, useNavigate} from "react-router-dom";

const BlistDetail = () => {
    let params = useParams();
    const [detail, setdetail] = useState({})

    const getData = async() => {
        await axios.get(`http://127.0.0.1:8000/api/blog/${params.slug}`)
        .then(res => {
            const datos = res.data;           
            setdetail(datos)
        })
    }


    const displayContent = (i) => {
        return {__html: i.content}
    };

    useEffect(() => {
        getData()
        console.log(detail)

    }, [])

    const navigate = useNavigate()

    const aceptar = ()=> {
        console.log("redicecciona luego de ejecutar un codigo")
        navigate("/")
    }


    return (
        <div>
            <article>

            <h1>{detail.title}</h1>

            <img width='250' height='250'  src={detail.thumbnail} alt="" />

            <p  dangerouslySetInnerHTML={displayContent(detail) } ></p>

                
            </article>

            <button onClick={()=> aceptar()}> Volver a blogs </button>



        </div>
    )
}

export default BlistDetail
