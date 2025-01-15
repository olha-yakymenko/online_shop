import React, { useReducer, useState, useCallback, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ProductContext } from '../../Context/ProductContext'; 
import { useMutation, useQueryClient } from 'react-query';
// import all_product from "../Assets/all_product";
import './Order.css'

const formReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREVIOUS_STEP":
      return { ...state, step: state.step - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  step: 1,
};

const validationSchemas = [
  Yup.object({
    address: Yup.object({
      city: Yup.string().required("City is required"),
      street: Yup.string().required("Street is required"),
      nr: Yup.string().required("Street number is required"),
    }),
  }),
  Yup.object({
    contactInfo: Yup.object({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
  }),
  Yup.object({
    paymentMethod: Yup.string().required("Payment method is required"),
  }),
];

const Order = ({ totalAmount, clearCart, cartItems}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [message, setMessage] = useState({ text: '', type: '' });
  const {all_product}=useContext(ProductContext)

  const handleNextStep = useCallback(
    (values, validateForm) => {
      validateForm().then((errors) => {
        if (Object.keys(errors).length === 0) {
          dispatch({ type: "NEXT_STEP" });
        }
      });
    },
    [dispatch]
  );

  const handlePreviousStep = useCallback(() => {
    if (state.step > 1) {
      dispatch({ type: "PREVIOUS_STEP" });
    }
  }, [state.step]);

  const mutation = useMutation(
    (orderData) => 
      fetch("http://localhost:5055/send-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }).then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(text); 
          });
        }
        return res.json(); 
      }),
    {
      onSuccess: async () => {
        setMessage({ text: "Order successfully placed. Confirmation email sent.", type: 'message' });
        await clearCart();
        dispatch({ type: "RESET" });
        queryClient.invalidateQueries('cart');
      },
      onError: (error) => {
        setMessage({ text: error.message , type: 'error' });

      },
      onSettled: () => {
        setLoading(false);
      }
    }
  );
  const handleSubmit = async (values) => {
    setLoading(true);
  
    const cartItemsData = (cartItems && typeof cartItems === 'object') 
      ? Object.keys(cartItems).map((productId) => {
          const product = all_product.find((prod) => prod.id === Number(productId));
          console.log(product)
          return {
            name: product.name,
            quantity: cartItems[productId],
            price: product.new_price,
          };
        })
      : [];  
  
    try {
      const emailResponse = await fetch('http://localhost:5055/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: values.address,
          contactInfo: values.contactInfo,
          paymentMethod: values.paymentMethod,
          totalAmount,
        }),
      });
  
      if (!emailResponse.ok) {
        const errorMessage = await emailResponse.text();
        throw new Error(errorMessage);
      }
  
      const orderResponse = await fetch('http://localhost:5055/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: values.address,
          contactInfo: values.contactInfo,
          paymentMethod: values.paymentMethod,
          totalAmount,
          cartItems: cartItemsData,
        }),
      });
  
      if (!orderResponse.ok) {
        const errorMessage = await orderResponse.text();
        throw new Error(errorMessage);
      }
      setMessage({ text: 'Zamówienie zostało pomyślnie złożone, wysłano potwierdzenie!', type: 'message' });
      await clearCart();
      dispatch({ type: 'RESET' });
      queryClient.invalidateQueries('cart');
    } catch (error) {
      console.error('Błąd:', error);
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
  
      <Formik
        initialValues={{
          address: { city: "", street: "", nr: "" },
          contactInfo: { name: "", surname: "", email: "" },
          paymentMethod: "",
        }}
        validationSchema={validationSchemas[state.step - 1]}
        onSubmit={(values) => {
          if (state.step === 3) {
            handleSubmit(values);
          }
        }}
      >
        {({ values, validateForm }) => (
          <Form className="app-container">
            {state.step === 1 && (
              <div className="checkout-form">
                <h2>Step 1: Shipping Address</h2>
                <div className="form-group">
                  <label>City</label>
                  <Field name="address.city" type="text" placeholder="Enter city" />
                  <ErrorMessage name="address.city" component="div" className="error-message" />
  
                  <label>Street</label>
                  <Field name="address.street" type="text" placeholder="Enter street" />
                  <ErrorMessage name="address.street" component="div" className="error-message" />
  
                  <label>Street Number</label>
                  <Field name="address.nr" type="text" placeholder="Enter street number" />
                  <ErrorMessage name="address.nr" component="div" className="error-message" />
                </div>
              </div>
            )}
  
            {state.step === 2 && (
              <div className="checkout-form">
                <h2>Step 2: Contact Info</h2>
                <div className="form-group">
                  <label>Name</label>
                  <Field name="contactInfo.name" type="text" placeholder="Enter name" />
                  <ErrorMessage name="contactInfo.name" component="div" className="error-message" />
  
                  <label>Surname</label>
                  <Field name="contactInfo.surname" type="text" placeholder="Enter surname" />
                  <ErrorMessage name="contactInfo.surname" component="div" className="error-message" />
  
                  <label>Email</label>
                  <Field name="contactInfo.email" type="email" placeholder="Enter email" />
                  <ErrorMessage name="contactInfo.email" component="div" className="error-message" />
                </div>
              </div>
            )}
  
            {state.step === 3 && (
              <div className="checkout-form">
                <h2>Step 3: Payment Method</h2>
                <div className="form-group">
                  <label>Payment Method</label>
                  <Field as="select" name="paymentMethod">
                    <option value="">Select payment method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </Field>
                  <ErrorMessage name="paymentMethod" component="div" className="error-message" />
                </div>
              </div>
            )}
  
            <div className="form-actions">
              {state.step > 1 && (
                <button type="button" onClick={handlePreviousStep}>
                  Previous
                </button>
              )}
              {state.step < 3 ? (
                <button type="button" onClick={() => handleNextStep(values, validateForm)}>
                  Next
                </button>
              ) : (
                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Order"}
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
  
};

export default Order;
