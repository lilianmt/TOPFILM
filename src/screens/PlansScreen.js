import React, { useEffect, useState } from 'react'
import db from '../firebase';
import { collection, getDocs, where, query, onSnapshot, addDoc, getDoc, doc } from 'firebase/firestore';

import './PlansScreen.css';

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        const q = query(collection(db, "products"), where("active", "==", true));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = await productDoc.data();

                const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].price = {
                        priceId: price.id,
                        priceData: price.data(),
                    };
                });
            });
            setProducts(products);
        });

    }, []);

    const loadCheckout = async (priceId) => {
        const docRef = doc(db, "customers", `${user?.uid}`);
        const docSnap = await getDoc(docRef);
        const addedRef = await addDoc(collection(docRef, "checkout_sessions"), {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })

        addedRef.onSnapshot(async (snap) => {
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