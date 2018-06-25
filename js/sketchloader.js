AFRAME.registerComponent('sload', {
    schema: {
        url: {type: 'string', default: ''},
        token: {type: 'string', default: ''}
    },

    init: function () {
        // Download Sketchfab object
        console.log("My sketchfab url is = " + this.data.url);
        console.log("My sketchfab token is " + this.data.token);
        let scene = this.el.sceneEl;
        var options = {
            method: 'GET',
            headers: {
                Authorization: "Token " + this.data.token,
            },
            mode: 'cors'
        };

        fetch(this.data.url, options).then(function(response){
            return response.json();
        }).then(function(data){
          if(data.gltf.url){
            console.log("GLTF ZIP URL =", data.gltf.url);

            var manager = new THREE.LoadingManager();
          	new Promise(function(resolve, reject) {
          		if (data.gltf.url) {
          			new THREE.ZipLoader().load(data.gltf.url).then(function(zip) {
          				manager.setURLModifier(zip.urlResolver);
          				var item = resolve(zip.find( /\.(gltf|glb)$/i )[ 0 ] );
          			});
          		} else {
          			resolve(data.gltf.url);
          		}
          	}).then(function(file) {
              console.log("What is my file? = ", file)
          		new THREE.GLTFLoader(manager).load(file, function(gltf) {
                console.log("My new gltf object is = ", gltf);
          			scene.add(gltf);
          		});
          	});
          }
        });
    }
});
