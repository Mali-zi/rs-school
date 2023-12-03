import { useNavigate } from 'react-router-dom';
import ProfileList from './ProfileList';

export default function Main() {
  const navigate = useNavigate();

  function handleClick(num: string) {
    navigate(`/${num}-form`);
  }

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col m-4">
          <h2 className="planet-list-header">
            Enter your details in either of the two forms
          </h2>
          <div className="my-4">
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={() => handleClick('1')}
            >
              1 Form
            </button>
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={() => handleClick('2')}
            >
              2 Form
            </button>
          </div>
          <hr />
          <ProfileList />
        </div>
      </div>
    </div>
  );
}
