import { Link, useParams } from 'react-router-dom';

export function TestBtnForModal({ id, name }: any) {
  // const { id } = useParams();

  return (
    <>
      <Link to={`/add-menu/${id}`} style={{ border: '1px solid black', padding: '20px' }}>
        {name}
      </Link>
    </>
  );
}
