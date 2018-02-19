var app = angular.module("app", []);

app.controller("MinCtrl",function ($scope,$http) {



        $scope.kcfunction = function () {

            $http.get("https://data.kcmo.org/resource/cyqf-nban.json?$select=creation_year,count(case_id)&$group=creation_year").then(function (value) {

                $scope.kcvalue = value.data;
                $scope.mydata2010 = parseInt($scope.kcvalue[4].count_case_id);
                $scope.mydata2011 = parseInt($scope.kcvalue[5].count_case_id);
                $scope.mydata2012 = parseInt($scope.kcvalue[6].count_case_id);
                $scope.mydata2013 = parseInt($scope.kcvalue[7].count_case_id);
                $scope.mydata2014 = parseInt($scope.kcvalue[8].count_case_id);
                $scope.mydata2015 = parseInt($scope.kcvalue[9].count_case_id);
                $scope.mydata2016 = parseInt($scope.kcvalue[10].count_case_id);
                $scope.mydata2017 = parseInt($scope.kcvalue[11].count_case_id);
                drawChartx($scope.mydata2010, $scope.mydata2011, $scope.mydata2012, $scope.mydata2013, $scope.mydata2014, $scope.mydata2015, $scope.mydata2016, 'kc_chart1');
                drawCharty($scope.mydata2010/$scope.population[0].Kansas_City, $scope.mydata2011/$scope.population[1].Kansas_City, $scope.mydata2012/$scope.population[2].Kansas_City, $scope.mydata2013/$scope.population[3].Kansas_City, $scope.mydata2014/$scope.population[4].Kansas_City, $scope.mydata2015/$scope.population[5].Kansas_City, $scope.mydata2016/$scope.population[6].Kansas_City, 'kc_chart2');
            });
        };
        //Kansas City api https://data.kcmo.org/resource/cyqf-nban.json?$select=creation_year,count(case_id)&$group=creation_year


    $scope.nyfunction = function () {

        //New york city api
        $http.get("https://data.cityofnewyork.us/resource/fhrw-4uyv.json?$select=date_extract_y(created_date),count(unique_key)&$group=date_extract_y(created_date)&$order=date_extract_y(created_date)").then(function (value) {

            $scope.nycvalue = value.data;
            $scope.nyc2010 =parseInt($scope.nycvalue[0].count_unique_key);
            $scope.nyc2011 =parseInt($scope.nycvalue[1].count_unique_key);
            $scope.nyc2012 =parseInt($scope.nycvalue[2].count_unique_key);
            $scope.nyc2013 =parseInt($scope.nycvalue[3].count_unique_key);
            $scope.nyc2014 =parseInt($scope.nycvalue[4].count_unique_key);
            $scope.nyc2015 =parseInt($scope.nycvalue[5].count_unique_key);
            $scope.nyc2016 =parseInt($scope.nycvalue[6].count_unique_key);
            drawChartx($scope.nyc2010,$scope.nyc2011,$scope.nyc2012,$scope.nyc2013,$scope.nyc2014,$scope.nyc2015,$scope.nyc2016, 'ny_chart1');
            drawCharty($scope.nyc2010/$scope.population[0].NewYork_City,$scope.nyc2011/$scope.population[1].NewYork_City,$scope.nyc2012/$scope.population[2].NewYork_City,$scope.nyc2013/$scope.population[3].NewYork_City,$scope.nyc2014/$scope.population[4].NewYork_City,$scope.nyc2015/$scope.population[5].NewYork_City,$scope.nyc2016/$scope.population[6].NewYork_City,'ny_chart2')
        });
    };

//Austin api
    $scope.aufunction = function () {


        $http.get("https://data.austintexas.gov/resource/5h38-fd8d.json?$select=date_extract_y(sr_status_date)%20as%20year,count(sr_number)&$group=year&$order=year").then(function (value) {

            $scope.auvalue = value.data;
            $scope.au2014 = $scope.auvalue[1].count_sr_number;
            $scope.au2015 = $scope.auvalue[2].count_sr_number;
            $scope.au2016 = $scope.auvalue[3].count_sr_number;
            drawChartx(0,0,0,0,$scope.au2014,$scope.au2015,$scope.au2016,'au_chart1');
            drawCharty(0,0,0,0,$scope.au2014/$scope.population[4].Austin,$scope.au2015/$scope.population[5].Austin,$scope.au2016/$scope.population[6].Austin,'au_chart2');

        })
    };



    //Baton Rouge, LA Api

    $scope.bafunction = function () {

        $http.get("https://data.brla.gov/resource/uqxt-dtpe.json?$select=date_extract_y(createdate)%20as%20year,count(id)&$group=year&$order=year").then(function (value) {

            $scope.bavalue = value.data;
            $scope.ba2016 = $scope.bavalue[1].count_id;
            drawChartx(0,0,0,0,0,0,$scope.ba2016,'ba_chart1');
            drawCharty(0,0,0,0,0,0,$scope.ba2016/$scope.population[6].Baton_Rouge,'ba_chart2');
        })
    };

    //Boston MA Api

    $scope.bsfunction = function () {

        $http.get("https://data.boston.gov/api/3/action/datastore_search?resource_id=2968e2c0-d479-49ba-a884-4ef523ada3c0&q=2010").then(function (value) {
            $scope.bsvalue2010 = value.data.result.total;
        });
        $http.get("https://data.boston.gov/api/3/action/datastore_search?resource_id=2968e2c0-d479-49ba-a884-4ef523ada3c0&q=2011").then(function (value) {
            $scope.bsvalue2011 = value.data.result.total;
        });
        $http.get("https://data.boston.gov/api/3/action/datastore_search?resource_id=2968e2c0-d479-49ba-a884-4ef523ada3c0&q=2012").then(function (value) {
            $scope.bsvalue2012 = value.data.result.total;
        });
        $http.get("https://data.boston.gov/api/3/action/datastore_search?resource_id=2968e2c0-d479-49ba-a884-4ef523ada3c0&q=2013").then(function (value) {
            $scope.bsvalue2013 = value.data.result.total;
        });
        $http.get("https://data.boston.gov/api/3/action/datastore_search?resource_id=2968e2c0-d479-49ba-a884-4ef523ada3c0&q=2014").then(function (value) {
            $scope.bsvalue2014 = value.data.result.total;
        });
        $http.get("https://data.boston.gov/api/3/action/datastore_search?resource_id=2968e2c0-d479-49ba-a884-4ef523ada3c0&q=2015").then(function (value) {
            $scope.bsvalue2015 = value.data.result.total;
        });
        $http.get("https://data.boston.gov/api/3/action/datastore_search?resource_id=2968e2c0-d479-49ba-a884-4ef523ada3c0&q=2016").then(function (value) {
            $scope.bsvalue2016 = value.data.result.total;
            drawChartx($scope.bsvalue2010,$scope.bsvalue2011,$scope.bsvalue2012,$scope.bsvalue2013,$scope.bsvalue2014,$scope.bsvalue2015,$scope.bsvalue2016,'bs_chart1');
            drawCharty($scope.bsvalue2010/$scope.population[0].Boston,$scope.bsvalue2011/$scope.population[1].Boston,$scope.bsvalue2012/$scope.population[2].Boston,$scope.bsvalue2013/$scope.population[3].Boston,$scope.bsvalue2014/$scope.population[4].Boston,$scope.bsvalue2015/$scope.population[5].Boston,$scope.bsvalue2016/$scope.population[6].Boston,'bs_chart2');
        });
    };

    //Chattanooga, TN Api

    $scope.ctfunction = function () {

        $http.get("https://data.chattlibrary.org/resource/sf89-4qcw.json?$select=date_extract_y(created_date)%20as%20year,count(description)&$group=year&$order=year").then(function (value) {
            $scope.ctvalue = value.data;
            $scope.ct2010 = $scope.ctvalue[7].count_description;
            $scope.ct2011 = $scope.ctvalue[8].count_description;
            $scope.ct2012 = $scope.ctvalue[9].count_description;
            $scope.ct2013 = $scope.ctvalue[10].count_description;
            $scope.ct2014 = $scope.ctvalue[11].count_description;
            $scope.ct2015 = $scope.ctvalue[12].count_description;
            $scope.ct2016 = $scope.ctvalue[13].count_description;
            drawChartx($scope.ct2010,$scope.ct2011,$scope.ct2012,$scope.ct2013,$scope.ct2014,$scope.ct2015,$scope.ct2016,'ct_chart1');
            drawCharty($scope.ct2010/$scope.population[0].Chattanooga,$scope.ct2011/$scope.population[1].Chattanooga,$scope.ct2012/$scope.population[2].Chattanooga,$scope.ct2013/$scope.population[3].Chattanooga,$scope.ct2014/$scope.population[4].Chattanooga,$scope.ct2015/$scope.population[5].Chattanooga,$scope.ct2016/$scope.population[6].Chattanooga,'ct_chart2')
        })
    };
//Gainesville api


    $scope.gainesville = function () {

        $http.get("https://data.cityofgainesville.org/resource/cgd2-6k8s.json?$select=date_extract_y(created)%20as%20year,count(id)&$group=year&$order=year").then(function (value) {

            $scope.gainvalue = value.data;
            $scope.gain2014 = $scope.gainvalue[0].count_id;
            $scope.gain2015 = $scope.gainvalue[1].count_id;
            $scope.gain2016 = $scope.gainvalue[2].count_id;
            drawChartx(0,0,0,0,$scope.gain2014,$scope.gain2015,$scope.gain2016,'gain_chart1');
            drawCharty(0,0,0,0,$scope.gain2014/$scope.population[4].Gainesville,$scope.gain2015/$scope.population[5].Gainesville,$scope.gain2016/$scope.population[6].Gainesville,'gain_chart2');

        })
    };
// Johns Creek, GA

    $scope.jcfunction = function () {

        $http.get("https://services1.arcgis.com/bqfNVPUK3HOnCFmA/arcgis/rest/services/Citizen_Requests_and_Calls/FeatureServer/0/query?where=ReportedDate%20%3E%3D%20%272016-01-01T06%3A00%3A00.000Z%27%20AND%20ReportedDate%20%3C%3D%20%272016-12-31T06%3A00%3A00.000Z%27&outFields=TaskID&returnCountOnly=true&outSR=4326&f=json").then(function (value) {

            $scope.jcvalue2016 = value.data.count;


        });
        $http.get("https://services1.arcgis.com/bqfNVPUK3HOnCFmA/arcgis/rest/services/Citizen_Requests_and_Calls/FeatureServer/0/query?where=ReportedDate%20%3E%3D%20%272015-01-01T06%3A00%3A00.000Z%27%20AND%20ReportedDate%20%3C%3D%20%272015-12-31T06%3A00%3A00.000Z%27&outFields=TaskID&returnCountOnly=true&outSR=4326&f=json").then(function (value) {

            $scope.jcvalue2015 = value.data.count;
            drawChartx(0,0,0,0,0,$scope.jcvalue2015,$scope.jcvalue2016,'jc_chart1');
            drawCharty(0,0,0,0,0,$scope.jcvalue2015/$scope.population[5].JohnsCreek,$scope.jcvalue2016/$scope.population[6].JohnsCreek,'jc_chart2')

        })

    };

    //Minneapolis Api

    $scope.mifunction = function () {

        $http.get("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/311_2011/FeatureServer/0/query?where=1%3D1&outFields=CASEID&returnCountOnly=true&outSR=4326&f=json").then(function (value) {
           $scope.mi2011 = value.data.count;

        $http.get("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/311_Incidents_2012/FeatureServer/0/query?where=1%3D1&outFields=CASEID&returnCountOnly=true&outSR=4326&f=json").then(function (value) {
            $scope.mi2012 = value.data.count;
        $http.get("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/311_Incidents_2013/FeatureServer/0/query?where=1%3D1&outFields=CASEID&returnCountOnly=true&outSR=4326&f=json").then(function (value) {
            $scope.mi2013 = value.data.count;

        $http.get("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/311_2014/FeatureServer/0/query?where=1%3D1&outFields=CASEID&returnCountOnly=true&outSR=4326&f=json").then(function (value) {
            $scope.mi2014 = value.data.count;

        $http.get("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/311_Public_2015/FeatureServer/0/query?where=1%3D1&outFields=CASEID&returnCountOnly=true&outSR=4326&f=json").then(function (value) {
            $scope.mi2015 = value.data.count;

        $http.get("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Public_311_2016/FeatureServer/0/query?where=1%3D1&outFields=*&returnCountOnly=true&outSR=4326&f=json").then(function (value) {
            $scope.mi2016 = value.data.count;
            drawChartx(0,$scope.mi2011,$scope.mi2012,$scope.mi2013,$scope.mi2014,$scope.mi2015,$scope.mi2016,'mi_chart1');
            drawCharty(0,$scope.mi2011/$scope.population[1].Minneapolis,$scope.mi2012/$scope.population[2].Minneapolis,$scope.mi2013/$scope.population[3].Minneapolis,$scope.mi2014/$scope.population[4].Minneapolis,$scope.mi2015/$scope.population[5].Minneapolis,$scope.mi2016/$scope.population[6].Minneapolis,'mi_chart2');
        });});});});});});
    };


    // New Orleans Api

    $scope.nrfunction = function () {

        $http.get("https://data.nola.gov/resource/m959-fs8u.json?$select=date_extract_y(ticket_created_date_time)%20as%20year,count(ticket_id)&$group=year&$order=year").then(function (value) {

            $scope.novalue = value.data;
            $scope.novalue2012 = $scope.novalue[0].count_ticket_id;
            $scope.novalue2013 = $scope.novalue[1].count_ticket_id;
            $scope.novalue2014 = $scope.novalue[2].count_ticket_id;
            $scope.novalue2015 = $scope.novalue[3].count_ticket_id;
            $scope.novalue2016 = $scope.novalue[4].count_ticket_id;
            drawChartx(0,0,$scope.novalue2012,$scope.novalue2013,$scope.novalue2014,$scope.novalue2015,$scope.novalue2016,'nr_chart1');
            drawCharty(0,0,$scope.novalue2012/$scope.population[2].New_Orleans,$scope.novalue2013/$scope.population[3].New_Orleans,$scope.novalue2014/$scope.population[4].New_Orleans,$scope.novalue2015/$scope.population[5].New_Orleans,$scope.novalue2016/$scope.population[6].New_Orleans,'nr_chart2');
        })
    };

    //Philadelphia, PA

    $scope.phfunction = function () {

        $http.get("https://phl.carto.com/api/v2/sql?q=SELECT%20count(cartodb_id)%20FROM%20public_cases_fc%20WHERE%20requested_datetime%20%3E=%20%272016-01-01%27%20AND%20requested_datetime%20%3C%20%272016-12-31%27").then(function (value) {

            $scope.phvalue2016 = value.data.rows[0].count;
            console.log($scope.phvalue2016);
        $http.get("https://phl.carto.com/api/v2/sql?q=SELECT%20count(cartodb_id)%20FROM%20public_cases_fc%20WHERE%20requested_datetime%20%3E=%20%272015-01-01%27%20AND%20requested_datetime%20%3C%20%272015-12-31%27").then(function (value) {

            $scope.phvalue2015 = value.data.rows[0].count;
        $http.get("https://phl.carto.com/api/v2/sql?q=SELECT%20count(cartodb_id)%20FROM%20public_cases_fc%20WHERE%20requested_datetime%20%3E=%20%272014-01-01%27%20AND%20requested_datetime%20%3C%20%272014-12-31%27").then(function (value) {

            $scope.phvalue2014 = value.data.rows[0].count;
            console.log($scope.phvalue2014);
            drawChartx(0,0,0,0,$scope.phvalue2014,$scope.phvalue2015,$scope.phvalue2016,'ph_chart1');
            drawCharty(0,0,0,0,$scope.phvalue2014/$scope.population[4].Philadelphia,$scope.phvalue2015/$scope.population[5].Philadelphia,$scope.phvalue2016/$scope.population[6].Philadelphia,'ph_chart2');
        }); }); });
    };

    //Sacramento

    $scope.scfunction = function () {

        $http.get("https://services5.arcgis.com/54falWtcpty3V47Z/arcgis/rest/services/311Calls_2016/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value) {
            $scope.scvalue2016 = value.data.count;
            $http.get("https://services5.arcgis.com/54falWtcpty3V47Z/arcgis/rest/services/311Calls_2015/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value2) {
                $scope.scvalue2015 = value2.data.count;
                $http.get("https://services5.arcgis.com/54falWtcpty3V47Z/arcgis/rest/services/311Calls_2014/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value3) {
                    $scope.scvalue2014 = value3.data.count;
                    $http.get("https://services5.arcgis.com/54falWtcpty3V47Z/arcgis/rest/services/311Calls_2013/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value4) {
                        $scope.scvalue2013 = value4.data.count;
                        drawChartx(0,0,0,$scope.scvalue2013,$scope.scvalue2014,$scope.scvalue2015,$scope.scvalue2016,'sc_chart1');
                        drawCharty(0,0,0,$scope.scvalue2013/$scope.population[3].Sacramento,$scope.scvalue2014/$scope.population[4].Sacramento,$scope.scvalue2015/$scope.population[5].Sacramento,$scope.scvalue2016/$scope.population[6].Sacramento,'sc_chart2')
                    })
                })
            })
        })
    };

    //San Francisco, CA

    $scope.sffunction = function () {

        $http.get("https://data.sfgov.org/resource/ktji-gk7t.json?$select=date_extract_y(requested_datetime)%20as%20year,count(service_request_id)&$group=year&$order=year").then(function (value) {

            $scope.sfvalue = value.data;
            $scope.sfvalue2010 = value.data[2].count_service_request_id;
            $scope.sfvalue2011 = value.data[3].count_service_request_id;
            $scope.sfvalue2012 = value.data[4].count_service_request_id;
            $scope.sfvalue2013 = value.data[5].count_service_request_id;
            $scope.sfvalue2014 = value.data[6].count_service_request_id;
            $scope.sfvalue2015 = value.data[7].count_service_request_id;
            $scope.sfvalue2016 = value.data[8].count_service_request_id;
            drawChartx($scope.sfvalue2010,$scope.sfvalue2011,$scope.sfvalue2012,$scope.sfvalue2013,$scope.sfvalue2014,$scope.sfvalue2015,$scope.sfvalue2016,'sf_chart1');
            drawCharty($scope.sfvalue2010/$scope.population[0].San_Francisco,$scope.sfvalue2011/$scope.population[1].San_Francisco,$scope.sfvalue2012/$scope.population[2].San_Francisco,$scope.sfvalue2013/$scope.population[3].San_Francisco,$scope.sfvalue2014/$scope.population[4].San_Francisco,$scope.sfvalue2015/$scope.population[5].San_Francisco,$scope.sfvalue2016/$scope.population[6].San_Francisco,'sf_chart2')

        })
    };


