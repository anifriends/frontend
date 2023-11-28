import { useParams } from 'react-router-dom';

export default function SheltersReviewsUpdatePage() {
  const { shelterId, reviewId } = useParams();
  console.log(shelterId, reviewId);

  return <h1>SheltersReviewsUpdatePage</h1>;
}
