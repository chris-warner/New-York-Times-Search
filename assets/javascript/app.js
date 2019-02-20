//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=uqGmnG0GaaxjXDU7dEVlCaKBQfY5ynGf

$(document).ready(function() {
    $("#seach-term").focus();


    $("#search").on("click", function(event) {
        event.preventDefault();
        var _word = $("#seach-term").val();
        var _begin_date = $("#startYear").val();
        var _end_date = $("#endYear").val();
        var _num = $("#numberofResult").val();

        search(_word, _begin_date, _end_date, _num);

    })

    $("#clearSearch").on("click", function() {
        $(".result").empty();
        $("#seach-term").val("");
        $("#startYear").val("");
        $("#endYear").val("");

        $("#seach-term").focus();
    })


    /**
     *
     *
     * @param {*} _word key for search
     * @param {*} _beginDate yyyymmdd
     * @param {*} _endDate yyyymmdd
     * @param {*} _num Number of items to show
     */
    function search(_word, _beginDate, _endDate, _num) {

        if (_beginDate !== "") {
            _beginDate = "&begin_date=" + _beginDate;
        }
        if (_endDate !== "") {
            _endDate = "&end_date=" + _endDate;
        }

        var queryString = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + _word + _beginDate + _endDate + "&api-key=uqGmnG0GaaxjXDU7dEVlCaKBQfY5ynGf"
        console.log(queryString);

        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function(response) {

            var _res = response.response.docs;
            console.log(response);

            $(".result").empty();

            for (var i = 0; i < _num; i++) {

                var headLine = (i + 1) + ". " + _res[i].headline.main;
                var snippet = _res[i].snippet;
                var byline = _res[i].byline.original;
                var web_url = _res[i].web_url;
                var pub_date = _res[i].pub_date;

                $(".result").append(`
                <div class="card mb-3" >
                    <div class="row no-gutters">
                        <div class="col-md-12">
                            <div class="card-body">
                                <h3 class="pCard section-head card-title">${headLine}</h3>
                                <p class="card-snip pCard">${snippet}</p>
                                <p class="card-snip pCard">Date of publication: ${pub_date}</p>
                                <p class="card-auth pCard">${byline}</p>
                                <a class="pCard" href="${web_url}">NYT Article Here</a>
                            </div>
                        </div>
                    </div>
                </div>`);

                // var headLine = response.response.docs[i].headline.main;
                // var lead_paragraph = response.response.docs[i].lead_paragraph;
                // var snippet = response.response.docs[i].snippet;
                // var byline = response.response.docs[i].byline.original;
                // var web_url = response.response.docs[i].web_url;

                // var articuleDiv = $("<div>");
                // articuleDiv.addClass("articuleDiv");

                // var sectionHeadDiv = $("<div>");
                // sectionHeadDiv.addClass("section-head");

                // var leadP = $("<p>");
                // leadP.addClass("subheading");

                // var pText = $("<p>");
                // pText.addClass("result");

                // var pBy = $("<p>");
                // pBy.addClass("result");

                // var aLink = $("<a>");
                // aLink.addClass("result articuleLink");
                // aLink.attr("href", web_url);

                // sectionHeadDiv.text(headLine);
                // leadP.text(lead_paragraph);
                // pText.text(snippet);
                // pBy.text(byline);
                // aLink.text(web_url);

                // articuleDiv.append(sectionHeadDiv);
                // articuleDiv.append(leadP);
                // articuleDiv.append(pText);
                // articuleDiv.append(pBy);
                // articuleDiv.append(aLink);


                // $(".result").append(articuleDiv);



            }


        });
    }
});