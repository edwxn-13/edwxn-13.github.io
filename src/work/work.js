
class ProjectData
{
    constructor(project_name, project_desc, project_tech, link)
    {
        this.project_name = project_name;
        this.project_desc = project_desc;
        this.project_tech = project_tech;
        this.link = link;
    }
}


function project_page_init()
{
    fetch('../src/work/projects.json')
    .then(res => res.json())
    .then(data => 
        {
            console.log(data);

            var project_list = data;
            var project_list_element = document.getElementById("main-project-list");
            for (let index = 0; index < project_list.length; index++) {
                
                add_list_item(project_list[index], project_list_element)
            }

        }).catch(err => console.error(err));
}


function add_list_item(project_data, project_list_element)
{

    var list_item = document.createElement("div");
    list_item.className = "list-item";
    
    var title = document.createElement("h1");
    title.innerHTML = project_data.project_name;
    list_item.appendChild(title);

    project_list_element.appendChild(list_item);

    var desc = document.createElement("div");
    desc.className = "list-item-info";
    desc.innerHTML = project_data.project_desc + " ⎋ ";
    list_item.appendChild(desc);

    var tech = document.createElement("div");
    tech.className = "tech";
    tech.innerHTML = "technologies ⇢ " + project_data.project_tech;
    desc.appendChild(tech);

    list_item.onclick = function()
    {
        window.open(project_data.link,"_top");
    };
    
}

document.addEventListener("DOMContentLoaded", project_page_init);
