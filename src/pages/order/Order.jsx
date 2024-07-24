import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="h-full pt-10">
          {order
            .filter(obj => obj.userid === userid)
            .map(order => (
              <div key={order.id} className="mx-auto max-w-5xl px-6 md:px-0">
                {order.cartItems.map(item => (
                  <div key={item.id} className="rounded-lg bg-white p-6 mb-6 shadow-md flex items-center">
                    <img src={item.imageUrl} alt="product-image" className="w-20 h-20 rounded-lg mr-6" />
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        {item.title}
                      </h2>
                      <p className="text-xs text-gray-700 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        {item.description}
                      </p>
                      <p className="text-lg fondt-bold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders Found</h2>
      )}
    </Layout>
  );
}

export default Order;
