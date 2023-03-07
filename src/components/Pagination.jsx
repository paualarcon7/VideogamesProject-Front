import { React } from "react";
import Pagination from "react-bootstrap/Pagination";
import "../styles/Pagination.modules.css"

export default function Pag({ gamesPerPage, allVideogames, pagination, currentPage, setCurrentPage }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage); i++) {
    pages.push(i);
  }

  const nextPage = () => {
    if (currentPage !== pages) {
        setCurrentPage(currentPage + 1)
    }
};

const previousPage = () => {
    if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
    }
};

if (pages.length === 1) {
    setCurrentPage(1)
}

  return (
    <Pagination size="lg">
      <Pagination.Prev disabled={currentPage === 1 || pages === 1} onClick={previousPage}/>
      {pages &&
        pages.map((num) => (
          <Pagination.Item key={num} onClick={() => pagination(num)}>
            {num}
          </Pagination.Item>
        ))}

      <Pagination.Next disabled={currentPage === pages.length || pages === 1} onClick={nextPage}/>
    </Pagination>
  );
}
