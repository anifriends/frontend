import { useParams } from 'react-router-dom';

export default function SheltersReviewsWritePage() {
  const { shelterId, applicantId } = useParams();
  console.log(shelterId, applicantId);

  return <h1>SheltersReviewsWritePage</h1>;
}
