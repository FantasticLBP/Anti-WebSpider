(function ($) {

	function loadData() {
		var url = "http://127.0.0.1:3000/api/solution2";
		$.ajax({
			type: "GET",
			async: true,
			url: url,
			data: JSON.stringify({ "key": "gwwwh333" }),
			success: function (json) {
				if (!jQuery.isEmptyObject(json)) {
					console.log(JSON.stringify(json));
					var data = json.data;
					$("#title").html(data.title);
					$("#birthday").html(data.birthday);
					$("#company").html(data.company);
					$("#address").html(data.address);
					$("#bidprice").html(data.bidprice);
					$("#negative").html(data.negative);
					$("#honor").html(data.honor);
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("请求失败，请检查网络后重试");
			}
		});
	}

	$.Solution2 = function (arg) {
		setTimeout(() => {
			loadData();
		}, 1000);
	}
})(jQuery);

