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
            url: cfg.root + cfg.port + "/material",//localhost:2000/material',
            data: {
                _csrf: $(".csrfprot").val(),
                name: $("#input-vstreamID").val()
            },
            type: 'POST',
            cache: false,
            success: function (response) {
                debugger;
                if( typeof _templates.vstream == 'undefined')//cache the template
                {
                    $.get(cfg.root + cfg.port + '/templates/material.html', function (templateData) {
                        _templates.vstream = templateData;
                        var template = Handlebars.compile(_templates.vstream);
                        $(".resultContainer").append(template(response));

                    }, 'html');
                } else {
                    debugger;
                    var template = Handlebars.compile(_templates.vstream);
                    $(".resultContainer").append(template(response));
                }
            },
            //This error comes from server
            error: function (request, status, error) {
                humane.log(request.responseText);
            }
        });
    })

    $("#newMaterialbtn").click(function () {
        $.ajax({
            url: cfg.root + cfg.port + "/material/new",//localhost:2000/material',
            data: {
                _csrf: $(".csrfprot").val(),
                name: $("#input-newMaterialname").val(),
                description: $("#input-newMaterialdescription").val()
            },
            type: 'POST',
            cache: false,
            success: function (response) {
              humane.log("New Material " + response.Name + " Successfully added!");
            },
            error: function (request, status, error) {
                humane.log(request.responseText);
            }
        });
    })
});