
import { Form,Col, Row } from 'react-bootstrap';
import { IPaginationProps } from '../Interfaces/PaginationInterface';


export default function Pagination({changePageSize,totalNumRecords,currentPage,setCurrentPage,getAllTasks,pageSize,numOfPagesArray} :IPaginationProps) {
  return (
    <Row
  className="pagination-container d-flex align-items-center justify-content-center mb-4 py-4 px-2"
>
  {/* Page Size Selector */}
  <Col
    xs={8}
    md={4}
    className="d-flex align-items-center justify-content-center justify-content-md-start mb-2 mb-md-0"
  >
    <span className="me-2">Show</span>
<Form.Select
  aria-label="Select page size"
  onChange={changePageSize}
  style={{
    width: "100px", // Set a fixed small width
    borderRadius: "50px",
    padding: "6px 14px",
    border: "1px solid #ccc",
  }}
>
  <option value="5">5</option>
  <option value="10">10</option>
</Form.Select>

  </Col>

  {/* Total Records Display */}
  <Col xs={12} md={4} className="text-center mb-2 mb-md-0">
    <span>Of</span> <span>{totalNumRecords}</span> <span>Results</span>
  </Col>

  {/* Pagination Controls */}
  <Col xs={12} md={4} className="d-flex justify-content-center align-items-center justify-content-md-end">
    <li
      className={`fa-solid fa-less-than mx-2 ${currentPage === 1 ? "disabled" : ""}`}
      onClick={() => {
        if (currentPage > 1) {
          const previousPage = currentPage - 1;
          setCurrentPage(previousPage);
          getAllTasks(pageSize, previousPage, null, null);
        }
      }}
      style={{
        pointerEvents: currentPage === 1 ? "none" : "auto",
        opacity: currentPage === 1 ? 0.5 : 1,
        fontSize: "0.9rem",
      }}
    ></li>

    <span className="mx-2" style={{ fontSize: "0.9rem" }}>
      Page {currentPage} of {numOfPagesArray.length}
    </span>

    <li
      className={`fa-solid fa-greater-than mx-2 ${
        currentPage === numOfPagesArray.length ? "disabled" : ""
      }`}
      onClick={() => {
        if (currentPage < numOfPagesArray.length) {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          getAllTasks(pageSize, nextPage, null, null);
        }
      }}
      style={{
        pointerEvents: currentPage === numOfPagesArray.length ? "none" : "auto",
        opacity: currentPage === numOfPagesArray.length ? 0.5 : 1,
        fontSize: "0.9rem",
      }}
    ></li>
  </Col>
</Row>
  )
}
