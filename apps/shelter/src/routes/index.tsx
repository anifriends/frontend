import { createBrowserRouter } from 'react-router-dom';
import Layout from 'ui/layout';

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
          { index: true, element: <VolunteersPage /> },
          { path: PATH.VOLUNTEERS.DETAIL, element: <VolunteersDetailPage /> },
          { path: PATH.VOLUNTEERS.PROFILE, element: <VolunteersProfilePage /> },
          { path: PATH.VOLUNTEERS.SEARCH, element: <VolunteersSearchPage /> },
          { path: PATH.VOLUNTEERS.WRITE, element: <VolunteersWritePage /> },
          { path: PATH.VOLUNTEERS.UPDATE, element: <VolunteersUpdatePage /> },
        ],
      },
      {
        path: PATH.ANIMALS.INDEX,
        children: [
          { index: true, element: <AnimalsPage /> },
          { path: PATH.ANIMALS.DETAIL, element: <AnimalsDetailPage /> },
          { path: PATH.ANIMALS.SEARCH, element: <AnimalsSearchPage /> },
          { path: PATH.ANIMALS.WRITE, element: <AnimalsWritePage /> },
          { path: PATH.ANIMALS.UPDATE, element: <AnimalsUpdatePage /> },
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
        children: [
          { index: true, element: <MyPage /> },
          { path: PATH.MYPAGE.REVIEWS, element: <MyReviewsPage /> },
        ],
      },
      {
        path: PATH.SETTINGS.INDEX,
        children: [
          { path: PATH.SETTINGS.ACCOUNT, element: <SettingsAccountPage /> },
          { path: PATH.SETTINGS.PASSWORD, element: <SettingsPasswordPage /> },
        ],
      },
      {
        path: PATH.MANAGE.INDEX,
        children: [
          { path: PATH.MANAGE.ATTENDANCE, element: <ManageAttendancePage /> },
          { path: PATH.MANAGE.APPLY, element: <ManageAttendancePage /> },
        ],
      },
      { path: PATH.NOTIFICATIONS, element: <NotificationsPage /> },
      { path: PATH.SIGNUP, element: <SignupPage /> },
      { path: PATH.SIGNIN, element: <SigninPage /> },
    ],
  },
]);
