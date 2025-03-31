import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface ClearCartConfirmationProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ClearCartConfirmation = ({ open, onConfirm, onCancel }: ClearCartConfirmationProps) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Clear Cart</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to clear your cart?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} color="error">Clear Cart</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ClearCartConfirmation;