var app = new Vue({

	el: "#root",
	data: {
		showModal: false,
		showingModal:false,
		showingeditModal: false,
		showingdeleteModal: false,
		errorMessage : "",
		successMessage : "",
		users: [],
		newUser: {business: "", firstname: "", lastname: "", title: "", phone: "", email: "", address: "", state: "", city: "", zipcode: ""},
		clickedUser: {},
		
	},
	mounted: function () {
		console.log("Hi KK");
		this.getAllUsers();
	},
	methods: {
		getAllUsers: function(){
			axios.get("http://165.22.3.81/api.php?action=read")
			.then(function(response){
				console.log(response);
				if (response.data.error) {
					app.errorMessage = response.data.message;
				}else{
					app.users = response.data.users;
				}
			});
		},
		saveUser:function(){

			var formData = app.toFormData(app.newUser);
			axios.post("http://165.22.3.81/api.php?action=create", formData)
				.then(function(response){
					console.log(response);
					app.newUser = {business: "", firstname: "", lastname: "", title: "", phone: "", email: "", address: "", state: "", city: "", zipcode: ""};
					if (response.data.error) {
						app.errorMessage = response.data.message;
					}else{
						app.successMessage = response.data.message;
						app.getAllUsers();
					}
				});
			},
			updateUser:function(){

			var formData = app.toFormData(app.clickedUser);
			axios.post("http://165.22.3.81/api.php?action=update", formData)
				.then(function(response){
					console.log(response);
					app.clickedUser = {};
					if (response.data.error) {
						app.errorMessage = response.data.message;
					}else{
						app.successMessage = response.data.message;
						app.getAllUsers();
					}
				});
			},
			deleteUser:function(){

			var formData = app.toFormData(app.clickedUser);
			axios.post("http://165.22.3.81/api.php?action=delete", formData)
				.then(function(response){
					console.log(response);
					app.clickedUser = {};
					if (response.data.error) {
						app.errorMessage = response.data.message;
					}else{
						app.successMessage = response.data.message;
						app.getAllUsers();
					}
				});
			},
			selectUser(user){
				app.clickedUser = user;
			},

			toFormData: function(obj){
				var form_data = new FormData();
			      for ( var key in obj ) {
			          form_data.append(key, obj[key]);
			      } 
			      return form_data;
			},
			clearMessage: function(){
				app.errorMessage = "";
				app.successMessage = "";
			},
		
	}
});

//Register Navbar component
Vue.component('navbar-component', {
	template: '<nav class="navbar navbar-expand-lg navbar-light bg-light"><a class="navbar-brand" href="#">Project Goliath v1.0</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarSupportedContent"><ul class="navbar-nav mr-auto"><li class="nav-item active"><a class="nav-link" href="index.html">Main</a></li><li class="nav-item"><a class="nav-link" href="/login.php">Login</a></li></ul><form class="form-inline my-2 my-lg-0"><button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Logout</button></form></div></nav>',
  })
  
  //Register Page header component
  Vue.component('page-heading-component', {
	template: '<div class="jumbotron jumbotron-fluid text-center mt-5"><h1 class="display-4">{{heading}}</h1><p class="lead">Welcome to the CPM Contacts App.</p></div>',
	data: function() {
	  return {
		heading: 'Project Goliath v1.0'
	  }
	}
  });