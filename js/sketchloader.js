AFRAME.registerComponent('sload', {
    schema: {
        url: {type: 'string', default: ''},
        token: {type: 'string', default: ''}
    },

    init: function () {
        // Download Sketchfab object
        console.log("My sketchfab url is = " + this.data.url);
        console.log("My sketchfab token is " + this.data.token);

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
            console.log(data);
        });
    }
});
