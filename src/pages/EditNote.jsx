import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, Stack, TextField, Button, Switch, FormControlLabel, Snackbar, Alert, Typography } from '@mui/material';
import { getNote, updateNote } from '../api';

export default function EditNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try { setNote(await getNote(id)); }
      catch { setSnack({ open: true, msg: 'Cannot load note (backend offline)', severity: 'error' }); }
    })();
  }, [id]);

  if (!note) return null;

  const save = async () => {
    try {
      await updateNote(id, note);
      setSnack({ open: true, msg: 'Saved', severity: 'success' });
      setTimeout(() => navigate('/'), 700);
    } catch {
      setSnack({ open: true, msg: 'Cannot save (backend offline)', severity: 'error' });
    }
  };

  const copy = () => {
    if (note.isPublic && note.slug) {
      navigator.clipboard.writeText(`${window.location.origin}/n/${note.slug}`);
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Edit Note</Typography>
      <Stack spacing={2}>
        <TextField label="Title" value={note.title} onChange={e => setNote({ ...note, title: e.target.value })} />
        <TextField label="Content" multiline minRows={6}
          value={note.content || ''} onChange={e => setNote({ ...note, content: e.target.value })} />
        <FormControlLabel control={<Switch checked={note.isPublic} onChange={e => setNote({ ...note, isPublic: e.target.checked })} />}
          label={note.isPublic ? 'Public (shareable)' : 'Private'} />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={save}>Save</Button>
          <Button variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
          <Button variant="text" disabled={!note.isPublic || !note.slug} onClick={copy}>Copy Link</Button>
        </Stack>
      </Stack>
      <Snackbar open={snack.open} autoHideDuration={1800} onClose={() => setSnack(s => ({ ...s, open: false }))}>
        <Alert severity={snack.severity} variant="filled">{snack.msg}</Alert>
      </Snackbar>
    </Paper>
  );
}
