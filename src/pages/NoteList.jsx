import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button, Stack, Switch, FormControlLabel, Snackbar, Alert, Typography } from '@mui/material';
import NoteCard from '../components/NoteCard';
import { getNotes, createNote, deleteNote } from '../api';

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });
  const navigate = useNavigate();

  const load = async () => {
    try {
      const data = await getNotes();
      setNotes(Array.isArray(data) ? data : []);
    } catch {
      setNotes([]);
      setSnack({ open: true, msg: 'Backend offline (showing empty list)', severity: 'info' });
    }
  };
  useEffect(() => { load(); }, []);

  const addNote = async () => {
    if (!title.trim()) return setSnack({ open: true, msg: 'Title required', severity: 'warning' });
    try {
      await createNote({ title, content, isPublic });
      setTitle(''); setContent(''); setIsPublic(true);
      await load();
      setSnack({ open: true, msg: 'Note created', severity: 'success' });
    } catch {
      setSnack({ open: true, msg: 'Cannot create (backend offline)', severity: 'error' });
    }
  };

  const copyLink = (n) => {
    const url = `${window.location.origin}/n/${n.slug}`;
    navigator.clipboard.writeText(url);
    setSnack({ open: true, msg: 'Link copied', severity: 'info' });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={6} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Create Note</Typography>
          <Stack spacing={2}>
            <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <TextField label="Content" value={content} onChange={e => setContent(e.target.value)} multiline minRows={4} />
            <FormControlLabel control={<Switch checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />}
              label={isPublic ? 'Public (shareable)' : 'Private'} />
            <Button variant="contained" onClick={addNote}>Add</Button>
          </Stack>
        </Paper>
      </Grid>

      {notes.map(n => (
        <Grid key={n.id} item xs={12} sm={6}>
          <NoteCard
            note={n}
            onCopy={() => copyLink(n)}
            onEdit={() => navigate(`/edit/${n.id}`)}
            onDelete={async () => {
              try { await deleteNote(n.id); await load(); setSnack({ open: true, msg: 'Deleted', severity: 'success' }); }
              catch { setSnack({ open: true, msg: 'Cannot delete (backend offline)', severity: 'error' }); }
            }}
          />
        </Grid>
      ))}

      <Snackbar open={snack.open} autoHideDuration={1800} onClose={() => setSnack(s => ({ ...s, open: false }))}>
        <Alert severity={snack.severity} variant="filled">{snack.msg}</Alert>
      </Snackbar>
    </Grid>
  );
}
