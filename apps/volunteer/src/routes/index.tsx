import { createBrowserRouter, RouterProviderProps } from 'react-router-dom';
import APP_TYPE from 'shared/constants/appType';
import PAGE_TYPE from 'shared/constants/pageType';
import Layout from 'shared/layout';

import PATH from '@/constants/path';
import AnimalsPage from '@/pages/animals';
import AnimalsDetailPage from '@/pages/animals/detail';
import ChattingsPage from '@/pages/chattings';
import ChattingsRoomPage from '@/pages/chattings/room';
import MyPage from '@/pages/my';
import NotFoundPage from '@/pages/notfound';
import NotificationsPage from '@/pages/notifications';
import SettingsPage from '@/pages/settings';
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

export const router: RouterProviderProps['router'] = createBrowserRouter([
  {
    path: '/',
    element: <Layout appType={APP_TYPE.VOLUNTEER_APP} />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PATH.VOLUNTEERS.INDEX,
        children: [
          {
            id: PAGE_TYPE.VOLUNTEERS,
            index: true,
            element: <VolunteersPage />,
          },
          {
            id: PAGE_TYPE.VOLUNTEERS_DETAIL,
            path: PATH.VOLUNTEERS.DETAIL,
            element: <VolunteersDetailPage />,
          },
          {
            id: PAGE_TYPE.VOLUNTEERS_SEARCH,
            path: PATH.VOLUNTEERS.SEARCH,
            element: <VolunteersSearchPage />,
          },
        ],
      },
      {
        path: PATH.ANIMALS.INDEX,
        children: [
          {
            id: PAGE_TYPE.ANIMALS,
            index: true,
            element: <AnimalsPage />,
          },
          {
            id: PAGE_TYPE.ANIMALS_DETAIL,
            path: PATH.ANIMALS.DETAIL,
            element: <AnimalsDetailPage />,
          },
        ],
      },
      {
        path: PATH.CHATTINGS.INDEX,
        children: [
          {
            id: PAGE_TYPE.CHATTINGS,
            index: true,
            element: <ChattingsPage />,
          },
          {
            id: PAGE_TYPE.CHATTINGS_ROOM,
            path: PATH.CHATTINGS.ROOM,
            element: <ChattingsRoomPage />,
          },
        ],
      },
      {
        id: PAGE_TYPE.MYPAGE,
        path: PATH.MYPAGE.INDEX,
        element: <MyPage />,
      },
      {
        id: PAGE_TYPE.SETTINGS,
        path: PATH.SETTINGS.INDEX,
        element: <SettingsPage />,
        children: [
          {
            id: PAGE_TYPE.SETTINGS_ACCOUNT,
            path: PATH.SETTINGS.ACCOUNT,
            element: <SettingsAccountPage />,
          },
          {
            id: PAGE_TYPE.SETTINGS_PASSWORD,
            path: PATH.SETTINGS.PASSWORD,
            element: <SettingsPasswordPage />,
          },
        ],
      },
      {
        path: PATH.SHELTERS.INDEX,
        children: [
          {
            id: PAGE_TYPE.SHELTERS_PROFILE,
            path: PATH.SHELTERS.PROFILE,
            element: <SheltersProfilePage />,
          },
          {
            id: PAGE_TYPE.SHELTERS_REVIEWS_WRITE,
            path: PATH.SHELTERS.REVIEWS_WRITE,
            element: <SheltersReviewsWritePage />,
          },
          {
            id: PAGE_TYPE.SHELTERS_REVIEWS_UPDATE,
            path: PATH.SHELTERS.REVIEWS_UPDATE,
            element: <SheltersReviewsUpdatePage />,
          },
        ],
      },
      {
        id: PAGE_TYPE.NOTIFICATIONS,
        path: PATH.NOTIFICATIONS,
        element: <NotificationsPage />,
      },
      {
        id: PAGE_TYPE.SIGNUP,
        path: PATH.SIGNUP,
        element: <SignupPage />,
      },
      {
        id: PAGE_TYPE.SIGNIN,
        path: PATH.SIGNIN,
        element: <SigninPage />,
      },
    ],
  },
]);
