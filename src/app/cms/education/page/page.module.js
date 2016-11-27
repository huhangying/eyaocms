
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.education.page', ['textAngular'])
    .config(routeConfig)
      .config(['$provide', function($provide){
          // this demonstrates how to register a new tool and add it to the default toolbar
          $provide.decorator('taOptions', ['$delegate', function(taOptions){
              // $delegate is the taOptions we are decorating
              // here we override the default toolbars and classes specified in taOptions.
              taOptions.forceTextAngularSanitize = true; // set false to allow the textAngular-sanitize provider to be replaced
              taOptions.keyMappings = []; // allow customizable keyMappings for specialized key boards or languages
              taOptions.toolbar = [
                  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                  ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
                  ['justifyLeft','justifyCenter','justifyRight', 'justifyFull'],
                  ['html', 'insertImage', 'insertLink']
              ];
              taOptions.classes = {
                  focussed: 'focussed',
                  toolbar: 'btn-toolbar',
                  toolbarGroup: 'btn-group',
                  toolbarButton: 'btn btn-default',
                  toolbarButtonActive: 'active',
                  disabled: 'disabled',
                  textEditor: 'form-control',
                  htmlEditor: 'form-control'
              };
              return taOptions; // whatever you return will be the taOptions
          }]);

      }]);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('education.page', {
          url: '/page/:department/:cat',
          templateUrl: 'app/cms/education/page/page.html',
          controller: 'pageCtrl',
          title: '宣教材料',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
