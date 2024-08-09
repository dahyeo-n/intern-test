import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import My from '../pages/My';
import NavBar from '../components/common/NavBar';
import TodosComponent from '../components/TodosComponent';
import useAuthStore from '../zustand/useAuthStore';

const Router = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            <div className='px-10'>
              <h1 className='text-3xl font-bold mb-6'>인턴 테스트</h1>
              <TodosComponent />
            </div>
          }
        />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path='/my'
          element={isLoggedIn ? <My /> : <Navigate to='/signin' />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
