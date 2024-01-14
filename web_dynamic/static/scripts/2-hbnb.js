$(() => {
    $.getJSON("http://0.0.0.0:5001/api/v1/status/", function (api) {
        if (api.status === "OK") {
            $("div#api_status").addClass("available");
        } else {
            $("div#api_status").removeClass("available");
        }
    }
    );

})


