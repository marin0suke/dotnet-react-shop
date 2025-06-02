import { Menu, MenuItem } from "@mui/material";
import React, { useState, useRef } from "react";

export interface MenuOption {
    label: string; // must have a label.
    onClick: () => void; // must have an onClick handler.
}

export interface HoverMenuProps {
    trigger: React.ReactElement<any, any>; // must be a valid react element. but can inject any props.
    options: MenuOption[];
    menuId?: string;
    closeDelay?: number; 
}

export const HoverMenu: React.FC<HoverMenuProps> = ({ trigger, options, menuId = 'hover-menu', closeDelay = 150 }) => {
    const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);
    const closeTimer = useRef<number | undefined>(undefined);
    const triggerRef = useRef<HTMLElement>(null);


    const open = Boolean(anchorEl); 

    
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        if (closeTimer.current) {
            window.clearTimeout(closeTimer.current); // clear any existing timer
        }
        setAnchorEl(e.currentTarget); // set the anchor element
    };

    const handleMouseLeave = () => {
        closeTimer.current! = window.setTimeout(() => { 
            setAnchorEl(null); 
            if (triggerRef.current) {
                triggerRef.current.focus();
            }
        }, closeDelay); 
    };

    const triggerWithProps = React.cloneElement(trigger, { 
        ref: triggerRef,
        "aria-haspopup":'true', 
        "aria-controls": open ? menuId : undefined,
        "aria-expanded": open ? 'true' : undefined,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    });
    
    return (
        <>
            {triggerWithProps}
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMouseLeave}
                disableAutoFocusItem
                disableEnforceFocus
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{  
                    vertical: 'top',
                    horizontal: 'left',
                }}
                slotProps={{       
                    list: {
                        onMouseEnter: () => window.clearTimeout(closeTimer.current!),
                        onMouseLeave: handleMouseLeave
                    }
                }}
        
            >
                {options.map(opt => (
                    <MenuItem
                        key={opt.label}
                        onClick={() => {
                            opt.onClick();
                            setAnchorEl(null); // close the menu after the option is clicked.
                        }}
                    >
                        {opt.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
