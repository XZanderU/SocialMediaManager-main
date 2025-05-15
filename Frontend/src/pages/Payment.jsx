import React, { useEffect, useState } from 'react';
import { checkSubscriptionStatus, updateSubscriptionStatus } from '../../services/authServices';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const Payment = ({ userId }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        setLoading(true);
        const status = await checkSubscriptionStatus(userId);
        setSubscriptionStatus(status);
      } catch (error) {
        console.error('Error al obtener el estado de suscripción:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [userId]);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setProcessing(true);
    setErrorMessage('');

    try {
      // 1. Crear PaymentIntent desde el backend
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const { clientSecret } = await res.json();

      if (!clientSecret) throw new Error('No se pudo obtener el clientSecret');

      // 2. Confirmar el pago en el frontend
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Usuario', // podrías usar nombre del usuario si lo tienes
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          await handleSubscriptionUpdate();
        }
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setErrorMessage('Error al procesar el pago. Intenta nuevamente.');
    } finally {
      setProcessing(false);
    }
  };

  const handleSubscriptionUpdate = async () => {
    try {
      const updatedStatus = await updateSubscriptionStatus(userId, 'active');
      setSubscriptionStatus(updatedStatus);
    } catch (error) {
      console.error('Error al actualizar la suscripción:', error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className='text text-center py-2 px-4'>
      <h1>Estado de la suscripción</h1>

      {subscriptionStatus === 'trial' && (
        <p>Estás en un período de prueba gratuito. Asegúrate de completar el pago antes de que expire.</p>
      )}

      {subscriptionStatus === 'expired' && (
        <>
          <p>Tu período de prueba ha terminado. Por favor, realiza el pago para continuar usando la aplicación.</p>
          <div className='border p-2 my-2 max-w-md mx-auto'>
            <CardElement options={{ hidePostalCode: true }} />
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            onClick={handlePayment}
            disabled={!stripe || processing}
          >
            {processing ? 'Procesando...' : 'Realizar Pago'}
          </button>
        </>
      )}

      {subscriptionStatus === 'active' && (
        <p>Tu suscripción está activa. Gracias por tu apoyo.</p>
      )}

      <button
        className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
        onClick={handleSubscriptionUpdate}
      >
        Actualizar Estado de Suscripción
      </button>
    </div>
  );
};

export default Payment;
