import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const LinkBehaviour = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => {
    return <RouterLink ref={ref} {...props} />;
});

export default LinkBehaviour;