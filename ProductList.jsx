import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from './CartSlice.jsx';

const plantCategories = [
  {
    name: 'Easy-care favourites',
    description: 'Beautiful greens that are happy to grow with you.',
    plants: [
      { id: 'snake-plant', name: 'Snake Plant', price: 499, description: 'Architectural leaves and wonderfully low-maintenance care.', image: 'photo-1593482892290-f54927ae2b8b' },
      { id: 'zz-plant', name: 'ZZ Plant', price: 599, description: 'Glossy leaves that thrive in a range of indoor conditions.', image: 'photo-1632207691143-643e2c7a7b4f' },
      { id: 'pothos', name: 'Golden Pothos', price: 349, description: 'Trailing heart-shaped leaves for shelves and hanging pots.', image: 'photo-1614594975525-e45190c55d0b' },
      { id: 'rubber-plant', name: 'Rubber Plant', price: 799, description: 'Bold, deep-green foliage with a modern look.', image: 'photo-1501004318641-b39e6451bec6' },
      { id: 'peace-lily', name: 'Peace Lily', price: 549, description: 'Elegant leaves and graceful white blooms.', image: 'photo-1593691509543-c55fb32e5cee' },
      { id: 'jade-plant', name: 'Jade Plant', price: 299, description: 'A compact succulent with plump, rounded leaves.', image: 'photo-1509423350716-97f9360b4e09' },
    ],
  },
  {
    name: 'Statement plants',
    description: 'Leafy showstoppers that bring a room to life.',
    plants: [
      { id: 'monstera', name: 'Monstera Deliciosa', price: 899, description: 'Iconic split leaves with a tropical personality.', image: 'photo-1614594975525-e45190c55d0b' },
      { id: 'fiddle-leaf', name: 'Fiddle Leaf Fig', price: 1299, description: 'Large sculptural leaves for a bright corner.', image: 'photo-1501004318641-b39e6451bec6' },
      { id: 'bird-paradise', name: 'Bird of Paradise', price: 1499, description: 'Upright tropical foliage with plenty of drama.', image: 'photo-1485955900006-10f4d324d411' },
      { id: 'areca-palm', name: 'Areca Palm', price: 999, description: 'Feathery fronds for a soft, tropical feel.', image: 'photo-1518531933037-91b2f5f229cc' },
      { id: 'calathea', name: 'Calathea Orbifolia', price: 849, description: 'Rounded leaves with delicate silver-green stripes.', image: 'photo-1509423350716-97f9360b4e09' },
      { id: 'dracaena', name: 'Dracaena', price: 749, description: 'Striking upright leaves for an easy focal point.', image: 'photo-1593482892290-f54927ae2b8b' },
    ],
  },
  {
    name: 'Small-space plants',
    description: 'Little leafy companions for desks, shelves, and sunny sills.',
    plants: [
      { id: 'succulent-mix', name: 'Succulent Mix', price: 249, description: 'A cheerful assortment of compact, water-wise plants.', image: 'photo-1509423350716-97f9360b4e09' },
      { id: 'spider-plant', name: 'Spider Plant', price: 329, description: 'Fresh arching leaves that look lovely in a hanging pot.', image: 'photo-1459156212016-c812468e2115' },
      { id: 'peperomia', name: 'Peperomia Green', price: 379, description: 'A petite plant with plump, textured foliage.', image: 'photo-1485955900006-10f4d324d411' },
      { id: 'fittonia', name: 'Fittonia', price: 279, description: 'Small patterned leaves that brighten a tabletop.', image: 'photo-1497250681960-ef046c08a56e' },
      { id: 'aloe-vera', name: 'Aloe Vera', price: 299, description: 'A sculptural succulent for a bright windowsill.', image: 'photo-1501004318641-b39e6451bec6' },
      { id: 'lucky-bamboo', name: 'Lucky Bamboo', price: 399, description: 'A graceful, compact accent for your workspace.', image: 'photo-1518531933037-91b2f5f229cc' },
    ],
  },
];

function PlantCard({ plant, isAdded, onAdd }) {
  return (
    <article className="plant-card">
      <div className="plant-image-wrap">
        <img
          className="plant-image"
          src={`https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=700&q=80`}
          alt={plant.name}
          loading="lazy"
        />
        <span className="plant-tag">Indoor plant</span>
      </div>
      <div className="plant-info">
        <h3>{plant.name}</h3>
        <p>{plant.description}</p>
        <div className="plant-card-bottom">
          <strong>₹{plant.price.toLocaleString('en-IN')}</strong>
          <button className="button button-small" onClick={() => onAdd(plant)} disabled={isAdded}>
            {isAdded ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addedIds = new Set(cartItems.map((item) => item.id));

  return (
    <main className="page-content">
      <section className="page-heading">
        <p className="eyebrow">THE PLANT SHOP</p>
        <h1>Find your kind of <em>green.</em></h1>
        <p>Thoughtfully picked plants for every room, routine, and level of experience.</p>
      </section>
      {plantCategories.map((category) => (
        <section className="plant-category" key={category.name}>
          <div className="category-heading">
            <div><h2>{category.name}</h2><p>{category.description}</p></div>
            <span className="category-count">{category.plants.length} plants</span>
          </div>
          <div className="plant-grid">
            {category.plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                isAdded={addedIds.has(plant.id)}
                onAdd={(selectedPlant) => dispatch(addToCart(selectedPlant))}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
