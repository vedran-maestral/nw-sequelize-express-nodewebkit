/**
 * Created by vm on 22.12.2015.
 */
$(document).ready(function () {

    if(typeof _templates == 'undefined')
    {
        _templates = {};
    }

    $("#searchVstream").click(function () {
        $.ajax({
            url: cfg.root + cfg.port + "/vstream",//localhost:2000/material',
            data: {
                _csrf: $(".csrfprot").val(),
                id: $("#input-vstreamID").val()
            },
            type: 'POST',
            cache: false,
            success: function (response) {
                debugger;
                if( typeof _templates.vstream == 'undefined')//cache the template
                {
                    $.get(cfg.root + cfg.port + '/templates/vstream.html', function (templateData) {
                        _templates.vstream = templateData;
                        var template = Handlebars.compile(_templates.vstream);
                        $(".resultContainer").append(template(response));

                    }, 'html');
                } else {
                    var template = Handlebars.compile(_templates.vstream);
                    $(".resultContainer").append(template(response));
                }
            },
            //This error comes from server
            error: function (request, status, error) {
              $("#errorcontainer").show();
              $(".errormessage").text(request.responseText);
            }
        });
    })
});