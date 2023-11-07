import { createBrowserRouter, RouterProviderProps } from 'react-router-dom';
import Layout from 'shared/layout';

import PATH from '@/constants/path';
import AnimalsPage from '@/pages/animals';
import AnimalsDetailPage from '@/pages/animals/detail';
import AnimalsSearchPage from '@/pages/animals/searchPage';
import AnimalsUpdatePage from '@/pages/animals/update';
import AnimalsWritePage from '@/pages/animals/write';
import ChattingsPage from '@/pages/chattings';
import ChattingsRoomPage from '@/pages/chattings/room';
import ManageAttendancePage from '@/pages/manage/attendance';
import MyPage from '@/pages/my';
import MyReviewsPage from '@/pages/my/reviews';
import NotFoundPage from '@/pages/notfound';
import NotificationsPage from '@/pages/notifications';
import SettingsAccountPage from '@/pages/settings/account';
import SettingsPasswordPage from '@/pages/settings/password';
import SigninPage from '@/pages/signin';
import SignupPage from '@/pages/signup';
import VolunteersPage from '@/pages/volunteers';
import VolunteersDetailPage from '@/pages/volunteers/detail';
import VolunteersProfilePage from '@/pages/volunteers/profile';
import VolunteersSearchPage from '@/pages/volunteers/search';
import VolunteersUpdatePage from '@/pages/volunteers/update';
import VolunteersWritePage from '@/pages/volunteers/write';

export const router: RouterProviderProps['router'] = createBrowserRouter([
  {
    path: '/',
    element: <Layout appType="SHELTER_APP" />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PATH.VOLUNTEERS.INDEX,
        children: [
          {
            id: 'VOLUNTEERS',
            index: true,
            element: <VolunteersPage />,
          },
          {
            id: 'VOLUNTEERS_DETAIL',
            path: PATH.VOLUNTEERS.DETAIL,
            element: <VolunteersDetailPage />,
          },
          {
            id: 'VOLUNTEERS_PROFILE',
            path: PATH.VOLUNTEERS.PROFILE,
            element: <VolunteersProfilePage />,
          },
          {
            id: 'VOLUNTEERS_SEARCH',
            path: PATH.VOLUNTEERS.SEARCH,
            element: <VolunteersSearchPage />,
          },
          {
            id: 'VOLUNTEERS_WRITE',
            path: PATH.VOLUNTEERS.WRITE,
            element: <VolunteersWritePage />,
          },
          {
            id: 'VOLUNTEERS_UPDATE',
            path: PATH.VOLUNTEERS.UPDATE,
            element: <VolunteersUpdatePage />,
          },
        ],
      },
      {
        path: PATH.ANIMALS.INDEX,
        children: [
          {
            id: 'ANIMALS',
            index: true,
            element: <AnimalsPage />,
          },
          {
            id: 'ANIMALS_DETAIL',
            path: PATH.ANIMALS.DETAIL,
            element: <AnimalsDetailPage />,
          },
          {
            id: 'ANIMALS_SEARCH',
            path: PATH.ANIMALS.SEARCH,
            element: <AnimalsSearchPage />,
          },
          {
            id: 'ANIMALS_WRITE',
            path: PATH.ANIMALS.WRITE,
            element: <AnimalsWritePage />,
          },
          {
            id: 'ANIMALS_UPDATE',
            path: PATH.ANIMALS.UPDATE,
            element: <AnimalsUpdatePage />,
          },
        ],
      },
      {
        path: PATH.CHATTINGS.INDEX,
        children: [
          {
            id: 'CHATTINGS',
            index: true,
            element: <ChattingsPage />,
          },
          {
            id: 'CHATTINGS_ROOM',
            path: PATH.CHATTINGS.ROOM,
            element: <ChattingsRoomPage />,
          },
        ],
      },
      {
        path: PATH.MYPAGE.INDEX,
        children: [
          {
            id: 'MYPAGE',
            index: true,
            element: <MyPage />,
          },
          {
            id: 'MYPAGE_REVIEWS',
            path: PATH.MYPAGE.REVIEWS,
            element: <MyReviewsPage />,
          },
        ],
      },
      {
        path: PATH.SETTINGS.INDEX,
        children: [
          {
            id: 'SETTINGS_ACCOUNT',
            path: PATH.SETTINGS.ACCOUNT,
            element: <SettingsAccountPage />,
          },
          {
            id: 'SETTINGS_PASSWORD',
            path: PATH.SETTINGS.PASSWORD,
            element: <SettingsPasswordPage />,
          },
        ],
      },
      {
        path: PATH.MANAGE.INDEX,
        children: [
          {
            id: 'MANAGE.ATTENDANCE',
            path: PATH.MANAGE.ATTENDANCE,
            element: <ManageAttendancePage />,
          },
          {
            id: 'MANAGE.APPLY',
            path: PATH.MANAGE.APPLY,
            element: <ManageAttendancePage />,
          },
        ],
      },
      {
        id: 'NOTIFICATIONS',
        path: PATH.NOTIFICATIONS,
        element: <NotificationsPage />,
      },
      {
        id: 'SIGNUP',
        path: PATH.SIGNUP,
        element: <SignupPage />,
      },
      {
        id: 'SIGNIN',
        path: PATH.SIGNIN,
        element: <SigninPage />,
      },
    ],
  },
]);
