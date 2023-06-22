import { Link } from 'react-router-dom';

export function TestBtnForModal() {
  return (
    <>
      <Link to="/add-menu" style={{ border: '1px solid black', padding: '20px' }}>
        큰 메뉴카드
      </Link>
    </>
  );
}
