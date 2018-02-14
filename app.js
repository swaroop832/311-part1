var app = angular.module("app", []);

app.controller("MinCtrl",function ($scope,$http) {

    $scope.myfunction = function (btn) {

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





























































        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChartx);
        function drawChartx(var0, var1 , var2, var3, var4, var5, var6,var7) {
            var data = google.visualization.arrayToDataTable([
                ['Year', 'Kansas City'],
                ['2010', var0],
                ['2011', var1],
                ['2012', var2],
                ['2013', var3],
                ['2014', var4],
                ['2015', var5],
                ['2016', var6]
            ]);
            var options = {
                title: '311 call service requests ',
                curveType: 'function',
                legend: {position: 'bottom'}
            };
            var chart = new google.visualization.LineChart(document.getElementById(var7));
            chart.draw(data, options);
        }

        function drawCharty(var0, var1 , var2, var3, var4, var5, var6,var7) {
            var data = google.visualization.arrayToDataTable([
                ['Year', 'Kansas City'],
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
                legend: {position: 'bottom'}
            };
            var chart = new google.visualization.LineChart(document.getElementById(var7));
            chart.draw(data, options);
        }
    };

    $scope.population = [
        {
            "Year" : 2010,
            "Kansas_City" : 460802,
            "NewYork_City": 8192000
        },
        {
            "Year" : 2011,
            "Kansas_City" : 462108 ,
            "NewYork_City": 8284000
        },
        {
            "Year" : 2012,
            "Kansas_City" : 464534,
            "NewYork_City": 8361000
        },
        {
            "Year" : 2013,
            "Kansas_City" : 467118 ,
            "NewYork_City": 8422000
        },
        {
            "Year" : 2014,
            "Kansas_City" : 470651,
            "NewYork_City": 8472000
        },
        {
            "Year" : 2015,
            "Kansas_City" : 474862,
            "NewYork_City": 8517000
        },
        {
            "Year" : 2016,
            "Kansas_City" : 481420,
            "NewYork_City": 8538000
        }

    ];

    });