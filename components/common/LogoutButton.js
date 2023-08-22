import { useCustomer } from '@/context/CustomerContext';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import React from 'react';

function LogoutButton(props) {
    const { logout } = useCustomer() ; 

    return (
        <button onClick={() => logout()}>
            <ArrowLeftOnRectangleIcon className='h-9 w-9 text-orange-400' />
        </button>
    );
}

export default LogoutButton;