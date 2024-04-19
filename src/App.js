import { ConfigProvider, notification } from 'antd';
import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAntdLocale } from './helpers/helperFunctions';
import LoadingAnimation from './components/LoadingAnimation';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Error from './pages/Error';


function App() {
  const [api, notificationHolder] = notification.useNotification();

  const notificationState = useSelector((state) => state.notification);

  const { i18n } = useTranslation();

  useEffect(() => {
    if (
      notificationState.type !== undefined &&
      notificationState.message !== ""
    ) {
      api[notificationState.type]({
        message: notificationState.message,
        description: notificationState.description,
        placement: "bottomRight",
      });
    }
  }, [notificationState]);


  return (
    <div>
      {notificationHolder}
      <ConfigProvider
        locale={getAntdLocale(i18n.language)}
      >
        <ErrorBoundary FallbackComponent={Error}>
          <Suspense fallback={<LoadingAnimation />}>
            <Router>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/error" element={<Error />} />
              </Routes>
            </Router>
          </Suspense>
        </ErrorBoundary>
      </ConfigProvider>
    </div>
  );
}

export default App;
