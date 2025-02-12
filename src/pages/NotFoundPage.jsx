import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-blue-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Illustration */}
        <div className="mt-6">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="Not Found"
            className="w-64 mx-auto"
          />
        </div>

        {/* Go Home Button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
