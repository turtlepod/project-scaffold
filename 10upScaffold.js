// @ts-check
'use strict';

const chalk = require( 'chalk' );
const clone = require( 'git-clone' );
const commander = require( 'commander' );
const fs = require( 'fs-extra' );
const packageJson = require( './package.json' );
const path = require( 'path' );
const replace = require( 'replace-in-file' );
const {
	promptFields,
	promptToContinue,
	promptOptions,
	startWith,
	onFinalError,
	exit,
	DontContinue,
} = require( 'interactive-cli' );

// Set default args.
let projectType = ''; // Option are 'theme', 'plugin', and 'wp-content'.

/**
 * Set Main Program.
 */
const program = new commander.Command( packageJson.name )
	.version( packageJson.version )
	.arguments( '<project-type>' )
	.usage( `${chalk.green( '<project-type>' )} [options]` )
	.action( (type) => {
		projectType = type.toLowerCase();
	} )
	.allowUnknownOption()
	.parse( process.argv );

/**
 * WHAT IS THIS
 */
new Promise( ( resolve, reject ) => {
	resolve( {
		setupTheme: () => Promise.resolve(),
		setupPlugin: () => Promise.resolve(),
		setupWPContent: () => Promise.resolve(),
	} );
} )
	.then( api => {
		const initialOptions = {
			setupTheme: 'Setup a new theme',
			setupPlugin: 'Setup a new plugin',
			setupWPContent: 'Setup wp-content',
		};
		const handler = ( selection ) => {
			switch ( selection ) {
				case 'setupTheme':
					return setupTheme( api )
				case 'setupPlugin':
					return setupPlugin( api )
				case 'setupWPContent':
					return setupWPContent( api )
				default: {
				}
			}
		};

		return startWith( 'What would you like to setup?', initialOptions, handler );
	} )
	.catch( onFinalError )
	.then( exit );

/**
 * Setup Theme.
 */
function setupTheme( api ) {
	console.log( 'setupTheme() running', api );
	new ExitScript( `Unknown selection` )
}

/**
 * Setup Plugin.
 */
function setupPlugin( api ) {
	console.log( 'setupPlugin() running' );
	return false;
}

/**
 * Setup wp-content
 */
function setupWPContent( api ) {
	console.log( 'setupWPContent() running' );
}

// Init flow.
const project = [];

// Project type not set.
if ( '' === projectType || undefined === packageJson.tenup.repos[ projectType ] ) {
	// setupTheme();

	promptFields();

} else {
	
}




















































































