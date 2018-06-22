AFRAME.registerComponent('sload', {
    schema: {
        url: {type: 'string', default: ''}
    },

    init: function () {
        // Download Sketchfab object
        var url = this.data.url;
        console.log("My sketchfab url is = " + url)
        var options = {
            method: 'GET',
            headers: {
                Authorization: 'Token 51ce2d6489af40b0b3ba236ea1dabe7e',
            },
            mode: 'cors'
        };

        fetch(url, options).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
        });
    }
});
