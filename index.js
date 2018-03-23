function findCompletedItems(root) {
	var items = root.findCompletedItemsResponse[0].searchResult[0].item || [];

	var html = [];
	html.push(
        '<table width="100%" border="5" cellspacing="6" cellpadding="3" color="black"><tbody>'
	);
	for (var i = 0; i < items.length; ++i) {
		var item = items[i];
		var title = item.title;
		var pic = item.galleryURL;
		var viewitem = item.viewItemURL;
        var currency = item.sellingStatus[0].currentPrice[0]['@currencyId'];
        var price = item.sellingStatus[0].currentPrice[0].__value__;
        var oldDate = item.listingInfo[0].endTime;
        var newSellingState = item.listingInfo[0].sellingState;
        console.log(newSellingState);
        date = new Date(oldDate);
        year = date.getFullYear();
        month = date.getMonth()+1;
        dt = date.getDate();
        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }
        var displayDate = (year+'-' + month + '-'+dt);
		if (newSellingState ="EndedwithSales" && null !== title && null !== viewitem) {
			html.push(`<tr><td><img src="${pic}" border="0"></td>
         <td><a href="${viewitem}" target="_blank">${title}</a></td> <td></h3>
        $${price}</td><td> ${displayDate} </td></tr>`);
		}
	}
	html.push('</tbody></table>');
	document.getElementById('results').innerHTML = html.join('');
} // End _cb_findCompletedItems() function

function formSubmit(event) {
	event.preventDefault();
    var term = $(this).find('input').val();
    
	var filter = {
		securityAppName: 'MarkBene-CardColl-PRD-b5d8a3c47-2072216b',
		findBy: 'findCompletedItems',
	};
	var url = `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=${filter.findBy}&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${filter.securityAppName}&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=findCompletedItems&REST-PAYLOAD&keywords=${term}"card"&paginationInput.entriesPerPage=80`;
   
    //create <script> element
    //set script element's src attribute
    //append it to the end of the document body
    
    s = document.createElement('script');
	s.src = url;
	document.body.appendChild(s);
}

 $("#clear-search").click(function(event){
    event.preventDefault();
    $("#results").empty();
    document.getElementById('search').value = '';

  });
function init() {
	$('.start-search').click(function() {
		$('#start-page').hide();
		$('.search-page').show();
        $('.form').submit(formSubmit);
    
	});
}

init();