import { useEffect, useState } from 'react'

const FetchData = function component(){
    const [ data, setData ] = useState([]);                //set store data
    const [ loading, setLoading ] = useState(true);         //set loading 
    const [ error, setError ] = useState(null);             //set error

    useEffect( () => {
        fetch('https://jsonplaceholder.typicode.com/posts')     //fetch data from api 
            .then((response) => {
                if(!response.ok){
                    throw new Error('Data fetching failed.');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);          //loading set to false after data is fetched
            })
            .catch((error) => {
                setError('Data fetching failed.');
                setLoading(false);          //loading set to false on error
            })
    }, [])          //empty dependency array ensures it runs only once after the component mounts

    if(error){
        return <div>{error}</div>          //show error message if there is an error
    }

    return(
        <div>
          <h1> Posts </h1>
            {data.map((post) => (
                <div key={post.id}>
                    <h2>{post.id} {post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}

function DataDisplay(){
    return (
        <div>
            <FetchData />
        </div>
    );
}

export default DataDisplay