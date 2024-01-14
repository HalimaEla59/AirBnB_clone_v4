$(() => {
    let checkedAmenities = {};
    $(document).on('change', "input[type='checkbox']", function () {
        if (this.checked) {
            checkedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete checkedAmenities[$(this).data('id')];
        }
        let lst = Object.values(checkedAmenities);
        if (lst.length > 0) {
            $('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
        } else {
            $('div.amenities > h4').html('&nbsp;');
        }
    });

    $.getJSON("http://0.0.0.0:5001/api/v1/status/", function (api) {
        if (api.status === "OK") {
            $("div#api_status").addClass("available");
        } else {
            $("div#api_status").removeClass("available");
        }
    }
    );



    $.ajax({
        type: "POST",
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        data: JSON.stringify({}),
        contentType: "application/json",

    }).done(function (places) {
        for (const place of places) {
            const article = `<article>
                                <div class="title_box">
                                    <h2>${place.name}</h2>
                                    <div class="price_by_night">${place.price_by_night}</div>
                                </div>
                                <div class="information">
                                    <div class="max_guest">${place.max_guest} Guests</div>
                                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                                </div>
                                <div class="description">
                                    ${place.description}
                                </div>
                            </article>`;
            $("section.places").append(article);
        }
    });

    $("button").click(function () {
        $('.places > article').remove();
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            data: JSON.stringify({ 'amenities': Object.keys(checkedAmenities) }),
            contentType: "application/json",
        }).done(function (places) {
            $("section.places").empty();
            for (const place of places) {
                const article = `<article>
                                        <div class="title_box">
                                            <h2>${place.name}</h2>
                                            <div class="price_by_night">${place.price_by_night}</div>
                                        </div>
                                        <div class="information">
                                            <div class="max_guest">${place.max_guest} Guests</div>
                                            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                                        </div>
                                        <div class="description">
                                            ${place.description}
                                        </div>
                                </article>`;
                $("section.places").append(article);
            }
        });
    });

});









