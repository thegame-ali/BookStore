import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './booklist.css'; 
import SearchBar from './SearchBar';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const[searchResults,setSearchResults]=useState([])
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 

  const fetchBooks = async () => {
    
      try{
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: 'a OR the ', // General search term to get a wide range of books
          startIndex: 0,
          maxResults: 40,// Max results per request
        }
      });
      const newBooks = response.data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        categories: item.volumeInfo.categories || ['Uncategorized'],
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || ''
      }));
      setBooks( [...newBooks]);
    }
    catch(err){
      console.error('Error fetching books:', err);
        setError('Failed to fetch books. Please try again later.');
    }
      
    } 
  

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch=async(query)=>{
    if(query){try{
      var res= await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: `intitle:${query} OR inauthor:${query}`, 
          
          maxResults: 40,
        }
    })
  }
  catch(err){
    console.error('Error fetching search results:', err);
    setError('Invalid search query. Please try again.');
    setSearchResults([]);
  }
  }

  const searchBooks = res.data.items.map(item => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors || [],
    categories: item.volumeInfo.categories || ['Uncategorized'],
    description: item.volumeInfo.description,
    thumbnail: item.volumeInfo.imageLinks?.thumbnail || ''
  }));
  setSearchResults([...searchBooks])
}

const handleViewDetails = (id) => {
  navigate(`/book/${id}`);
};

  const displayBooks = searchResults.length ? searchResults : books;

  
 
  return (
    <div>
      <SearchBar handleSearch={handleSearch}/>
      {error && <div className="error-message">{error}</div>}
      <div className="books-container">
      <h1>Books List</h1>
      <div className="books-grid">
        {displayBooks.map(book => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
            
            {book.thumbnail && <img src={book.thumbnail} alt={`${book.title} cover`} />}
            <button onClick={() => handleViewDetails(book.id)} className="details-button">
                View Details
              </button>
          </div>
        ))}
      </div>
      
      
    </div>
    </div>
  );
}



export default BooksList;
