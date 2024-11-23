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
                return response.json();     //return response converted in json
            })
            .then((data) => {
                setData(data);              //store data in state
                setLoading(false);          //loading set to false after data is fetched
            })
            .catch((error) => {
                setError('Data fetching failed.');
                setLoading(false);          //loading set to false on error
            })
    }, [])          //empty dependency array ensures it runs only once after the component mounts

    if(error){
        return <h1>{error}</h1>          //show error message if there is an error
    }

    if (loading) {
        return <div>Loading...</div>;  // Display loading message while fetching
      }

    const displayPosts = data.map(d => <div key={d.id}>         {/* Key used to hold unique property of list array */}
                                            <h2>{d.id}. {d.title}</h2>      {/* What to show from the list */}
                                            <p>{d.body}</p>
                                            </div>)

    //results that the function should carry forward
    return(
        <div>
          <h1> Posts </h1>
            {displayPosts}
        </div>
    )
}


//this is where the function above is returned to display in app.jsx
function DataDisplay(){
    return (
        <div>
            <FetchData />
        </div>
    );
}

export default DataDisplay