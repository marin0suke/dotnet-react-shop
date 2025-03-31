import { TextField } from "@mui/material";
import { useState } from "react";

interface QuantityInputProps {
    productId: number; 
    quantity: number;
    onUpdate: (productId: number, newQuantity: number) => void; // callback to update the cart
}

const QuantityInput = ({ productId, quantity, onUpdate }: QuantityInputProps) => {
    const [value, setValue] = useState<string>(quantity.toString()); // store as string since MUI TextField is managed as string.

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    ;}

    const handleBlur = () => {
        const newQuantity = parseInt(value, 10); 

        if (!isNaN(newQuantity) && newQuantity > 0) {
            onUpdate(productId, newQuantity); 
        } else {
            setValue(quantity.toString()); // keep as is.
        }
    };

    return (
        <TextField 
          type="number"
          label="Qty"
          size="small"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          slotProps={{ htmlInput: { min: 1, style: { textAlign: 'center'} } }} // prevent entering value less than 1. 
          sx={{ width: '80px' }}
        />
    );
};

export default QuantityInput;