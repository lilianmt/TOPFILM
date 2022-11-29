import React, { useEffect, useState } from 'react'
import db from '../firebase';
import { collection, getDocs, where, query, onSnapshot, addDoc } from 'firebase/firestore';

import './PlansScreen.css';

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
  
    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, "products"), where("active", "==", true));
            const querySnapshot = await getDocs(q);
            const products = {};

            const data = querySnapshot.forEach(async (productDoc) => {
              products[productDoc.id] = productDoc.data();

              const subQuery = query(
                collection(db, `products/${productDoc.id}/prices`)
              );
              const subQDetails = await getDocs(subQuery);
              subQDetails.docs.map((price) => {
                products[productDoc.id].prices = {
                  priceId: price.id,
                  priceData: price.data(),
                };
              });
              setProducts(products); 
            });
          };

          fetchData()
      }, []);
    
        const loadCheckout = async (priceId) => {
            const firstQ = collection(db, `customers/${user.uid}/checkout_sessions`);
            const secondQ = query(
                await addDoc(firstQ, {
                    price: priceId,
                    success_url: window.location.origin,
                    cancel_url: window.location.origin,
          })
        );

        onSnapshot(secondQ, async (snap) => {
            const { error, sessionId } = snap.data();
      
            if (error) {
              alert(`An error occured: ${error.message}`);
              console.log(error.message);
            }
            if (sessionId) {
              const stripe = await loadStripe(
                "pk_test_51M7RADImyi2sulgfU2tqd1j6R4UOPERtrm5VUBvquWJcvSItxcSfpnWOuE5Mjf2RYJLVympo7FqJwRhgEJ5sqn5w0085LzZDAc"
              );
              stripe.redirectToCheckout({ sessionId });
            }
          });
        };

  return (
    <div className='plansScreen'>
        {Object.entries(products).map(([productId, productData]) => {
            return (
                <div className='plansScreen_plan' key={productId}>
                    <div className='plansScreen_info'>
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                        {/* <h6>{productData.prices.priceId}</h6> */}
                    </div>

                    <button onClick={() => loadCheckout(productData.prices.priceId)}>
                        Subscribe
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default PlansScreen