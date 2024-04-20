import { ConfigProvider, notification } from 'antd';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingAnimation from './components/LoadingAnimation';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import Characters from './pages/Characters';
import Character from './pages/Character';
import Locations from './pages/Locations';
import Location from './pages/Location';
import Episodes from './pages/Episodes';
import Episode from './pages/Episode';
import Navbar from './components/Navbar';
import Favorites from './pages/Favorites';


function App() {
  const [api, notificationHolder] = notification.useNotification();

  const notificationState = useSelector((state) => state.notification);


  useEffect(() => {
    if (
      notificationState.type !== undefined &&
      notificationState.message !== ""
    ) {
      api[notificationState.type]({
        message: <b>{notificationState.message}</b>,
        description: notificationState.description,
        placement: "bottomRight",
      });
    }
  }, [notificationState]);


  return (
    <>
      {notificationHolder}
      <ConfigProvider
        locale={"en_US"}
      >
        <ErrorBoundary FallbackComponent={Error}>
          <Suspense fallback={<LoadingAnimation />}>
            <Router>
              <Routes>
                <Route path='/' element={<Navbar />}>
                  <Route path='/' element={<Home />} />
                  <Route path='/character' element={<Characters />} />
                  <Route path='/character/:id' element={<Character />} />
                  <Route path='/location' element={<Locations />} />
                  <Route path='/location/:id' element={<Location />} />
                  <Route path='/episode' element={<Episodes />} />
                  <Route path='/episode/:id' element={<Episode />} />
                  <Route path='/favorites' element={<Favorites />} />
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route path="/error" element={<Error />} />
              </Routes>
            </Router>
          </Suspense>
        </ErrorBoundary>
      </ConfigProvider>
    </>
  );
}

export default App;