// Los Angeles, CA

     $scope.losangeles = function () {

         $http.get("https://data.lacity.org/resource/ms7h-a45h.json?$select=date_trunc_y(createddate)%20as%20year,count(srnumber)&$group=year&$order=year").then(function (value) {

            $scope.lagraphvalue2015 = value.data[0].count_srnumber;

        $http.get("https://data.lacity.org/resource/ndkd-k878.json?$select=date_trunc_y(createddate)%20as%20year,count(srnumber)&$group=year&$order=year").then(function (value) {

             $scope.lagraphvalue2016 = value.data[0].count_srnumber;
            drawChartx(0,0,0,0,0,$scope.lagraphvalue2015,$scope.lagraphvalue2016,'la_chart1');
            drawCharty(0,0,0,0,0,$scope.lagraphvalue2015/$scope.population[5].LosAngeles,$scope.lagraphvalue2016/$scope.population[6].LosAngeles,'la_chart2');
        }); });
    };
    //Cincinnati, OH Api

    $scope.cincifunction = function () {

        $http.get("https://data.cincinnati-oh.gov/resource/5zzw-knr5.json?$select=date_trunc_y(requested_date)%20as%20year,count(service_request_id)&$group=year&$order=year").then(function (value) {
            $scope.cinvalue = value.data;
            $scope.cin2012 = $scope.cinvalue[0].count_service_request_id;
            $scope.cin2013 = $scope.cinvalue[1].count_service_request_id;
            $scope.cin2014 = $scope.cinvalue[2].count_service_request_id;
            $scope.cin2015 = $scope.cinvalue[3].count_service_request_id;
            $scope.cin2016 = $scope.cinvalue[4].count_service_request_id;
            drawChartx(0,0,$scope.cin2012,$scope.cin2013,$scope.cin2014,$scope.cin2015,$scope.cin2016,'cin_chart1');
            drawCharty(0,0,$scope.cin2012/$scope.population[2].Cincinnati,$scope.cin2013/$scope.population[3].Cincinnati,$scope.cin2014/$scope.population[4].Cincinnati,$scope.cin2015/$scope.population[5].Cincinnati,$scope.cin2016/$scope.population[6].Cincinnati,'cin_chart2')
        })
    };

    //Washington, Dc Api

    $scope.wdfunction = function () {

        $http.get("https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/Cityworks/MapServer/1/query?where=INITIATEDDATE%20%3E%3D%20%272010-01-01T06%3A00%3A00.000Z%27%20AND%20INITIATEDDATE%20%3C%3D%20%272010-12-31T06%3A00%3A00.000Z%27&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value) {
            $scope.wdvalue2010 = value.data.count;
            $http.get("https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/Cityworks/MapServer/1/query?where=INITIATEDDATE%20%3E%3D%20%272011-01-01T06%3A00%3A00.000Z%27%20AND%20INITIATEDDATE%20%3C%3D%20%272011-12-31T06%3A00%3A00.000Z%27&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value2) {
                $scope.wdvalue2011 = value2.data.count;
                $http.get("https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/Cityworks/MapServer/1/query?where=INITIATEDDATE%20%3E%3D%20%272012-01-01T06%3A00%3A00.000Z%27%20AND%20INITIATEDDATE%20%3C%3D%20%272012-12-31T06%3A00%3A00.000Z%27&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value3) {
                    $scope.wdvalue2012 = value3.data.count;
                    $http.get("https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/Cityworks/MapServer/1/query?where=INITIATEDDATE%20%3E%3D%20%272013-01-01T06%3A00%3A00.000Z%27%20AND%20INITIATEDDATE%20%3C%3D%20%272013-12-31T06%3A00%3A00.000Z%27&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value4) {
                        $scope.wdvalue2013 = value4.data.count;
                        $http.get("https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/Cityworks/MapServer/1/query?where=INITIATEDDATE%20%3E%3D%20%272014-01-01T06%3A00%3A00.000Z%27%20AND%20INITIATEDDATE%20%3C%3D%20%272014-12-31T06%3A00%3A00.000Z%27&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value5) {
                          $scope.wdvalue2014 = value5.data.count;
                          $http.get("https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/Cityworks/MapServer/1/query?where=INITIATEDDATE%20%3E%3D%20%272015-01-01T06%3A00%3A00.000Z%27%20AND%20INITIATEDDATE%20%3C%3D%20%272015-12-31T06%3A00%3A00.000Z%27&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value6) {
                              $scope.wdvalue2015 = value6.data.count;
                              $http.get("https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/Cityworks/MapServer/1/query?where=INITIATEDDATE%20%3E%3D%20%272016-01-01T06%3A00%3A00.000Z%27%20AND%20INITIATEDDATE%20%3C%3D%20%272016-12-31T06%3A00%3A00.000Z%27&outFields=OBJECTID&returnCountOnly=true&outSR=4326&f=json").then(function (value7) {
                                  $scope.wdvalue2016 = value7.data.count;
                                  drawChartx($scope.wdvalue2010,$scope.wdvalue2011,$scope.wdvalue2012,$scope.wdvalue2013,$scope.wdvalue2014,$scope.wdvalue2015,$scope.wdvalue2016,'wd_chart1');
                                  drawCharty($scope.wdvalue2010/$scope.population[0].Washington,$scope.wdvalue2011/$scope.population[1].Washington,$scope.wdvalue2012/$scope.population[2].Washington,$scope.wdvalue2013/$scope.population[3].Washington,$scope.wdvalue2014/$scope.population[4].Washington,$scope.wdvalue2015/$scope.population[5].Washington,$scope.wdvalue2016/$scope.population[6].Washington,'wd_chart2')
                              })})})})})})})};


    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChartx);
        function drawChartx(var0, var1 , var2, var3, var4, var5, var6,var7) {
            var data = google.visualization.arrayToDataTable([
                ['Year', 'No.of Requests'],
                ['2010', parseInt(var0)],
                ['2011', parseInt(var1)],
                ['2012', parseInt(var2)],
                ['2013', parseInt(var3)],
                ['2014', parseInt(var4)],
                ['2015', parseInt(var5)],
                ['2016', parseInt(var6)]
            ]);
            var options = {
                title: '311 call service requests ',
                curveType: 'function',
                legend: {position: 'bottom'},
                width:900
                ,height:500,
                bar: {groupWidth: "50%"}
            };
            var chart = new google.visualization.ColumnChart(document.getElementById(var7));
            chart.draw(data, options);
        }
        function drawCharty(var0, var1 , var2, var3, var4, var5, var6,var7) {
            var data = google.visualization.arrayToDataTable([
                ['Year', 'No.of requests/population Normization'],
                ['2010', var0],
                ['2011', var1],
                ['2012', var2],
                ['2013', var3],
                ['2014', var4],
                ['2015', var5],
                ['2016', var6]
            ]);
            var options = {
                title: '311 call service requests Normilization ',
                curveType: 'function',
                legend: {position: 'bottom'},
                width:900
                ,height:500
            };
            var chart = new google.visualization.LineChart(document.getElementById(var7));
            chart.draw(data, options);
        }
    $scope.population = [
        {
            "Year" : 2010,
            "Kansas_City" : 460802,
            "NewYork_City": 8192000,
            "Austin": 815587,
            "Baton_Rouge": 229598,
            "Boston" :620701,
            "Chattanooga": 170646,
            "JohnsCreek" : 77190,
            "Minneapolis" : 383134,
             "New_Orleans": 347903,
             "Philadelphia" : 1528427,
            "Sacramento" : 467597,
            "San_Francisco" : 805766,
            "LosAngeles": 3796292,
            "Cincinnati": 296913,
            "Washington": 605183

        },
        {
            "Year" : 2011,
            "Kansas_City" : 462108 ,
            "NewYork_City": 8284000,
            "Austin": 838599,
            "Baton_Rouge": 228903,
            "Boston" :630195,
            "Chattanooga": 172068,
            "Gainesville": 125746,
            "JohnsCreek" : 79434,
            "Minneapolis" : 388073,
            "New_Orleans": 360840,
            "Philadelphia" : 1539022,
            "Sacramento" : 471425,
            "San_Francisco" : 815672,
            "LosAngeles": 3825393,
            "Cincinnati": 296101,
            "Washington": 620477
        },
        {
            "Year" : 2012,
            "Kansas_City" : 464534,
            "NewYork_City": 8361000,
            "Austin": 864483,
            "Baton_Rouge": 229439,
            "Boston" :641911,
            "Chattanooga": 173869,
            "Gainesville": 126277,
            "JohnsCreek" : 82066,
            "Minneapolis" : 392821,
            "New_Orleans": 370138,
            "Philadelphia" : 1550379,
            "Sacramento" : 475113,
            "San_Francisco" : 828816,
            "LosAngeles": 3858137,
            "Cincinnati": 296794,
            "Washington": 635327
        },
        {
            "Year" : 2013,
            "Kansas_City" : 467118 ,
            "NewYork_City": 8422000,
            "Austin": 885343,
            "Baton_Rouge": 229117,
            "Boston" :651090,
            "Chattanooga": 174961,
            "Gainesville": 126787,
            "JohnsCreek" : 82596,
            "Minneapolis" : 400137,
            "New_Orleans": 378886,
            "Philadelphia" : 1555868,
            "Sacramento" : 479201,
            "San_Francisco" : 839280,
            "LosAngeles": 3890436,
            "Cincinnati": 297444,
            "Washington": 649165
        },
        {
            "Year" : 2014,
            "Kansas_City" : 470651,
            "NewYork_City": 8472000,
            "Austin": 911390,
            "Baton_Rouge": 228911,
            "Boston" :659180,
            "Chattanooga": 174749,
            "Gainesville": 128212,
            "JohnsCreek" : 82944,
            "Minneapolis" : 406619,
            "New_Orleans": 384355,
            "Philadelphia" : 1560609,
            "Sacramento" : 483920,
            "San_Francisco" : 850424,
            "LosAngeles": 3920173,
            "Cincinnati": 298100,
            "Washington": 659005
        },
        {
            "Year" : 2015,
            "Kansas_City" : 474862,
            "NewYork_City": 8517000,
            "Austin": 930152,
            "Baton_Rouge": 228320,
            "Boston" :665984,
            "Chattanooga": 176220,
            "Gainesville": 130127,
            "JohnsCreek" : 83107,
            "Minneapolis" : 410116,
            "New_Orleans": 389738,
            "Philadelphia" : 1564964,
            "Sacramento" : 489202,
            "San_Francisco" : 862004,
            "LosAngeles": 3949149,
            "Cincinnati": 298654,
            "Washington": 670377
        },
        {
            "Year" : 2016,
            "Kansas_City" : 481420,
            "NewYork_City": 8538000,
            "Austin": 947890,
            "Baton_Rouge": 227715,
            "Boston" :673184,
            "Chattanooga": 177571,
            "Gainesville": 131591,
            "JohnsCreek" : 83873,
            "Minneapolis" : 413651,
            "New_Orleans": 391495,
            "Philadelphia" : 1567872,
            "Sacramento" : 495234,
            "San_Francisco" : 870887,
            "LosAngeles": 3976322,
            "Cincinnati": 298800,
            "Washington": 681170
        }
    ];
});