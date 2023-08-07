import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type={'back'}
      onClick={(evt: React.FormEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}
