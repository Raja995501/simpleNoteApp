import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Alert } from '@mui/material';
import { getPublicNote } from '../api';

export default function PublicNote() {
  const { slug } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try { setNote(await getPublicNote(slug)); }
      catch { setError('Note not found or backend offline'); }
    })();
  }, [slug]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!note) return null;

  return (
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>{note.title}</Typography>
        <Typography sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>{note.content}</Typography>
      </CardContent>
    </Card>
  );
}
