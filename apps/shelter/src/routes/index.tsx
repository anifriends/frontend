import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/layout';
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PATH.VOLUNTEERS.INDEX,
        children: [
          {
            id: `SHELTER_APP:VOLUNTEERS`,
            index: true,
            element: <VolunteersPage />,
          },
          {
            id: 'SHELTER_APP:VOLUNTEERS_DETAIL',
            path: PATH.VOLUNTEERS.DETAIL,
            element: <VolunteersDetailPage />,
          },
          {
            id: 'SHELTER_APP:VOLUNTEERS_PROFILE',
            path: PATH.VOLUNTEERS.PROFILE,
            element: <VolunteersProfilePage />,
          },
          {
            id: 'SHELTER_APP:VOLUNTEERS_SEARCH',
            path: PATH.VOLUNTEERS.SEARCH,
            element: <VolunteersSearchPage />,
          },
          {
            id: 'SHELTER_APP:VOLUNTEERS_WRITE',
            path: PATH.VOLUNTEERS.WRITE,
            element: <VolunteersWritePage />,
          },
          {
            id: 'SHELTER_APP:VOLUNTEERS_UPDATE',
            path: PATH.VOLUNTEERS.UPDATE,
            element: <VolunteersUpdatePage />,
          },
        ],
      },
      {
        path: PATH.ANIMALS.INDEX,
        children: [
          {
            id: 'SHELTER_APP:ANIMALS',
            index: true,
            element: <AnimalsPage />,
          },
          {
            id: 'SHELTER_APP:ANIMALS_DETAIL',
            path: PATH.ANIMALS.DETAIL,
            element: <AnimalsDetailPage />,
          },
          {
            id: 'SHELTER_APP:ANIMALS_SEARCH',
            path: PATH.ANIMALS.SEARCH,
            element: <AnimalsSearchPage />,
          },
          {
            id: 'SHELTER_APP:ANIMALS_WRITE',
            path: PATH.ANIMALS.WRITE,
            element: <AnimalsWritePage />,
          },
          {
            id: 'SHELTER_APP:ANIMALS_UPDATE',
            path: PATH.ANIMALS.UPDATE,
            element: <AnimalsUpdatePage />,
          },
        ],
      },
      {
        path: PATH.CHATTINGS.INDEX,
        children: [
          {
            id: 'SHELTER_APP:CHATTINGS',
            index: true,
            element: <ChattingsPage />,
          },
          {
            id: 'SHELTER_APP:CHATTINGS_ROOM',
            path: PATH.CHATTINGS.ROOM,
            element: <ChattingsRoomPage />,
          },
        ],
      },
      {
        path: PATH.MYPAGE.INDEX,
        children: [
          {
            id: 'SHELTER_APP:MYPAGE',
            index: true,
            element: <MyPage />,
          },
          {
            id: 'SHELTER_APP:MYPAGE_REVIEWS',
            path: PATH.MYPAGE.REVIEWS,
            element: <MyReviewsPage />,
          },
        ],
      },
      {
        path: PATH.SETTINGS.INDEX,
        children: [
          {
            id: 'SHELTER_APP:SETTINGS_ACCOUNT',
            path: PATH.SETTINGS.ACCOUNT,
            element: <SettingsAccountPage />,
          },
          {
            id: 'SHELTER_APP:SETTINGS_PASSWORD',
            path: PATH.SETTINGS.PASSWORD,
            element: <SettingsPasswordPage />,
          },
        ],
      },
      {
        path: PATH.MANAGE.INDEX,
        children: [
          {
            id: 'SHELTER_APP:MANAGE.ATTENDANCE',
            path: PATH.MANAGE.ATTENDANCE,
            element: <ManageAttendancePage />,
          },
          {
            id: 'SHELTER_APP:MANAGE.APPLY',
            path: PATH.MANAGE.APPLY,
            element: <ManageAttendancePage />,
          },
        ],
      },
      {
        id: 'SHELTER_APP:NOTIFICATIONS',
        path: PATH.NOTIFICATIONS,
        element: <NotificationsPage />,
      },
      {
        id: 'SHELTER_APP:SIGNUP',
        path: PATH.SIGNUP,
        element: <SignupPage />,
      },
      {
        id: 'SHELTER_APP:SIGNIN',
        path: PATH.SIGNIN,
        element: <SigninPage />,
      },
    ],
  },
]);
