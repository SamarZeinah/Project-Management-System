export interface IPaginationProps {
  changePageSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  totalNumRecords: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  getAllTasks: (pageSize: number, pageNumber: number, title?: string | null, status?: string | null) => Promise<void>;
  pageSize: number;
  numOfPagesArray: number[]; // Correct type
}
