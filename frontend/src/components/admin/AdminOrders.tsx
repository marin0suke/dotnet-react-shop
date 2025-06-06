// src/pages/admin/AdminOrders.tsx

import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { OrderRaw, OrderItemRaw } from '../../types/Order';
import { fetchAllOrders } from '../../api/orders';

const AdminOrders: React.FC = () => {
  const theme = useTheme();

  const [orders, setOrders] = useState<OrderRaw[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | false>(false);

  useEffect(() => {
    setLoading(true);
    fetchAllOrders()
      .then((data) => {
        setOrders(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Failed to load orders');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAccordionChange = (orderId: number) => {
    setExpandedOrderId((prev) => (prev === orderId ? false : orderId));
  };

  const computeOrderTotal = (items: OrderItemRaw[]): number =>
    items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        backgroundColor: theme.palette.background.default, // keep page background consistent
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: theme.palette.primary.main }}
      >
        Orders
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Box>
          {orders.map((order) => (
            <Accordion
              key={order.id}
              expanded={expandedOrderId === order.id}
              onChange={() => handleAccordionChange(order.id)}
              sx={{
                mb: 2,
                // Remove default shadow; keep a light border instead
                boxShadow: 'none',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  // Remove the gray hover color entirely
                  '&:hover': { backgroundColor: theme.palette.background.paper },
                  // Ensure the summary text is vertically centered
                  '& .MuiAccordionSummary-content': { alignItems: 'center' },
                  // Remove any extra padding if you want a tighter look,
                  // or adjust as needed (default is px=2, py=1.5).
                  px: 2,
                  py: 1.5,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    #{order.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(order.orderDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ship: {order.shippingCity}, {order.shippingCountry}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total: ${computeOrderTotal(order.orderItems).toFixed(2)}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  // Optional: Remove left/right padding if you want the table flush
                  px: 2,
                  py: 2,
                }}
              >
                {/* Shipping Info */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Shipping To:</strong> {order.shippingName}, {order.shippingAddress},{' '}
                    {order.shippingCity} {order.shippingPostalCode}, {order.shippingCountry}
                  </Typography>
                </Box>

                {/* Line Items Table */}
                <TableContainer component={Paper} elevation={1}>
                  <Table size="small" aria-label={`Order ${order.id} items`}>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Product ID</strong></TableCell>
                        <TableCell align="right"><strong>Qty</strong></TableCell>
                        <TableCell align="right"><strong>Unit Price</strong></TableCell>
                        <TableCell align="right"><strong>Subtotal</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.orderItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productId}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>
                          <TableCell align="right">
                            ${(item.unitPrice * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell colSpan={3} align="right" sx={{ fontWeight: 600 }}>
                          Order Total
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          ${computeOrderTotal(order.orderItems).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default AdminOrders;