// src/pages/admin/AdminUserList.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { UserSummaryRaw } from '../../types/User';
import { fetchAllRetailers } from '../../api/users';

const AdminRetailerList: React.FC = () => {
  const theme = useTheme();

  const [users, setUsers] = useState<UserSummaryRaw[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAllRetailers()
      .then(data => {
        setUsers(data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Failed to load users');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 1️⃣ Separate users into non-admins and admins
  const nonAdmins = users.filter(u => !u.roles.includes('Admin'));
  const admins = users.filter(u => u.roles.includes('Admin'));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: theme.palette.primary.main }}
      >
        User Management
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        <Box>
          {/* 2️⃣ Non-admins table */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 3, fontWeight: 600, color: theme.palette.secondary.main }}
          >
            All Retailers
          </Typography>
          {nonAdmins.length === 0 ? (
            <Typography sx={{ mb: 2 }}>No non-admin users found.</Typography>
          ) : (
            <TableContainer component={Paper} elevation={1} sx={{ mb: 4 }}>
              <Table aria-label="Non-admin Users">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>User ID</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Roles</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nonAdmins.map(u => (
                    <TableRow key={u.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{u.id}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.roles.length ? u.roles.join(', ') : '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* 3️⃣ Admins table */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 3, fontWeight: 600, color: theme.palette.secondary.main }}
          >
            Admin Users
          </Typography>
          {admins.length === 0 ? (
            <Typography>No admin users found.</Typography>
          ) : (
            <TableContainer component={Paper} elevation={1}>
              <Table aria-label="Admin Users">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>User ID</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Roles</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {admins.map(admin => (
                    <TableRow key={admin.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{admin.id}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.roles.join(', ')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </Container>
  );
};

export default AdminRetailerList;