import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInSuccess,
  signInFailure,
  signInstart,
} from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Oauth from '../components/Oauth';

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInstart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold m-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 to-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Do not have an account.. ?
          <Link to="/sign-up">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </p>
      </div>
      <p className="text-red-600 mt-5 font-semibold">
        {error ? error.message || 'Something went wrong..!' : ''}
      </p>
    </div>
  );
};

export default Signin;
