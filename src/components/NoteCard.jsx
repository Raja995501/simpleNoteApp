import { Card, CardContent, CardActions, Typography, IconButton, Tooltip, Button, Chip, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function NoteCard({ note, onCopy, onEdit, onDelete }) {
  return (
    <Card elevation={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{note.title}</Typography>
          {note.isPublic && <Chip label="Public" color="secondary" size="small" />}
        </Stack>
        <Typography sx={{ mt: 1, whiteSpace: 'pre-wrap', color: 'text.secondary' }}>
          {note.content?.slice(0, 160) || 'No content'}
          {note.content && note.content.length > 160 ? '…' : ''}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <div>
          <Button size="small" startIcon={<EditIcon />} onClick={onEdit}>Edit</Button>
          <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={onDelete}>Delete</Button>
        </div>
        {note.isPublic && note.slug && (
          <Tooltip title="Copy public link">
            <IconButton color="primary" onClick={onCopy}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}
