import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	span,
	input,
	textarea {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: none;
	}

	body {
		margin: 0;
		font-family: 'Open Sans Condensed', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}

	a {
		text-decoration: none;
		color: black;
	}

	* {
		box-sizing: border-box;
	}
`;
