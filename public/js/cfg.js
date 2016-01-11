/**
 * Created by vm on 04.01.2016.
 */

( function () {
    if (typeof cfg === "undefined") {
        $.getJSON(window.location.origin + "/cfg", function () {
            console.log("success");
        }).done(function (cfgdata) {
            cfg = cfgdata;
            console.log("Config data loaded");
        }).fail(function () {
            console.log("Failed to load configuration file.");
        })
            .always(function () {
                //console.log( "complete" );
                if (cfg.runtime === "mssql") {
                    $("#logout").show();
                } else {
                    $("#online").show();
                    $("#onlinelocation").attr("href", cfg.onlineLocation);
                }
            });
    }
}());