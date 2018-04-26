import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Category = ({ category, categories, products, id, productsOfThisCategory })=> {
  if (!category) {
    return null;
  }
  const nextCategoryIndex = categories.indexOf(category) + 1;
  const nextCategoryId = nextCategoryIndex < categories.length ? categories[nextCategoryIndex].id : categories[0].id;
  const priorCategoryIndex = categories.indexOf(category) -1;
  const lastCategoryIndex = categories.length - 1;
  const priorCategoryId = priorCategoryIndex !== -1 ? categories[priorCategoryIndex].id : categories[lastCategoryIndex].id;

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>{ category.name }</h1>
          <p>Number of products in {category.name}: {productsOfThisCategory.length}</p>
          <p>Products:</p>
          {productsOfThisCategory.length === 0 ? (<p>There are no products in this category yet</p>):(        
            <ul>          
           {
             productsOfThisCategory.map(product => {
               return (
                 <div key={product.id}>
                   <Link to={`/products/${product.id}`}>{product.name}</Link>
                 </div>
               )
             })
           }         
           </ul>)}
        </div>
        <div className='col'>
            <Link to={`/categories/${priorCategoryId}`}><button>Prior</button></Link>
            <Link to={`/categories/${nextCategoryId}`}><button>Next</button></Link>
        </div>
      </div>      
    </div>
  )
}

const mapStateToProps = ({ categories, products }, { id })=> {
  const category = categories.find( category => category.id === id );
  const productsOfThisCategory = products.filter( product => product.categoryId === id);
  return {
    category,
    categories,
    products,
    productsOfThisCategory
  }
};

export default connect(mapStateToProps)(Category);