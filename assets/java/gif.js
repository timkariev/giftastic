$(document).ready(function () {

    var superhero = [
        "Batman", "Superman", "Flash", "Spiderman", "hulk"
    ];

    
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }

    $(document).on("click", ".superhero-button", function () {
        $("#superhero").empty();
        $(".superhero-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=12";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var superheroDiv = $("<div class=\"superhero-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var superheroImage = $("<img>");
                    superheroImage.attr("src", still);
                    superheroImage.attr("data-still", still);
                    superheroImage.attr("data-animate", animated);
                    superheroImage.attr("data-state", "still");
                    superheroImage.addClass("superhero-image");

                    superheroDiv.append(p);
                    superheroDiv.append(superheroImage);

                    $("#superhero").append(superheroDiv);
                }
            });
    });

    $(document).on("click", ".superhero-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-superhero").on("click", function (event) {
        event.preventDefault();
        var newSuperhero = $("input").eq(0).val();

        if (newSuperhero.length > 2) {
            superhero.push(newSuperhero);
        }

        populateButtons(superhero, "superhero-button", "#superhero-buttons");

    });

    populateButtons(superhero, "superhero-button", "#superhero-buttons");
});
