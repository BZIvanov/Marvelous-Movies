import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <div>
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <Link to='/'>
          <button>Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
