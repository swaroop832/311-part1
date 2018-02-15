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
            console.log($scope.ct2016);
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
            "Gainesville": 124700
        },
        {
            "Year" : 2011,
            "Kansas_City" : 462108 ,
            "NewYork_City": 8284000,
            "Austin": 838599,
            "Baton_Rouge": 228903,
            "Boston" :630195,
            "Chattanooga": 172068,
            "Gainesville": 125746
        },
        {
            "Year" : 2012,
            "Kansas_City" : 464534,
            "NewYork_City": 8361000,
            "Austin": 864483,
            "Baton_Rouge": 229439,
            "Boston" :641911,
            "Chattanooga": 173869,
            "Gainesville": 126277
        },
        {
            "Year" : 2013,
            "Kansas_City" : 467118 ,
            "NewYork_City": 8422000,
            "Austin": 885343,
            "Baton_Rouge": 229117,
            "Boston" :651090,
            "Chattanooga": 174961,
            "Gainesville": 126787
        },
        {
            "Year" : 2014,
            "Kansas_City" : 470651,
            "NewYork_City": 8472000,
            "Austin": 911390,
            "Baton_Rouge": 228911,
            "Boston" :659180,
            "Chattanooga": 174749,
            "Gainesville": 128212
        },
        {
            "Year" : 2015,
            "Kansas_City" : 474862,
            "NewYork_City": 8517000,
            "Austin": 930152,
            "Baton_Rouge": 228320,
            "Boston" :665984,
            "Chattanooga": 176220,
            "Gainesville": 130127
        },
        {
            "Year" : 2016,
            "Kansas_City" : 481420,
            "NewYork_City": 8538000,
            "Austin": 947890,
            "Baton_Rouge": 227715,
            "Boston" :673184,
            "Chattanooga": 177571,
            "Gainesville": 131591
        }

    ];
});