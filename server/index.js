/**
 * @NotOnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/* globals PropertiesService, DocumentApp, UrlFetchApp, Utilities, HtmlService,
 * Logger */
//import { OAuth2 } from 'imports-loader?_=./Underscore.gs!apps-script-oauth2/dist/OAuth2.gs'

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
export function onOpen() {
	DocumentApp.getUi()
		.createMenu('Create Barcode')
		.addItem('Show sidebar', 'showSidebar')
		.addToUi();
}

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
export function onInstall( e ) {
	onOpen( e );
}

/**
 * Allow the HTML template to include files
 *
 * @param {string} filename file to include
 * @returns {string} rendered content
 */
export function include( filename ) {
	return HtmlService.createHtmlOutputFromFile( filename )
		.getContent();
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 */
export function showSidebar() {
	const page = HtmlService.createTemplateFromFile( 'sidebar' ).evaluate();

	page.setTitle( 'Barcode Creator' );
	page.setWidth(300);
	DocumentApp.getUi().showSidebar( page );
}

export function appendImage(canvasBase64Str) {
	const activeDocId = DocumentApp.getActiveDocument().getId();
	var doc = DocumentApp.openById( activeDocId );

	const pipe = (...functions) => data =>
		functions.reduce((value, func) => func(value), data);

	const base64Decode = base64Str => Utilities.base64Decode(canvasBase64Str);
	const newBlob = base64ByteArr => Utilities.newBlob(base64ByteArr, MimeType.PNG);
	const appendImage = imageBlob => doc.appendImage(imageBlob);

	const base64ToDocument = base64Str => 
		pipe( base64Decode,
			newBlob,
			appendImage)(base64Str);
	base64ToDocument(canvasBase64Str);
}	
