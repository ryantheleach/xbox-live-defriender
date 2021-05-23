var apikey = 'SECRET'; // OBTAIN FROM https://xbl.io/

var enrichFriends = function(f) {
    var icon = ((friend) => {
        var retval = '';
        if(friend.isFollowingCaller) {
            retval = 'mdi-account-switch';
            if(friend.isFavorite) {
                return 'mdi-star';
            }
        }
        else {
            retval = 'mdi-account-cancel';
            if(friend.isFavorite) {
                return 'mdi-star-off';
            }
        }
        return retval;
    })(f);
    return {
        "icon": icon,
        ...f};
}

var unfollowedFirst = (a,b)=> { 
    var count = 0;
    if(a.isFollowingCaller) {
        count = count + 1;
    };
    if(b.isFollowingCaller) {
        count = count - 1;
    }
    return count;
};

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        friends: null,
        api: null
    },
    computed: {
        sortedFriends: function () {
          if (!this.friends) return this.friends;
          return [...this.friends].sort(unfollowedFirst);
        }
    },
    mounted () {
        this.friends = 'friendship is magic';
        var api = axios.create(
            {
                baseURL: 'http://localhost:5001/https://xbl.io/api/v2',
                timeout: 30000,
                headers: {
                    'cache-control': 'no-cache',
                    Connection: 'keep-alive',
                    'Accept-Encoding': 'gzip, deflate',
                    Host: 'xbl.io',
                    'Cache-Control': 'no-cache',
                    Accept: '*/*',
                    'User-Agent': 'PostmanRuntime/7.17.1',
                    Authorization: 'Bearer ' + apikey,
                    'X-Authorization': apikey 
            }}
        );
        this.api = api;
        var update = (key) => {
            api.defaults.headers.common['Authorization'] = 'Bearer ' + key;
            api.defaults.headers.common['X-Authorization'] = + key;
        };
        api.get('/friends').then(res => this.friends = res.data.people.map(enrichFriends));
    },
});

