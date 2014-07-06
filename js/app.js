function gameCtrl($scope,$log){

    $scope.teamNames = {
        cities:["New York","Los Angeles", "Miami", "Frankfurt"],
        mascots:["Camels","Locomotives","Aquatics", "Bagels"],
        colors:[
            {name: "red", hex: "#FF0000"},
            {name: "blue", hex: "#0000FF"},
            {name: "green", hex: "#009900"},
            {name: "purple", hex: "#6600FF"}
        ],
        selcities:[],
        selmascots:[],
        selcolors:[]
    }

    $scope.playerNames = {
        fnames:["Roger","Frank","Reginald","Mitchell","Travis","Paul","Jeff","Mark","Max","Derek","Steve","Ryan","Bryant","Caleb","Alex","Peter","Lucas",
        "Winston","Jake","Jack","Robert","Chris","Matt","Hal","Ben","Ron","Tommy","Doug","Brandon","Brendon","Larry","Drew","Kyle","Andrew","Logan","Toby","Michael",
        "Nick","Guy","Brent","Dick","Rory","Chase","Harry","Donald","Jessie","Zach","Lyle","Edward","Cameron","Brayden","Corey","Chad","Hank","Jake","Liam",
        "Noah","Mason","Ethan","Eli","Will","Billy","Conner","Henry","Dylan","Ross","Gabe","Josh","Phil","Issac","Owen","Nathan","Sam","Gavin","Trevor","Tyler",
        "Patrick","David","Evan","Charlie","Anthony","Adam","Miles","Blake","Austin","Jordan","Leo","Jamie","Riley","Xavier","Quinton","Brody","Cole","Fred","Hakeem",
        "Sean","TJ","Oliver","Julio","Trent","Bob","Ted","Kevin","Colin","Jerry","Larry","Gary","Dwight","Stanley","Oscar","Garth","Walter","Flynn",
        "Bsrt","Lou","Aaron","Benji","Tony","Grant","Justin","Cody","Eric","Brian","Tim","Chuck","Jeremy","Juan","Jared","Paul","Devin","Ian","Greg","Scott","Alejandro"],

        lnames:["Smith","Johnson","Williams","Jones","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin",
        "Thompson","Garcia","Martinez","Robinson","Clark","Rodriquez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill",
        "Scott","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards",
        "Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Cooper","Richardson","Cox","Howard","Ward","Peterson","Gray",
        "James","Watson","Brooks","Kelly","Sanders","Price","Bennett","Woods","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long","Patterson",
        "Hughes","Washington","Butler","Simmons","Foster","Gonzalez","Bryant","Alexander","Russell","Griffin","Hayes","Myers","Ford","Hamilton","Graham",
        "Sullivan","Cole","West","Jordan","Owens","Reynolds","Fisher","Ellis","Harrison","Gibson","McDonald","Marshall","Gomez","Murray","Freeman","Wells",
        "Webb","Simpson","Stevens","Tucker","Porter","Hunter","Hicks","Crawford","Henry","Boyd","Mason","Kennedy","Warren","Dixon","Burns","Gordon","Shaw",
        "Holmes","Rice","Robertson","Hunt","Black","Daniels","Palmer","Mills","Nichols","Grant","Knight","Ferguson","Rose","Stone","Hawkins","Dunn","Perkins",
        "Hudson","Spencer","Payne","Pierce","Berry","Matthews","Arnold","Wagner","Willis","Ray","Watkins","Olsen","Caroll","Duncan","Hart","Andrews","Fox","Peters"],
        selfnames:[],
        sellnames:[]
    }

    $scope.players = [];
    $scope.selectedPlayer = {};

    $scope.predicate = 'lname';
    $scope.reverse = false;

    $scope.seasons =[];

    $scope.season = 2014;

    $scope.teams = [];

    $scope.initMode = 1;
    $scope.draftMode = 0;


    var selectParameter = function(array, sel_array){
        var diff = 0;
        while (!diff){
            var tmp = Number.random(array.length - 1);
            if (sel_array.indexOf(tmp) == -1){
                sel_array.add(tmp);
                return array[tmp];
                diff = 1;
            }
        }


    }

    var createTeams = function(numOfTeams){
        var ci;
        var mas;
        var col;


        for (var i = 0; i < numOfTeams; i++){
            ci = selectParameter($scope.teamNames.cities, $scope.teamNames.selcities);
            mas = selectParameter($scope.teamNames.mascots, $scope.teamNames.selmascots);
            col = selectParameter($scope.teamNames.colors, $scope.teamNames.selcolors);
            $scope.teams.add(
                {
                    city: ci,
                    mascot: mas,
                    color: col,
                    wins: 0,
                    losses: 0,
                    ties: 0
                }
            )
        }
        console.log($scope.teams);
    }

    var createPlayer = function(){
        var speed = Number.random(60,100);
        var power = Number.random(60,100);
        var awareness = Number.random(60,100);
        var xfactor = Number.random(60,100);
        var potential = Number.random(1,8);

        var overall = (speed + power + awareness + xfactor ) / 4;
        potential = overall + potential;

        $scope.players.add(
            {
                fname: selectParameter($scope.playerNames.fnames,$scope.playerNames.selfnames),
                lname: selectParameter($scope.playerNames.lnames,$scope.playerNames.sellnames),
                speed: speed,
                power: power,
                awareness: awareness,
                overall: overall,
                potential: potential.cap(100),
                xfactor: xfactor
            }
        );


    }

    var createSeason = function(teams, season){
        $scope.seasons.add({
            season: season,
            teams: teams
        });
        console.log($scope.seasons);
    }

    $scope.createUserTeam = function(ci, mas){

        var col = {
            name:"orange",
            hex:"#F08802"
        };

        $scope.teams.add(
            {
                city: ci,
                mascot: mas,
                color: col,
                wins: 0,
                losses: 0,
                ties: 0
            });
        $scope.userTeam = {
            city: ci,
            mascot: mas,
            color: col,
            wins: 0,
            losses: 0,
            ties: 0
        };

        $scope.initMode = 0;
        $scope.draftMode = 1;
        for (var i = 0; i < 40; i++){
            createPlayer();
        }

    }

    $scope.selectPlayer= function(player){
        $scope.selectedPlayer = player;
    }


    $scope.sortDraft = function(param){
        console.log(param);

        if ($scope.predicate === param){
            $scope.reverse = !($scope.reverse);
        }
        else{
            if (param != 'lname'){
                $scope.reverse = true;
            } else {
                $scope.reverse = false;
            }

        }

        $scope.predicate = param;
    }



    var init = function(){
        createTeams(3);
        createSeason($scope.teams, $scope.season);
    }

    init();



}