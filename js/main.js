var t = new Date(1970, 0, 1);
var t2;
function createNewPost(news){
    var t2 = t;
    t.setSeconds(news.time);
    if(news.type == "story"){
        var eachNewsPost = `
            <div class="box">
                <article class="media">
                     <div class="media-left">
                        <figure class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>`+news.by+`</strong> - <small>`+t+`</small>
                                <br>
                                <a href="`+news.url+`" class="is-underlined" target="_blank">
                                    `+news.title+`
                                </a>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }
    else
    {
        var eachNewsPost = `
            <div class="box">
                <article class="media">
                     <div class="media-left">
                        <figure class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>`+news.by+`</strong> - <small>`+t+`</small>
                                <br>
                                <span>
                                    <strong>`+news.type+`</strong>: `+news.text+`
                                </span>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }
    return eachNewsPost;
}

var app = angular.module('myApp', []);
var seeMore = document.getElementById("seeMore");

var all;
var totalLeft;

app.controller('myCtrl', function($scope, $http) {
    $scope.getMaxCount = function(){
        var url = "https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty";
        $http.get(url)
        .then(function(response) {
            var max = response.data;
            all = [];
            for(var i = 0; i< 100; i++)
            {
                all.push(max);
                max = max-1;
            }
            totalLeft = all.length;
            $scope.showTypeStories();
        
        });
    }
    $scope.fetchStory = function(id){
        var url = "https://hacker-news.firebaseio.com/v0/item/"+id+".json?print=pretty";
        $http.get(url)
        .then(function(response) {
            var story = response.data;
            console.log(story);
            var newData = createNewPost(story);
            document.getElementById("allNews").innerHTML += newData;
            
        });
    }
    $scope.fetchList = function(type){
        all = [];
        document.getElementById("allNews").innerHTML = "Loading...";
        var url = "https://hacker-news.firebaseio.com/v0/"+type+".json?print=pretty";
        $http.get(url)
        .then(function(response){
            all = response.data;
            totalLeft = all.length;
            $scope.showTypeStories();
        });
    }
    $scope.showTypeStories = function(){
        seeMore.setAttribute("disabled","");
        document.getElementById("allNews").innerHTML = "";
        let curr;
        let i;
        for(i = 0; i<5 && totalLeft>0; i++,totalLeft--){
            curr = angular.element(document.getElementsByTagName('body')[0]).scope().fetchStory(all[i]);
        }
        console.log(i);
        all.splice(0,i-1);
        seeMore.disabled = false;
        if(totalLeft <=0)
        {
            seeMore.setAttribute("disabled","");
        }
    }
});

seeMore.addEventListener("click", function(){
    seeMore.disabled = true;
    let curr;
    let i;
    seeMore.disabled = true;
    for(i = 0; i<5 && totalLeft>0; i++,totalLeft--){
        curr = angular.element(document.getElementsByTagName('body')[0]).scope().fetchStory(all[i]);
    }
    all.splice(0,i-1);
    seeMore.disabled = false;
    if(totalLeft <=0)
    {
        seeMore.setAttribute("disabled","");
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var live = document.getElementById("liveStories");
    var top = document.getElementById("topStories");
    var newst = document.getElementById("newStories");
    var best = document.getElementById("bestStories");

    live.addEventListener('click', function(){
        console.log("yo");
        angular.element(document.getElementsByTagName('body')[0]).scope().getMaxCount();
    });
    top.addEventListener('click', function(){
        console.log("yo");
        angular.element(document.getElementsByTagName('body')[0]).scope().fetchList("topstories");
    });

    newst.addEventListener('click', function(){
        angular.element(document.getElementsByTagName('body')[0]).scope().fetchList("newstories");
    });

    best.addEventListener('click', function(){
        angular.element(document.getElementsByTagName('body')[0]).scope().fetchList("beststories");
    });

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});