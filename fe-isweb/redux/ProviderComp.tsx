"use client"

import { Provider } from 'react-redux';
import store from './store'


interface ProviderProps {
    children : React.ReactNode;
}

function ProviderComp ( { children } : ProviderProps ) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ProviderComp;