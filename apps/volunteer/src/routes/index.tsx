import { createBrowserRouter } from 'react-router-dom';
import Layout from 'ui/layout';

import PATH from '@/constants/path';
import AnimalsPage from '@/pages/animals';
import AnimalsDetailPage from '@/pages/animals/detail';
import ChattingsPage from '@/pages/chattings';
import ChattingsRoomPage from '@/pages/chattings/room';
import MyPage from '@/pages/my';
import NotFoundPage from '@/pages/notfound';
import NotificationsPage from '@/pages/notifications';
import SettingsAccountPage from '@/pages/settings/account';
import SettingsPasswordPage from '@/pages/settings/password';
import SheltersProfilePage from '@/pages/shelters/profile';
import SheltersReviewsUpdatePage from '@/pages/shelters/reviews/update';
import SheltersReviewsWritePage from '@/pages/shelters/reviews/write';
import SigninPage from '@/pages/signin';
import SignupPage from '@/pages/signup';
import VolunteersPage from '@/pages/volunteers';
import VolunteersDetailPage from '@/pages/volunteers/detail';
import VolunteersSearchPage from '@/pages/volunteers/search';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PATH.VOLUNTEERS.INDEX,
        children: [
          { index: true, element: <VolunteersPage /> },
          { path: PATH.VOLUNTEERS.DETAIL, element: <VolunteersDetailPage /> },
          { path: PATH.VOLUNTEERS.SEARCH, element: <VolunteersSearchPage /> },
        ],
      },
      {
        path: PATH.ANIMALS.INDEX,
        children: [
          { index: true, element: <AnimalsPage /> },
          { path: PATH.ANIMALS.DETAIL, element: <AnimalsDetailPage /> },
        ],
      },
      {
        path: PATH.CHATTINGS.INDEX,
        children: [
          { index: true, element: <ChattingsPage /> },
          { path: PATH.CHATTINGS.ROOM, element: <ChattingsRoomPage /> },
        ],
      },
      {
        path: PATH.MYPAGE.INDEX,
        element: <MyPage />,
      },
      {
        path: PATH.SETTINGS.INDEX,
        children: [
          { path: PATH.SETTINGS.ACCOUNT, element: <SettingsAccountPage /> },
          { path: PATH.SETTINGS.PASSWORD, element: <SettingsPasswordPage /> },
        ],
      },
      {
        path: PATH.SHELTERS.INDEX,
        children: [
          { path: PATH.SHELTERS.PROFILE, element: <SheltersProfilePage /> },
          {
            path: PATH.SHELTERS.REVIEWS_WRITE,
            element: <SheltersReviewsWritePage />,
          },
          {
            path: PATH.SHELTERS.REVIEWS_UPDATE,
            element: <SheltersReviewsUpdatePage />,
          },
        ],
      },
      { path: PATH.NOTIFICATIONS, element: <NotificationsPage /> },
      { path: PATH.SIGNUP, element: <SignupPage /> },
      { path: PATH.SIGNIN, element: <SigninPage /> },
    ],
  },
]);
