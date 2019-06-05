/* global $, JsBarcode*/

$(function insertBarcode() {
	function onFailure(error) {
		console.error ("Printing: " + error);
	}
	JsBarcode( '#barcode' ).init();
	var barcodeCanvas = document.querySelector("#barcode");
	var base64Str = barcodeCanvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, "");
	google.script.run.withFailureHandler(onFailure).
		appendImage(base64Str);
});

function updateBarcodePreview() {
	var prefix = $('input[name="barcodePrefix"]').val();
	var sku = $('input[name="barcodeSku"]').val();

	JsBarcode("#barcode", prefix+sku);
	console.log(prefix+sku);
}

$("#barcodeGeneratorStart").on("click", updateBarcodePreview());
