function OutputInstagramPhotos(_positive_tags, _negative_tags, element_id_for_append){
    var token = '1814926231.673a773.388806d413c74c769e8d2b994de4afb8';

    GetInstaPhotosByTags(_positive_tags, _negative_tags, []);

    function GetInstaPhotosByTags(positive_tags, negative_tags, photos){
        var tag = positive_tags.pop();
        $.ajax({
            url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent',
            dataType: 'jsonp',
            type: 'GET',
            data: { access_token: token },
            success: function(result){
                for(x in result.data){
                    photos.push(result.data[x]);
                }

                if(positive_tags.length > 0){
                    GetInstaPhotosByTags(positive_tags, negative_tags, photos);
                } else {
                    photos = checkOnNegativeTags(photos, negative_tags);
                    photos = sortByCreatedAt(photos);

                    for(x in photos){
                        ////// maybe as function //////////
                        $('#'+element_id_for_append).append('<div class="inastagram-image"><img width="50" height="50" src="'+photos[x].images.thumbnail.url+'"></div>');
                        ///////////////////////////////////
                    }
                }
            }
        });
    }

    function sortByCreatedAt(array) {
        var key = 'created_time';
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    function checkOnNegativeTags(photos, negative_tags){
        var p = [];
        return photos.filter(function(photo){
            p = photo.tags.filter(function(t) {
                return negative_tags.indexOf(t) != -1;
            });
            return p.length == 0;
        });
    }
}