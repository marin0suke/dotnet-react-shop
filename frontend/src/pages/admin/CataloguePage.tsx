import { Box, Typography } from '@mui/material';

const CataloguePage = () => {
  return (
    <Box p={4}>
      <Typography variant="h4">Product Catalogue</Typography>
      <Typography color="text.secondary">
        Edit, delete, and manage product listings.
      </Typography>
    </Box>
  );
};

export default CataloguePage; 