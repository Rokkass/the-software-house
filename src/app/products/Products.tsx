import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import logo from 'assets/images/logo.svg';
import bag from 'assets/images/bag.svg';
import './Products.css';
import axios from 'api/axios';

interface Product {
  name: string;
  description: string;
  rating: number;
  image: string;
  promo: boolean;
  active: boolean;
  id: string;
}

type ProductCardProps = Omit<Product, 'promo' | 'active'> & { openModal: () => void };

interface ProductsResponse {
  items: Product[];
  meta: {
    currentPage: string;
    itemCount: string;
    itemsPerPage: string;
    totalItems: string;
    totalPages: string;
  };
}

const NoProducts = () => (
  <div className="products__no-items">
    <img src={bag} className="login__logo" alt="bag icon" />
    <p>Ooops… It’s empty here</p>
    <p>There are no products on the list</p>
  </div>
);

const ProductCard = ({ name, image, rating, description, openModal }: ProductCardProps) => {
  return (
    <div className="products__product-card">
      <div className="products__product-image">
        <img src={image} alt="product" />
      </div>
      <div
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div className="product__up">
          <p className="product__name">{name}</p>
          <p className="product__description">{description}</p>
        </div>
        <div className="product__down">
          <p>{rating}/5</p>
          <button onClick={() => openModal()}>Show details</button>
        </div>
      </div>
    </div>
  );
};

export const Products = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { data, isLoading } = useQuery<ProductsResponse>(
    ['products'],
    async () => {
      try {
        const response = await axios.get(
          'http://jointshfrontendapi-env-3.eba-z7bd6rn6.eu-west-1.elasticbeanstalk.com/products?search=awesome&limit=8&page=1',
        );
        return response.data; // Return only the data property of the Axios response
      } catch (error) {
        throw error; // Rethrow the error to be caught by isError
      }
    },
    { keepPreviousData: true },
  );

  console.log(data);

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <div className="products__container">
      <div className="products__header">
        {/*<div>*/}
        <a
          href="/products"
          style={{
            alignSelf: 'flex-start',
            padding: '0 108px',
          }}
        >
          <img src={logo} className="login__logo" alt="logo" />
        </a>
        {/*  <input type="text" />*/}
        {/*  <input type="checkbox" />*/}
        {/*  <span>Active</span>*/}
        {/*  <input type="checkbox" />*/}
        {/*  <span>Promo</span>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <button>Log in</button>*/}
        {/*</div>*/}
      </div>
      {isModalVisible && (
        <>
          <div className="product__modal--container">
            {/* Content of your centered div goes here */}
            <h2>Centered Content</h2>
            <p>This is the centered content of the modal.</p>
            <button onClick={() => setIsModalVisible(false)}>Close Modal</button>
          </div>

          <div className="product__modal--backdrop"></div>
        </>
      )}
      <div className="products__list--container">
        {isLoading ? (
          <NoProducts />
        ) : (
          data?.items?.map((item: Product) => (
            <ProductCard
              key={item.id}
              name={item.name}
              description={item.description}
              rating={item.rating}
              image={item.image}
              id={item.id}
              openModal={() => setIsModalVisible(true)}
            />
          ))
        )}
      </div>
    </div>
  );
};
