$(() => {
    const amenity_ids = []
    const amenity_names = []
    $("input[type=checkbox]").change(function (e) {
        if (this.checked) {
            const amenity_id = $(this).attr("data-id")
            const amenity_name = $(this).attr("data-name")
            amenity_ids.push(amenity_id)
            amenity_names.push(amenity_name)
        }
        else {
            const nameToRemove = $(this).attr("data-name")
            const nameIndex = amenity_names.indexOf(nameToRemove)
            if (nameIndex > -1)
                amenity_names.splice(nameIndex, 1);

            const idToRemove = $(this).attr("data-id")
            const idIndex = amenity_ids.indexOf(idToRemove)
            if (idIndex > -1)
                amenity_ids.splice(idIndex, 1);
        }
        if (amenity_names.length < 4)
            $(".amenities h4").text(amenity_names.join(", "))
        else {
            $(".amenities h4").text(amenity_names.slice(0, 3).join(", ") + "...")
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
            console.log(place)
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









