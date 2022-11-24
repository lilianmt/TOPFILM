import React, { useEffect, useState } from 'react'
import db from '../firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

import './PlansScreen.css';

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const productsCollectionRef = collection(db, "products");
    const customersCollectionRef = collection(db, "customers");
    const user = useSelector(selectUser);

    useEffect(() => {
        const getProducts = async () => {
            const products = await getDocs(productsCollectionRef);
            setProducts(products.docs.map((doc) => ({...doc.data(), id: doc.id })));
        }

        getProducts()
    }, [])

    const loadCheckout = async (priceId) => {
        const docRef = await customersCollectionRef
        .doc(user.uid)
        .collection('checkout_sessions')
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_urlL: window.location.origin,
        });

        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`An error has occured: ${error.message}`);
            }

            if (sessionId) {
                const stripe = await loadStripe('pk_test_51M7RADImyi2sulgfU2tqd1j6R4UOPERtrm5VUBvquWJcvSItxcSfpnWOuE5Mjf2RYJLVympo7FqJwRhgEJ5sqn5w0085LzZDAc');
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    // console.log(products);
  return (
    <div className='plansScreen'>
        {Object.entries(products).map(([productId, productData]) => {
            return (
                <div className='plansScreen_plan'>
                    <div className='plansScreen_info'>
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
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