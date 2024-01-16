import { useDetailHeaderStore } from '@anifriends/store';
import { useEffect } from 'react';

const handleDeletePost = (postId: number) => {
  // TODO: AnimalPost delete API 호출
  console.log('[Delete Animal] postId:', postId);
};

export default function AnimalsDetailPage() {
  const setOnDelete = useDetailHeaderStore((state) => state.setOnDelete);

  useEffect(() => {
    setOnDelete(handleDeletePost);

    return () => {
      setOnDelete(() => {});
    };
  }, [setOnDelete]);

  return <h1>AnimalsDetailPage</h1>;
}
