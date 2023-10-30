import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css'; // Import your styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const App = () => {
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [sorting, setSorting] = useState('ascending ');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(5);
  const [count, setCount] = useState(5);


  useEffect(() => {
    fetchData();
  }, [sorting, topicFilter, priceFilter, searchTerm, currentPage,coursesPerPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses`, {
        params: {
          topic: topicFilter,
          price: priceFilter,
          sort: sorting,
          search: searchTerm,
          page: currentPage,
          perPage: coursesPerPage,
        },
      });
      const topics = await axios.get(`http://localhost:5000/api/topics`)
      console.log("response",response)
      setCourses(response.data.courses);
      setCount(response.data.count)
      setTopics(topics.data.topics);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    if (e.target.name === 'topic') {
      setTopicFilter(e.target.value);
    } else if (e.target.name === 'price') {
      setPriceFilter(e.target.value);
    }
  };

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCoursesPerPageChange = (e) => {
    setCoursesPerPage(parseInt(e.target.value));
    setCurrentPage(1); 
  };
  const totalPages = Math.ceil(count / coursesPerPage);

  return (
      <div className='App'>
       <div className="search">
         <FontAwesomeIcon icon={faSearch} className='icon'/>
        <input type="text" placeholder="Search by topic & title" onChange={handleSearch} />
        <button>Search</button>
        </div>
      <div className="app-container">
      <div className="filter-section">
         <div>

      <label>Topic:</label>
      <div className='topic-options'>
        <input
          type="radio"
          id="all"
          name="topic"
          value=""
          checked={topicFilter === ''}
          onChange={handleFilterChange}
        />
        <label htmlFor="all">All</label>

        {topics.map((topic) => (
          <div key={topic._id}>
            <input
              type="radio"
              id={topic._id}
              name="topic"
              value={topic._id}
              checked={topicFilter === topic._id}
              onChange={handleFilterChange}
            />
            <label htmlFor={topic._id}>{topic.name}</label>
          </div>
        ))}
      </div>
         </div>
        <div className='price'>
        <label>Price:</label>
        <input type="text" name="price" onChange={handleFilterChange} />
        </div>
      </div>
     
      <div className="course-list">
      <div className='sorting'>
        <select onChange={handleSortingChange}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
        {courses.map((course) => (
          <div key={course._id} className="course-item">
            <h3>{course.name}</h3>
            <p>Topic: {course.topic.name}</p>
            <p>Price Range: {course.priceRange}</p>
          </div>
        ))}

    
        <div className="bottom-controls">
        <div className="pagination">
        <label>Page:</label>
        <select onChange={handleCoursesPerPageChange} value={coursesPerPage}>
        <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      </div>
    
    </div>
    </div>
  );
};

export default App;
