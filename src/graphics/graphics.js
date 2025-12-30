
class vec2
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}
function init_graphics_page()
{
    let IMAGE_COUNT = 47;
    var images = [];
    let prefix = "../../assets/port/gallery";
    for(var i = 0; i < IMAGE_COUNT; i++)
    {
        images.push(prefix+'/g'+i.toString()+".png")
    }
    var grid = document.getElementById("grid-c");

    for (var i = 0; i < images.length; i++)
    {
        create_image_element(images[i], grid);
    }
    
}

function create_image_element(image_path, grid)
{
    var grid_item = document.createElement("div");
    grid_item.className = "grid-item";
    
    const image = new Image()
    image.onload = function() 
    {
        var width_weight = Math.log10(image.width);
        var width_index = image.width/Math.pow(10,Math.floor(width_weight));
        
        var height_weight = Math.log10(image.height);
        var height_index = image.height/Math.pow(10,Math.floor(height_weight));
        console.log(height_weight,height_index, image.height);
        console.log(width_weight,width_index, image.width);

        console.log(image_path + " with these dims x: " + width_index + "y: " + height_index);

        var grid_image = document.createElement("img");
        grid_image.src = image_path;
        
        grid_item.appendChild(grid_image);

        


        //image normalisation
        var image_adjusted_scale = normalise_image_scale(new vec2(width_index,height_index));
        console.log(image_path + "scale :");
        console.log(image_adjusted_scale);
        var true_height =  Math.round(image_adjusted_scale.y * 100.0);
        var true_width =  Math.round(image_adjusted_scale.x * 100.0);

        grid_item.style.gridColumn = "span " + true_width;
        grid_item.style.gridRow = "span " + true_height;

        grid.appendChild(grid_item);
    }
    image.src = image_path;


}

function normalise_image_scale(vec)
{
    var mag = Math.sqrt(Math.pow(vec.x,2) + Math.pow(vec.y,2));
    return new vec2((vec.x/mag), (vec.y/mag));
}

init_graphics_page();