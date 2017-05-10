describe( 'status section', function() {

  var controller, rootScope, httpBackend;

  beforeEach( module( 'application' ) );

  beforeEach(inject( function($injector){
      controller = $injector.get('$controller');
      rootScope = $injector.get('$rootScope');
      httpBackend = $injector.get('$httpBackend');

  }));
});
