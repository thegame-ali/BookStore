
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';
import { useParams } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams(); // Get the book ID from the URL
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error('Error fetching book details:', err);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!book) return <p>Loading...</p>;
  
const handleAddToCart = () => {
    dispatch(addToCart({
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
      price: Math.random() * (50 - 10) + 10, // Generate random number between 10 to 50 for pricing
      image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
      quantity: 1
    }));
  };
  

  return (
    <div className="book-details-container">
      <div className="book-details">
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} className="book-details-image" />
        <div className="book-details-info">
          <h2 className="book-details-title">{book.volumeInfo.title}</h2>
          <p className="book-details-author">{book.volumeInfo.authors?.join(', ')}</p>
          <p className="book-details-genre">{book.volumeInfo.categories?.join(', ')}</p>
          <p className="book-details-description">{book.volumeInfo.description}</p>
          <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
