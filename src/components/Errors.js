import React from 'react';

export default ({ errors, onClick }) => (
	<div 
		className="error-container" 
		style={{ display: errors !== ''? 'block' : 'none' }}
		onClick={ () => onClick() }
	>
		<p className="error-message">{ errors }</p>
	</div>
)