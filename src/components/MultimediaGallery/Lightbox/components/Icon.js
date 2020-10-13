import PropTypes from 'prop-types';
import React from 'react';
//import {icons} from '../icons';
var icons = require('../icons/index');

const Icon = ({ fill, type, ...props }) => {
	const icon = icons[type];
	return (
		<span
			dangerouslySetInnerHTML={{ __html: icon(fill) }}
			{...props}
		/>
	);
};
icons=icons.default;
Icon.propTypes = {
	fill: PropTypes.string,
	type: PropTypes.oneOf(Object.keys(icons)),
};
Icon.defaultProps = {
	fill: 'white',
};

export default Icon;
