import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="text-center p-8 h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-green-600">
        Order Placed Successfully!
      </h1>
      <p className="text-lg mt-4">Thank you for your purchase.</p>
      <Link
        to="/orders"
        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        View My Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
