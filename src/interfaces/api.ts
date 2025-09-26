interface ApiResponse<T> {
  results: number;
  metadata: MetaData;
  data: T[];
}

interface MetaData {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
