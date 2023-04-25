import Pagination from "react-bootstrap/Pagination";

interface MyPaginationProps {
  total: number;
  current: number;
  onChangePage: (pageNumber: number) => void;
}

export function MyPagination({
  total,
  current,
  onChangePage,
}: MyPaginationProps): JSX.Element {
  let items: Array<JSX.Element> = [];
  if (current > 1) {
      items.push(
      <Pagination.Item key="prev" onClick={() => onChangePage(current - 1)}>
        Prev
      </Pagination.Item>
      );
  }

  for (let page = 1; page <= total; page++) {
    items.push(
      <Pagination.Item
        key={page}
        active={page === current}
        onClick={() => onChangePage(page)}
      >
        {page}
      </Pagination.Item>
    );

    if (current < total) {
      items.push(
        <Pagination.Item key="next" onClick={() => onChangePage(current + 1)}>
          Next
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  }
  return <></>
}

