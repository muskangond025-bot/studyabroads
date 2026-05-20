import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SmoothScroll } from './components/SmoothScroll';

export default function App() {
	return (
		<SmoothScroll>
			<RouterProvider router={router} />
		</SmoothScroll>
	);
}