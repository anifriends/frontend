import { createBrowserRouter, RouterProviderProps } from 'react-router-dom';
import WithLogin from 'shared/components/WithLogin';
import APP_TYPE from 'shared/constants/appType';
import PAGE_TYPE from 'shared/constants/pageType';
import Layout from 'shared/layout';

import PATH from '@/constants/path';
import AnimalsPage from '@/pages/animals';
import AnimalsDetailPage from '@/pages/animals/detail';
import AnimalsSearchPage from '@/pages/animals/search';
import AnimalsUpdatePage from '@/pages/animals/update';
import AnimalsWritePage from '@/pages/animals/write';
import ChattingsPage from '@/pages/chattings';
import ChattingsRoomPage from '@/pages/chattings/room';
import ManageApplyPage from '@/pages/manage/apply';
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
    element: <Layout appType={APP_TYPE.SHELTER_APP} />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PATH.VOLUNTEERS.INDEX,
        children: [
          {
            id: PAGE_TYPE.VOLUNTEERS,
            index: true,
            element: (
              <WithLogin>
                <VolunteersPage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.VOLUNTEERS_DETAIL,
            path: PATH.VOLUNTEERS.DETAIL,
            element: (
              <WithLogin>
                <VolunteersDetailPage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.VOLUNTEERS_PROFILE,
            path: PATH.VOLUNTEERS.PROFILE,
            element: (
              <WithLogin>
                <VolunteersProfilePage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.VOLUNTEERS_SEARCH,
            path: PATH.VOLUNTEERS.SEARCH,
            element: (
              <WithLogin>
                <VolunteersSearchPage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.VOLUNTEERS_WRITE,
            path: PATH.VOLUNTEERS.WRITE,
            element: (
              <WithLogin>
                <VolunteersWritePage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.VOLUNTEERS_UPDATE,
            path: PATH.VOLUNTEERS.UPDATE,
            element: (
              <WithLogin>
                <VolunteersUpdatePage />
              </WithLogin>
            ),
          },
        ],
      },
      {
        path: PATH.ANIMALS.INDEX,
        children: [
          {
            id: PAGE_TYPE.ANIMALS,
            index: true,
            element: (
              <WithLogin>
                <AnimalsPage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.ANIMALS_DETAIL,
            path: PATH.ANIMALS.DETAIL,
            element: (
              <WithLogin>
                <AnimalsDetailPage />,
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.ANIMALS_SEARCH,
            path: PATH.ANIMALS.SEARCH,
            element: (
              <WithLogin>
                <AnimalsSearchPage />,
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.ANIMALS_WRITE,
            path: PATH.ANIMALS.WRITE,
            element: (
              <WithLogin>
                <AnimalsWritePage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.ANIMALS_UPDATE,
            path: PATH.ANIMALS.UPDATE,
            element: (
              <WithLogin>
                <AnimalsUpdatePage />
              </WithLogin>
            ),
          },
        ],
      },
      {
        path: PATH.CHATTINGS.INDEX,
        children: [
          {
            id: PAGE_TYPE.CHATTINGS,
            index: true,
            element: (
              <WithLogin>
                <ChattingsPage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.CHATTINGS_ROOM,
            path: PATH.CHATTINGS.ROOM,
            element: (
              <WithLogin>
                <ChattingsRoomPage />
              </WithLogin>
            ),
          },
        ],
      },
      {
        path: PATH.MYPAGE.INDEX,
        children: [
          {
            id: PAGE_TYPE.MYPAGE,
            index: true,
            element: (
              <WithLogin>
                <MyPage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.MYPAGE_REVIEWS,
            path: PATH.MYPAGE.REVIEWS,
            element: (
              <WithLogin>
                <MyReviewsPage />
              </WithLogin>
            ),
          },
        ],
      },
      {
        path: PATH.SETTINGS.INDEX,
        children: [
          {
            id: PAGE_TYPE.SETTINGS_ACCOUNT,
            path: PATH.SETTINGS.ACCOUNT,
            element: (
              <WithLogin>
                <SettingsAccountPage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.SETTINGS_PASSWORD,
            path: PATH.SETTINGS.PASSWORD,
            element: (
              <WithLogin>
                <SettingsPasswordPage />
              </WithLogin>
            ),
          },
        ],
      },
      {
        path: PATH.MANAGE.INDEX,
        children: [
          {
            id: PAGE_TYPE.MANAGE_ATTENDANCE,
            path: PATH.MANAGE.ATTENDANCE,
            element: (
              <WithLogin>
                <ManageAttendancePage />
              </WithLogin>
            ),
          },
          {
            id: PAGE_TYPE.MANAGE_APPLY,
            path: PATH.MANAGE.APPLY,
            element: (
              <WithLogin>
                <ManageApplyPage />
              </WithLogin>
            ),
          },
        ],
      },
      {
        id: PAGE_TYPE.NOTIFICATIONS,
        path: PATH.NOTIFICATIONS,
        element: (
          <WithLogin>
            <NotificationsPage />
          </WithLogin>
        ),
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
