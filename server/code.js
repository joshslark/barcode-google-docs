/**
 * This is for the gas-webpack-plugin to explicitly expose function to GAS
 */

import {
	onOpen,
	onInstall,
	showSidebar,
	base64Decode,
	newBlob,
	appendImage
} from './index'

global.onOpen = onOpen;
global.onInstall = onInstall;
global.showSidebar = showSidebar;
global.base64Decode = base64Decode;
global.newBlob = newBlob;
global.appendImage = appendImage;

