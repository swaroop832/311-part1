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
            console.log($scope.auvalue);
            $scope.au2014 = $scope.auvalue[1].count_sr_number;
            $scope.au2015 = $scope.auvalue[2].count_sr_number;
            $scope.au2016 = $scope.auvalue[3].count_sr_number;
            drawChartx(0,0,0,0,$scope.au2014,$scope.au2015,$scope.au2016,'au_chart1');
            drawCharty(0,0,0,0,$scope.au2014/$scope.population[4].Austin,$scope.au2015/$scope.population[5].Austin,$scope.au2016/$scope.population[6].Austin,'au_chart2');

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
            "Austin": 815587
        },
        {
            "Year" : 2011,
            "Kansas_City" : 462108 ,
            "NewYork_City": 8284000,
            "Austin": 838599
        },
        {
            "Year" : 2012,
            "Kansas_City" : 464534,
            "NewYork_City": 8361000,
            "Austin": 864483
        },
        {
            "Year" : 2013,
            "Kansas_City" : 467118 ,
            "NewYork_City": 8422000,
            "Austin": 885343
        },
        {
            "Year" : 2014,
            "Kansas_City" : 470651,
            "NewYork_City": 8472000,
            "Austin": 911390
        },
        {
            "Year" : 2015,
            "Kansas_City" : 474862,
            "NewYork_City": 8517000,
            "Austin": 930152
        },
        {
            "Year" : 2016,
            "Kansas_City" : 481420,
            "NewYork_City": 8538000,
            "Austin": 947890
        }

    ];
});