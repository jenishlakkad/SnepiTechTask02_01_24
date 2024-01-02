import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';

const NewsData = () => {
    let [obj,setobj] = useState([]) 
    // let [arr,setarr] = useState([]) 


    const getData = async() => {
        await axios.get('https://newsapi.org/v2/everything?q=tesla&from=2023-12-02&sortBy=publishedAt&apiKey=4e2b83853a224fbc98084e066ef64144')
      .then((res) => {
        // console.log(res.data.articles);
        // console.log(res.data)
        setobj([...res.data.articles]);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    useEffect(() => {
        getData();
      }, []);

      const searchAuthor = (e) =>{
        let author = e.target.value
        setobj([...obj, () =>{obj.filter((x) =>{x.author?.toLowerCase().includes(author.toLowerCase())})}])
      }

  return (
    <>
        <div className="mainDiv">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            
        <form class="d-flex" role="search">
            <input class="form-control me-2" onChange={searchAuthor} type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form> 
        <Dropdown className='ms-auto'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
    </nav> 
    <table className='table '>
        <thead>
            <tr>
                <th>Id</th>
                <th>Source</th>
                <th>Author</th>
                <th>Title</th>
                <th>Description</th>
                <th>Published At</th>
                <th>Image</th>
                <th>Content</th>
            </tr>
        </thead>
        <tbody>
        {obj.map((x, i) => (
                  <tr key={i}>
                    <td>{x.source.id}</td>
                    <td>{x.source.name}</td>
                    <td>{x.author}</td>
                    <td>{x.title}</td>
                    <td>{x.description}</td>
                    <td>{x.publishedAt}</td>   
                    <td>
                      {x.urlToImage && (
                        <img
                          src={x.urlToImage}
                          alt="Article"
                          style={{ maxWidth: '70px' }}
                        />
                      )}
                    </td>
                    <td>{x.content}</td>
                  </tr>
                ))}
        </tbody>
    </table>
    </div>
      {/* <Stack spacing={2}>
       
      <Pagination count={10} color="secondary" />
       
    </Stack> */}

        <script type="text/javascript" src="Scripts/bootstrap.min.js"></script>
        <script type="text/javascript" src="Scripts/jquery-2.1.1.min.js"></script>
    
    </>
  )
}

export default NewsData
