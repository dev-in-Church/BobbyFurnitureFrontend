import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const CategoryBreadcrumb = ({ category }) => {
  return (
    <nav className="flex text-sm">
      <ol className="flex items-center space-x-1">
        <li>
          <Link to="/" className="text-gray-500 hover:text-blue-500">
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight size={14} className="text-gray-400" />
          <Link
            to="/furniture"
            className="ml-1 text-gray-500 hover:text-blue-500"
          >
            Furniture
          </Link>
        </li>
        {category && (
          <li className="flex items-center">
            <ChevronRight size={14} className="text-gray-400" />
            <span className="ml-1 text-gray-900 font-medium">{category}</span>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;
