import { useState } from "react";
import { useSelector } from "react-redux";

const PaginationExample = () => {
  const items = useSelector((state: any) => state.countries); // Sample array of items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Pagination Example</h1>
      <ul>
        {currentItems.map((item: any, index: number) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <div>
        {/* <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button> */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => {
          return (
            <button
              onClick={() => handlePageChange(item)}
              disabled={currentPage === item}
            >
              {item}
            </button>
          );
        })}
        {/* <span>
          Page {currentPage} of {totalPages}
        </span> */}
        {/* <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button> */}
      </div>
    </div>
  );
};

export default PaginationExample;
