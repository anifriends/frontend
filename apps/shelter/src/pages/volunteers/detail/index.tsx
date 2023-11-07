import { useEffect } from 'react';
import useDetailHeaderStore from 'shared/store/detailHeaderStore';

const handleDeletePost = (postId: number) => {
  // TODO: VolunteerPost delete API 호출
  console.log('[Delete Volunteer] postId:', postId);
};

export default function VolunteersDetailPage() {
  const setOnDelete = useDetailHeaderStore((state) => state.setOnDelete);

  useEffect(() => {
    setOnDelete(handleDeletePost);

    return () => {
      setOnDelete(() => {});
    };
  }, [setOnDelete]);

  return <h1>VolunteersDetailPage</h1>;
}
