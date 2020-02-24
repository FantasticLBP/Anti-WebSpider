(function ($) {	

	function loadData(){
		var url = "http://127.0.0.1:3000/api/solution1";
		$.ajax({
			type: "GET",
			async: true,
			url: url,
			data: JSON.stringify({ "key": "gwwwh222" }),
			success: function (json) {
				if (!jQuery.isEmptyObject(json)) {
					var data = json.data;
					var log = data.analysis;
					$("#name").text(data.name);
					$("#year").html(getRawData(data.year,log));
					$("#month").html(getRawData(data.month,log));
					$("#day").html(getRawData(data.day,log));

					console.log($("#day").val());
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("请求失败，请检查网络后重试");
			}
		});
	}

	$.Solution1 = function (arg) {
		setTimeout(() => {
			loadData();
		}, 1000);
	}
})(jQuery);