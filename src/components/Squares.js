import React from 'react';
import Square from './Square';
import '../css/output.css';

export default ({sequencer, onMouseUpSquare, onMouseDownSquare}) => (
	<div>
		<div className="sequencer-square-container" >
			{ sequencer.map(( square, i) => (
				<Square 
					key={ i } 
					id={ i } 
					colour={ square.get('colour')} 
					// onClick={ () => onClickSquare(i) }
					onMouseDown={ () => onMouseDownSquare(i) }
					onMouseUp={ () => onMouseUpSquare(i) }
				/>
			))}
		</div>
	</div>
)