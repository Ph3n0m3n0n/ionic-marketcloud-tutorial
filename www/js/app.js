// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.service('DataService',function(){
  return {
    products : [
            { name: "White Trash, Two Heebs and a Bean", id: 1, price : 9.00, artist: "NOFX", year: 1992, images:["http://www.marketcloud.it/img/placeholder.png"]},
            { name: "Punk in Drublic", id: 2, price : 9.00, artist: "NOFX", year: 1994, images:["http://www.marketcloud.it/img/placeholder.png"]  },
            { name: "And out comes the wolf", id: 3, price : 9.00, artist: "Rancid", year: 1995, images:["http://www.marketcloud.it/img/placeholder.png"]  },
            { name: "Hard Rock Bottom", id: 4, price : 9.00, artist: "No Use For A Name", year: 2001, images:["http://www.marketcloud.it/img/placeholder.png"]  },
            { name: "Blaze", id: 5, price : 9.00, artist: "Lagwagon", year: 2003, images:["http://www.marketcloud.it/img/placeholder.png"]  },
          ],
    list : function(){
      return this.products;
    },
    getById : function(id) {
      return this.products[id-1]
    }
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.products', {
      url: '/products',
      views: {
        'menuContent': {
          templateUrl: 'templates/products.html',
          controller: 'ProductsCtrl'
        }
      },
      resolve: {
        products : function(DataService){
          return DataService.list()
        }
      }
    })

  .state('app.product', {
    url: '/products/:productId',
    views: {
      'menuContent': {
        templateUrl: 'templates/product.html',
        controller: 'ProductCtrl'
      }
    },
    resolve: {
        product : ['DataService','$stateParams',function(DataService,$stateParams){
                  return DataService.getById($stateParams.productId)
                }]
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/products');
});
