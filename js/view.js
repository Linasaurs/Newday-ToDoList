var headerTemplate = 
    `<div id="header">
        <p class="title">{{pageTitle}}</p>
        <i class="far {{headerIcon}} sun-icon"></i>
    </div>`

var inputTextBox = `<input type="text" placeholder="What to do..." id="input-item-box">`

var statsTemplate = `<div class="stats">
                          <span><i class="fas fa-check-circle"></i>Done: {{completed}}</span>
                          <span><i class="fas fa-exclamation-triangle"></i>Remaining to do: {{notCompleted}}</span>
                          <span><i class="far fa-star"></i>Starred: {{starred}} </span>
                            </div>`

var toDoListTemplate = ` 
    <ul id="to-do-list">
        {{#items}}
          <li id={{id}}><input class="checkbox" type="checkbox"><span class="to-do-list-txt">{{description}}</span>
          <input class="edit-input" type="text"/>
          <span class="timestamp"></span>
          <div class="list-item-actions">
            <i class="far fa-star"></i>
            <i class="far fa-edit"></i>
            <i class="fas fa-trash"></i>
          </div>
          </li>
        {{/items}}
     </ul> `

