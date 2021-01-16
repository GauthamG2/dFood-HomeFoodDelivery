!(function($){

	$.extend({
		toast: function(msg, time){
			var $toast = $('<div class="modal-mask"></div><div class="modal m-toast">' + msg + '</div>').appendTo(document.body);
			var w = $(".m-toast").outerWidth();
			$(".m-toast").css({marginLeft:-w/2}).addClass("modal-in");

	        setTimeout(function(){
	        	$.closeModal()
	        },time || 2000)
		},
		modal: function(params){
			successTitle="Successs";
			successMessage="Points Redeemed Succesfully!";
			params = params || {};
			var title =successTitle ? '<div class="modal-title">'+successTitle+'</div>' : '';""
			var textHtml = successMessage ? '<div class="modal-text">'+successMessage+'</div>' : '';
			var btns = '';
			params.buttons.forEach(function(el){
				btns += '<span class="modal-button">'+el.text+'</span>'
			})

			var tpl = '<div class="modal-overlay modal-overlay-visible"></div>'+
					'<div class="modal m-alert">'+
						'<div class="modal-inner">'+title+textHtml+'</div>'+
						'<div class="modal-buttons ">'+
							btns+
						'</div>'+
					'</div>'

			$("body").append(tpl);

			var h = $(".modal").outerHeight();

			$(".modal").css({marginTop:-h/2+'px'}).addClass("modal-in");

			$(".modal-button").each(function(i, el){
				$(el).click(function(){
					$.closeModal(params.buttons[i].onClick)
				})
			})
		},


		closeModal: function(fn){
			$(".modal").addClass("modal-out");
			$(".modal-overlay").removeClass("modal-overlay-visible");

			$(".modal").on("transitionend",function(){
				$(".modal,.modal-overlay,.modal-mask").remove();
				if(fn && typeof fn == "function"){
					fn();
				}
			})
		},
		alert: function(msg, title, callback){
			if(typeof title == "function"){
				callback = arguments[1];
				title = undefined;
			}

			$.modal({
				title: title,
				text: msg,
				buttons: [
					{onClick: callback, text: 'Okay'}
				]
			})
		},

		confirm: function(msg, title, onOk, onCancle){
			if(typeof title == "function"){
				onCancle = arguments[2] || function(){};
				onOk = arguments[1];
				title = undefined;
			}

			$.modal({
				title: title,
				text: msg,
				buttons: [
					{onClick: onCancle, text: 'Cancel'},
					{onClick: onOk, text: 'Okay'}
				]
			})
		},

		redeem: function(msg, title, callback){
			if(typeof title == "function"){
				callback = arguments[1];
				title = undefined;
			}

			$.modal({
				title: title,
				text: msg,
				buttons: [
					{onClick: callback, text: 'OK'}
				]
			})
		},
	

	

	});
})(jQuery)
