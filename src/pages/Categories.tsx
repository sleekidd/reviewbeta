import React from 'react';
import Sidebar from '../elements/Sidebar';
import ListCategories from './ListCategories';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
  return (
    <div>
      <h1>Categories</h1>
      <Sidebar />
      <ListCategories />
      <Link to="/create-category">
        <button>Create Category</button>
      </Link>
    </div>
  );
};

export default Categories;
